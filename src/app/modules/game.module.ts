import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { GameInfoComponent } from '../game-info/game-info.component';

const routes: Routes = [
    { path: '', component: GameComponent },
    { path: ':id', component: GameInfoComponent }
];

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class GameModule { }

