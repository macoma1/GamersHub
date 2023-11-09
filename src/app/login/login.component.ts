import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginFailed: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    this.loginFailed = false;
    this.authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/profile']);
      },
      (error: any) => {
        console.error('Error en el inicio de sesión:', error);
        this.loginFailed = true;
      }
    );
  }


}
