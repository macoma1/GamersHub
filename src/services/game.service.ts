import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private requestMoreGamesSubject = new Subject<void>();
  requestMoreGames$ = this.requestMoreGamesSubject.asObservable();

  public isLoading: boolean = false;

  emitRequestMoreGames() {
    this.requestMoreGamesSubject.next();
  }

  setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }

  getLoadingStatus(): boolean {
    return this.isLoading;
  }
}
