import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideogamesService } from '../../services/videogames.service';
import { Result } from '../../models/videogame.interface';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../models/user.model';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment.model';
import { GameService } from 'src/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {
  game: Result | null = null;
  comments: Comment[] = [];
  newComment: string = '';
  user: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private videogamesService: VideogamesService,
    private authService: AuthService,
    private commentsService: CommentsService,
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameService.isLoading = true;
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.videogamesService.getGameInfo(+gameId).subscribe(response => {
        this.game = response;
      });
      this.commentsService.getComments(+gameId).subscribe(comments => {
        this.comments = comments;
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
