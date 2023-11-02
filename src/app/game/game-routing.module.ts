import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game.component';
import { GameInfoComponent } from '../game-info/game-info.component';

const routes: Routes = [
    { path: '', component: GameComponent },
    { path: ':id', component: GameInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule { }
