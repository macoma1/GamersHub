import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  searchText: string = '';
  error: any = null;
  selectedGenre: string | null = null;
  genres: string[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.isLoading = false;
        this.updateGenresList();
      },
      error => {
        console.error('Error fetching user', error);
        this.isLoading = false;
        this.error = error;
      }
    );
  }

  updateGenresList(): void {
    if (this.user && this.user.favoriteGames) {
      const allGenres = this.user.favoriteGames.flatMap(game => game.genres);
      this.genres = Array.from(new Set(allGenres));
    }
  }

  selectGenre(genre: string): void {
    this.selectedGenre = genre === 'all' ? null : genre;
  }


  filterGamesByGenre(): any[] {
    if (this.user && this.user.favoriteGames) {
      if (this.selectedGenre === null) {
        return this.user.favoriteGames;
      } else {
        return this.user.favoriteGames.filter(game =>
          game.genres && this.selectedGenre ? game.genres.includes(this.selectedGenre) : false
        );
      }
    }
    return [];
  }


  filterGamesBySearch(): any[] {
    if (this.searchText && this.user && this.user.favoriteGames) {
      return this.user.favoriteGames.filter(game =>
        game.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    return this.user?.favoriteGames || [];
  }

  getFilteredGames(): any[] {
    let filteredGames = this.filterGamesByGenre();

    if (this.searchText) {
      filteredGames = filteredGames.filter(game =>
        game.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    return filteredGames;
  }

}