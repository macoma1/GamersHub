import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from '../../services/videogames.service';
import { Result, Screenshot } from '../../models/videogame.model';
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
      this.authService.getCurrentUser().subscribe(
        user => {
          this.user = user;
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
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
        this.displayComments();
      });
    }
  }

  displayComments(): void {
    const start = (this.commentPage - 1) * this.commentsPerPage;
    let end = start + this.commentsPerPage;
    this.displayedComments = this.comments.slice(start, end);
    while (this.displayedComments.length < this.commentsPerPage) {
      this.displayedComments.push(this.createPlaceholderComment());
    }
  }

  createPlaceholderComment(): Comment {
    return {
      email: '',
      userName: '',
      gameId: this.game ? this.game.id : 0,
      content: '',
      date: new Date,
    };
  }

  loadMoreComments(): void {
    const maxPages = Math.ceil(this.comments.length / this.commentsPerPage);
    if (this.commentPage < maxPages) {
      this.commentPage++;
      this.displayComments();
    }

  }
  loadPreviousComments(): void {
    if (this.commentPage > 1) {
      this.commentPage--;
      this.displayComments();
    }
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
          this.loadComments();
          this.newComment = '';
        },
        error => {
          console.error('Error posting comment', error);
        }
      );
    }
  }
  deleteComment(commentId: string): void {
    if (confirm('DELETE?')) {
      this.commentsService.deleteComment(commentId).subscribe(
        () => {
          const remainingComments = this.comments.length - 1;
          const isLastCommentOnPage = remainingComments % this.commentsPerPage === 0;
          const isFirstCommentOnPage = (remainingComments + 1) % this.commentsPerPage === 0;
          if (isLastCommentOnPage && this.commentPage > 1) {
            this.commentPage--;
          }
          if (!isFirstCommentOnPage || this.commentPage === 1) {
            this.loadComments();
          }
        },
        error => {
          console.error('Error deleting comment', error);
        }
      );
    }
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}  
