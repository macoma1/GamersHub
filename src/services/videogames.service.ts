import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse, Result } from '../models/videogame.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Importa el operador map

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  private apiKey = '43d6aa9c71354d72b67481c24b711c2e';
  private baseUrl = 'https://api.rawg.io/api/games';
  private pageSize = 24;
  private currentPage = 1;

  getGames(page: number): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&page_size=${this.pageSize}&page=${page}`;
    return this.http.get<GameResponse>(url);
  }

  loadMoreGames(): Observable<GameResponse> {
    this.currentPage += 1;
    return this.getGames(this.currentPage);
  }

  searchGames(query: string): Observable<GameResponse> {
    const searchUrl = `${this.baseUrl}?key=${this.apiKey}&search=${query}&ordering=-added_by_status.owned,-rating`;
    return this.http.get<GameResponse>(searchUrl);
  }
  
  getGameById(id: number): Observable<Result> {
    const url = `${this.baseUrl}/${id}?key=${this.apiKey}`;
    return this.http.get<Result>(url);
  }

  getGameInfo(id: number): Observable<Result> {
    const url = `${this.baseUrl}/${id}?key=${this.apiKey}`;
    return this.http.get<Result>(url)
      .pipe(
        map((response: Result) => {
          // Creamos un DOMParser para analizar el HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.description, 'text/html');
          
          // Obtener todos los párrafos del documento
          const paragraphs = doc.querySelectorAll('p');

          // Suponemos que el primer párrafo contiene el texto en inglés y el segundo en español
          // Asignamos el contenido del primer párrafo a la descripción
          if (paragraphs.length > 0) {
            response.description = paragraphs[0].textContent || '';
          }

          return response;
        })
      );
}



}
