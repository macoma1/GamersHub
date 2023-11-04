import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from '../../services/videogames.service';
import { Result, Screenshot } from '../../models/videogame.interface';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../models/user.model';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment.model';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})

export class GameInfoComponent implements OnInit {
  game: Result | null = null;
  comments: Comment[] = [];
  displayedComments: Comment[] = [];
  newComment: string = '';
  user: User | null = null;
  screenshots?: Screenshot[];
  public commentPage: number = 1;
  public commentsPerPage: number = 3;

  constructor(
    private route: ActivatedRoute,
    private videogamesService: VideogamesService,
    private authService: AuthService,
    private commentsService: CommentsService,
    private gameService: GameService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.gameService.isLoading = true;
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.videogamesService.getGameInfo(+gameId).subscribe(response => {
        this.game = response;
        // Now get the screenshots once you have the game info
        this.videogamesService.getScreenshots(+gameId).subscribe(screenshots => {
          if (this.game) {
            this.game.screenshots = screenshots;
          }
        });

        this.commentsService.getComments(+gameId).subscribe(comments => {
          this.comments = comments;
        });
      });
    }

    if (this.authService.getToken()) {
      console.log('Token: ' + this.authService.getToken());
      this.authService.getCurrentUser().subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.error('Error fetching user', error);
        }
      );
    }
    this.loadComments();
  }
  
  openModal(index: number): void {
    const modalId = `screenshotModal-${index}`;
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = 'block';
    }
  }

  closeModal(index: number): void {
    const modalId = `screenshotModal-${index}`;
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      modalElement.style.display = 'none';
    }
  }

  loadComments(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.commentsService.getComments(+gameId).subscribe(comments => {
        this.comments = comments.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0; // Fallback to 0 if 'a.date' is undefined
          const dateB = b.date ? new Date(b.date).getTime() : 0; // Fallback to 0 if 'b.date' is undefined
          return dateB - dateA; // Sort in descending order
        });
        this.displayComments();  // This will take care of displaying only the first 3 comments
      });
    }
  }

  displayComments(): void {
    const start = (this.commentPage - 1) * this.commentsPerPage;
    let end = start + this.commentsPerPage;
    const maxPages = Math.ceil(this.comments.length / this.commentsPerPage);

    // Solo toma los comentarios que corresponden a la página actual.
    this.displayedComments = this.comments.slice(start, end);

    // Si estamos en la primera página o la última página y hay menos comentarios de los esperados,
    // entonces llenamos con placeholders.
    if (this.commentPage === 1 || this.commentPage === maxPages) {
      const placeholdersCount = this.commentsPerPage - this.displayedComments.length;

      // Agrega placeholders solo si es necesario.
      for (let i = 0; i < placeholdersCount; i++) {
        this.displayedComments.push(this.createPlaceholderComment());
      }
    }
  }


  // Método para crear un comentario placeholder.
  // Método para crear un comentario placeholder.
  createPlaceholderComment(): Comment {
    return {
      email: '',
      userName: '',
      gameId: this.game ? this.game.id : 0, // Suponiendo que un gameId de 0 es inválido.
      content: '',
      date: new Date, // Agregar fecha como null o dejar sin inicializar si es opcional
    };
  }



  loadMoreComments(): void {
    const maxPages = Math.ceil(this.comments.length / this.commentsPerPage);
    this.commentPage++;
    if (this.commentPage > maxPages) {
      this.commentPage = 1;
    }

    this.displayComments();
  }

  postComment(): void {
    if (this.user && this.newComment.trim() && this.game) {
      const comment: Comment = {
        email: this.user.email,
        userName: this.user.name,
        gameId: this.game.id,
        content: this.newComment.trim()
      };

      this.commentsService.addComment(comment).subscribe(
        newComment => {
          this.comments.push(newComment);
          this.newComment = '';
        },
        error => {
          console.error('Error posting comment', error);
        }
      );
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}  
