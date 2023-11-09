import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(localStorage.getItem(this.AUTH_TOKEN_KEY));
  public token: Observable<string | null> = this.tokenSubject.asObservable();
  private readonly baseUrl: string = 'https://powerful-meadow-65791.herokuapp.com';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<any> {
    return this.http.post<User>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => this.storeToken(response.token))
    );
  }

  private storeToken(token: string | null): void {
    if (token) {
      localStorage.setItem(this.AUTH_TOKEN_KEY, token);
      this.tokenSubject.next(token);
    }
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/me`, { headers: this.createAuthorizationHeader() });
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  addToFavorites(gameId: string, name: string, imageUrl: string, genres: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/me/favorites`, { gameId, name, imageUrl, genres }, { headers: this.createAuthorizationHeader() });
  }


  removeFromFavorites(gameId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/me/favorites/${gameId}`, { headers: this.createAuthorizationHeader() });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
  }

  getFavorites(): Observable<any> {
    return this.http.get<User>(`${this.baseUrl}/users/me/favoriteGames`, { headers: this.createAuthorizationHeader() });
  }

  isGameInFavorites(gameId: number): Observable<boolean> {
    return this.getFavorites().pipe(
      map(user => user.favoriteGames.some((favGame: any) => favGame.gameId === gameId)),
      catchError((error: any) => {
        console.error('Error checking if game is in favorites:', error);
        return of(false);
      })
    );
  }
}
