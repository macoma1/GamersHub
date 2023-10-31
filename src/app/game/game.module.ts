import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollDirective } from '../InfiniteScrollDirective';

@NgModule({
  declarations: [GameComponent, InfiniteScrollDirective], // Add the directive here
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: GameComponent }
    ]),
    InfiniteScrollModule
  ]
})
export class GameModule { }
