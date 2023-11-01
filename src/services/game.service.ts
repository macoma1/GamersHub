import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private requestMoreGamesSubject = new Subject<void>();
  requestMoreGames$ = this.requestMoreGamesSubject.asObservable();

  emitRequestMoreGames() {
    this.requestMoreGamesSubject.next();
  }
}
