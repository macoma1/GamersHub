import { Component } from '@angular/core';
import { VideogamesService } from '../../services/videogames.service';
import { Game } from './game.model';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  constructor(private videogamesService: VideogamesService) { } 

  games: Game[] = [];
  
  
  ngOnInit(): void {
    this.videogamesService.getGames().subscribe(data => {
      this.games = data.results;
    });
  }


}
