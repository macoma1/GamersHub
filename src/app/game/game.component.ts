import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../services/videogames.service';
import { Game, GamePlatform } from './game.model';

const SUPPORTED_PLATFORMS = [
  'playstation', 'xbox', 'pc', 'nintendo'
];

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  query: string = '';
  isSearching: boolean = false;
  totalPages: number = 0;
  currentPage: number = 1;
  games: Game[] = [];
  filteredGames: Game[] = [];

  constructor(private videogamesService: VideogamesService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  getFullStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return new Array(fullStars).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  remainingStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const remaining = 5 - fullStars;
    if (this.hasHalfStar(rating)) {
      return new Array(remaining - 1).fill(0);
    }
    return new Array(remaining).fill(0);
  }
  getPlatformGroup(platformName: string): { icon: string, group: string } {
    platformName = platformName.toLowerCase();
    let icon: string;
    let group: string;

    switch (true) {
      case platformName.includes('playstation'):
        icon = 'bi-playstation';
        group = 'playstation';
        break;
      case platformName.includes('xbox'):
        icon = 'bi-xbox';
        group = 'xbox';
        break;
      case platformName.includes('nintendo'):
        icon = 'bi-nintendo-switch';
        group = 'nintendo';
        break;
      case platformName === 'pc':
        icon = 'bi-pc-display';
        group = 'pc';
        break;

      default:
        icon = '';
        group = '';
    }

    return { icon, group };
  }

  filterSupportedPlatforms(gamePlatforms: GamePlatform[]): GamePlatform[] {
    const processedGroups = new Set<string>();

    return gamePlatforms.filter(platform => {
      const { group } = this.getPlatformGroup(platform.platform.name);

      if (SUPPORTED_PLATFORMS.includes(group) && !processedGroups.has(group)) {
        processedGroups.add(group);
        return true;
      }
      return false;
    });
  }

  search() {
    if (this.query.trim() === '') {
      this.isSearching = false;
      this.loadGames();
      return;
    } else {
      this.isSearching = true;
    }

    this.videogamesService.searchGames(this.query).subscribe(response => {
      let games = response.results;

      console.log("Resultados iniciales:", games); // Verificar que 'Cyberpunk' está en estos resultados

      games = games.filter(game => game.name.toLowerCase().includes(this.query.toLowerCase()));
      console.log("Después del filtrado de nombre:", games);
      games = games.filter(game =>
        game.rating !== null &&
        game.platforms && game.platforms.length > 0 &&
        // game.genres && game.genres.length > 0 &&
        game.released
      );
      console.log("Después de los filtros adicionales:", games);

      // Ordenación
      games.sort((a, b) => {
        const ownedA = a.added_by_status && a.added_by_status.owned ? a.added_by_status.owned : 0;
        const ownedB = b.added_by_status && b.added_by_status.owned ? b.added_by_status.owned : 0;

        if (ownedA !== ownedB) {
          return ownedB - ownedA;
        }

        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }

        const dateA = new Date(a.released);
        const dateB = new Date(b.released);
        return dateB.getTime() - dateA.getTime();
      });

      this.games = games;
    });
  }



  nextPage() {
    this.currentPage++;
    if (this.isSearching) {
      this.search();
    } else {
      this.loadGames();
    }
  }

  previousPage() {
    this.currentPage--;
    if (this.isSearching) {
      this.search();
    } else {
      this.loadGames();
    }
  }

  loadGames() {
    this.videogamesService.getGames(this.currentPage).subscribe(response => {
      this.games = response.results;
      this.totalPages = Math.floor(response.count / 21);
    });
  }

  loadMoreGamesFromService() {
    this.videogamesService.loadMoreGames().subscribe(response => {
      this.games = [...this.games, ...response.results];
    });
  }

  loadMoreGames() {
    if (this.isSearching) {
      this.currentPage++;
      this.search();
    } else {
      this.videogamesService.getGames(this.currentPage).subscribe(response => {
        this.games = [...this.games, ...response.results];
        this.totalPages = Math.floor(response.count / 21);
      });
    }
  }

}
