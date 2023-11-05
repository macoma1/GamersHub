import { Component, OnInit } from '@angular/core';
import { VideogamesService } from '../../services/videogames.service';
import { Result, PlatformElement } from '../../models/videogame.interface';
import { GameService } from '../../services/game.service'; // Importa el servicio aquí
import { takeUntil } from 'rxjs/operators'; // Importa el operador takeUntil
import { Subject } from 'rxjs'; // Importa Subject
import { AuthService } from 'src/services/auth-service.service';
import { User } from 'src/models/user.model';

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
  currentPage: number = 1;
  games: Result[] = [];
  user: User | null = null;
  favorites: Set<number> = new Set<number>();
  filteredGames: Result[] = [];
  pagesToShow: number[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private videogamesService: VideogamesService,
    private gameService: GameService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loadGames();
    this.authService.getCurrentUser().subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.error('Error fetching user', error);
      }
    );
    this.gameService.requestMoreGames$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.loadGames();
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  filterSupportedPlatforms(gamePlatforms: PlatformElement[]): PlatformElement[] {
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
      games = games.filter(game => game.name.toLowerCase().includes(this.query.toLowerCase()));
      games = games.filter(game =>
        game.rating !== null &&
        game.platforms && game.platforms.length > 0 &&
        game.released
      );

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

  loadGames() {
    this.gameService.isLoading = true;
    this.videogamesService.getGames(this.currentPage).subscribe(response => {
      if (response.results.length > 0) {
        this.games = [...this.games, ...response.results];
        this.currentPage++;
      } else {
        console.log("No hay más juegos para cargar.");
      }
      this.gameService.isLoading = false;
    }, error => {
      console.error("Error cargando juegos:", error);
      this.gameService.isLoading = false;
    });
  }
  isFavorite(gameId: number): boolean {
    if (!this.user) {
      return false;
    }
    if (!this.user.favoriteGames) {
      return false;
    }
    if (this.user.favoriteGames.some((favGame: { gameId: number }) => favGame.gameId === gameId)) {
      return true;
    }
    return false;

    return this.favorites.has(gameId);
  }

  toggleFavorite(game: Result, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite(game.id)) {
      this.removeFromFavorites(game.id.toString());
    } else {
      this.addToFavorites(game);
    }
  }

  removeFromFavorites(gameId: string): void {
    this.authService.removeFromFavorites(gameId).subscribe(response => {
      console.log('Juego eliminado de favoritos con éxito.');

      // Actualizar la lista de favoritos en la interfaz de usuario.
      if (this.user?.favoriteGames) {
        this.user.favoriteGames = this.user.favoriteGames.filter(favoriteGame => favoriteGame.gameId.toString() !== gameId);
      }

      // Si 'favorites' es un Set u otra estructura donde almacenas los IDs de juegos favoritos en el cliente.
      // Asegúrate de que la lógica de eliminación aquí coincida con el tipo de dato de gameId (number o string).
      this.favorites.delete(parseInt(gameId, 10));
    }, error => {
      console.error('Error al eliminar el juego de favoritos:', error);
    });
  }

  addToFavorites(game: Result): void {
    // Verificamos si el juego ya está en la lista de favoritos por su gameId.
    const isFavorite = this.user?.favoriteGames.some(favoriteGame => favoriteGame.gameId === game.id);

    if (!isFavorite) {
      this.authService.addToFavorites(game.id.toString(), game.background_image).subscribe(response => {
        console.log('Juego añadido a favoritos con éxito.');

        // Actualizar la lista de favoritos en la interfaz de usuario.
        // Nota: Asegúrate de manejar el caso en que 'this.user.favoriteGames' pueda ser undefined.
        this.user?.favoriteGames.push({ gameId: game.id, imageUrl: game.background_image });

        // Si 'favorites' es un Set u otra estructura donde almacenas los IDs de juegos favoritos en el cliente.
        this.favorites.add(game.id);
      }, error => {
        console.error('Error al añadir el juego a favoritos:', error);
      });
    } else {
      console.log('El juego ya está en tus favoritos.');
    }
  }
}

