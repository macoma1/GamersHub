import { Component, Output, EventEmitter } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'AngularFront';
  constructor(private gameService: GameService) {}

  loadMoreGames() {
    console.log('loadMoreGames');    
    this.gameService.emitRequestMoreGames();  
  }

}
