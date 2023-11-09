import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse, Result, Screenshot } from '../models/videogame.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  private apiKey = environment.apiKey;
  private baseUrl = environment.baseUrl;
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
          const parser = new DOMParser();
          const doc = parser.parseFromString(response.description, 'text/html');

          const paragraphs = doc.querySelectorAll('p');

          if (paragraphs.length > 0) {
            response.description = paragraphs[0].textContent || '';
          }

          return response;
        })
      );
  }

  getComments(gameId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`api/endpoint/to/get/comments/${gameId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('api/endpoint/to/add/comment', comment);
  }

  getScreenshots(gameId: number): Observable<Screenshot[]> {
    const url = `${this.baseUrl}/${gameId}/screenshots?key=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.results)
    );
  }



}
