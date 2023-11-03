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
    // Solo emite la solicitud si no hay una en curso
    if (!this.gameService.getLoadingStatus()) {

      this.gameService.setLoadingStatus(true);
      this.gameService.emitRequestMoreGames();
      // Después de que la solicitud se complete, recuerda establecer isLoading en false
      // Esto dependerá de cómo manejas la respuesta de tu API
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
