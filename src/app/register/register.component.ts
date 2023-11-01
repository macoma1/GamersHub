import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/users', this.registerForm.value)
        .subscribe(response => {
          // Maneja la respuesta aquí, por ejemplo redirigir al usuario a la página de inicio
        }, error => {
          // Maneja los errores aquí, por ejemplo mostrar un mensaje al usuario
        });
        console.log(this.registerForm.value);
    }
  }
}
