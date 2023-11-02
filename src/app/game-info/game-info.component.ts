import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from '../../services/videogames.service';
import { Result } from '../../models/videogame.interface';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {
  game: Result | null = null;

  constructor(
    private route: ActivatedRoute,
    private videogamesService: VideogamesService
  ) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.videogamesService.getGameInfo(+gameId).subscribe(response => {
        this.game = response;
      });
    }
  }
}
