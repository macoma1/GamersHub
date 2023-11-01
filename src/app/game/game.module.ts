import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: GameComponent }
    ]),
    
  ]
})
export class GameModule { }
