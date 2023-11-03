import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private BASE_URL = 'http://localhost:3000';  

  constructor(private http: HttpClient) {}

  getComments(gameId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments/${gameId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    console.log('Sending comment:', comment);
    return this.http.post<Comment>(`${this.BASE_URL}/comments`, comment);
  }
}
