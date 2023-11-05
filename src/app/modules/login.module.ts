// login.module.ts

import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(loginRoutes)
  ]
})
export class LoginModule {}
