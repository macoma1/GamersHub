import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { GameInfoComponent } from '../game-info/game-info.component';




const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./login.module').then(m => m.LoginModule)
  },
  {
    path: 'register', loadChildren: () => import('./register.module').then(m => m.RegisterModule)
  },
  { path: 'profile', component: ProfileComponent },
  { path: '', loadChildren: () => import('./game.module').then(m => m.GameModule) },
  { path: 'game/:id', component: GameInfoComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
