import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GameInfoComponent } from './game-info/game-info.component';




const routes: Routes = [
  { path: '', loadChildren: () => import('./game/game.module').then(m => m.GameModule) },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  { path: 'home', component: HomeComponent },
  { path: 'game/:id', component: GameInfoComponent },
  { path: '**', redirectTo: '' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
