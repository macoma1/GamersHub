import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    {
      this.http.post('http://localhost:3000/login', this.loginForm.value)
        .subscribe((response: any) => {
          if (response) { // && response.token
            alert('Inicio de sesión exitoso!');
            localStorage.setItem('authToken', response.token);
            this.router.navigate(['/home']);
          }
        }, error => {
          // Muestra un mensaje de error al usuario
          console.error('Error en el inicio de sesión:', error);
        });
    }
  }

}