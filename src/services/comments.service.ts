import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private BASE_URL = 'https://powerful-meadow-65791-c0b95eb97243.herokuapp.com';

  constructor(private http: HttpClient) { }

  getComments(gameId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments/${gameId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.BASE_URL}/comments`, comment);
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/comments/${commentId}`);
  }
}
