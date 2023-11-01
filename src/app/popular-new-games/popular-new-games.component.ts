import { Component, OnInit } from '@angular/core';
import { VideogamesService } from 'src/services/videogames.service';
import { GameResponse, Result} from '../../models/videogame.interface';

@Component({
  selector: 'app-popular-new-games',
  templateUrl: './popular-new-games.component.html',
  styleUrls: ['./popular-new-games.component.css']
})
export class PopularNewGamesComponent implements OnInit {

  games: Result[] = [];

  constructor(private gamesService: VideogamesService) { }

  ngOnInit(): void {
    this.gamesService.getPopularNewGames().subscribe((data: GameResponse) => {

      this.games = data.results
        .filter(game => game.rating_top > 4,5)
        .sort((a, b) => b.rating_top - a.rating_top || new Date(b.released).getTime() - new Date(a.released).getTime())
        .slice(0, 8);
    });
  }
  
  
}
