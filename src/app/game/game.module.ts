import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GameComponent }
    ]),
    InfiniteScrollModule
  ]
})
export class GameModule { }
