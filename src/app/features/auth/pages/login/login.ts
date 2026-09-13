import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {LOGIN_USERS_MOCK} from '../../../../mocks/login/login.mock';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  emailTest = 'urgentia@gmail.com';
  passwordTest = '123456';

  showPasswordValue = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })


  goBack() {
    this.router.navigate(['/begin']);
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }

  submit() {
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const password = this.form.value.password;
    const email = this.form.value.email;

    const userFound = LOGIN_USERS_MOCK.find(
      (user)=> user.email === email && user.password ===password,
    );

    if (!userFound){
      alert ('Correo o contraseña incorrectos')
      return
    }

   sessionStorage.setItem('isLoggedIn', 'true');


    console.log('Datos correctos');
    this.router.navigate(['/app/dashboard']);
  }
}