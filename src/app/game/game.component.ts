import { Component } from '@angular/core';
import { VideogamesService } from '../../services/videogames.service';
import { Game } from './game.model';




@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  games: Game[] = [];
  totalPages: number = 0;
  currentPage: number = 1;

  constructor(private videogamesService: VideogamesService) { } 

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.videogamesService.getGames(this.currentPage).subscribe(data => {
      this.games = data.results;
      this.totalPages = Math.ceil(data.count / 10);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadGames();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadGames();
    }
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  
}

