import { Component } from '@angular/core';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AngularFront';
  constructor(private gameService: GameService, private router: Router, private authService: AuthService) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  loadMoreGames() {
    if (!this.gameService.getLoadingStatus()) {
      this.gameService.setLoadingStatus(true);
      this.gameService.emitRequestMoreGames();

    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }
}
