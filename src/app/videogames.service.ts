import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse } from './game/game.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }

  private apiKey = '43d6aa9c71354d72b67481c24b711c2e';
  private baseUrl = 'https://api.rawg.io/api/games';
  getGames(): Observable<GameResponse> {
    const url = `${this.baseUrl}?key=${this.apiKey}`;
    return this.http.get<GameResponse>(url);
  }

}
