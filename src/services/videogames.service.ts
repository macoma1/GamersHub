import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse } from '../models/videogame.interface';
import { Observable } from 'rxjs';
const currentDate = new Date();
const twoMonthsAgo = new Date(currentDate);
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  private apiKey = '43d6aa9c71354d72b67481c24b711c2e';
  private baseUrl = 'https://api.rawg.io/api/games';
  private pageSize = 24;

  getGames(page: number): Observable<any> {
    const url = `${this.baseUrl}?key=${this.apiKey}&page_size=${this.pageSize}&page=${page}`;
    return this.http.get<GameResponse>(url);
  }

  private currentPage = 1;

  loadMoreGames(): Observable<GameResponse> {
    this.currentPage += 1;
    return this.getGames(this.currentPage);
  }

  searchGames(query: string): Observable<GameResponse> {
    const searchUrl = `${this.baseUrl}?key=${this.apiKey}&search=${query}&ordering=-added_by_status.owned,-rating`;
    return this.http.get<GameResponse>(searchUrl);
  }

  getPopularNewGames(): Observable<GameResponse> {
    const currentDate = new Date();
    const twoMonthsAgo = new Date(currentDate);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const params = {
      key: this.apiKey,
      ordering: '-rating_top,-released',
      rating_greater: '4.50',
      released_after: twoMonthsAgo.toISOString().split('T')[0],
      page_size: '8000'
    };

    return this.http.get<GameResponse>(this.baseUrl, { params });
  }


}
