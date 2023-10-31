import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse } from '../app/game/game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  private apiKey = '43d6aa9c71354d72b67481c24b711c2e';
  private baseUrl = 'https://api.rawg.io/api/games';
  private pageSize = 10;  // Establece la cantidad de juegos que deseas por página
  
  getGames(page: number = 1): Observable<GameResponse> {
    const url = `${this.baseUrl}?key=${this.apiKey}&page_size=${this.pageSize}&page=${page}`;
    return this.http.get<GameResponse>(url);
  }

  private currentPage = 1;

  loadMoreGames(): Observable<GameResponse> {
    this.currentPage += 1;
    return this.getGames(this.currentPage);
  }
}
