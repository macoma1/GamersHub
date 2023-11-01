import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'AngularFront';
  constructor(private gameService: GameService, private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  loadMoreGames() {
    console.log('loadMoreGames');    
    this.gameService.emitRequestMoreGames();  
  }

  logout(): void {
    // Borra el JWT del localStorage
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
