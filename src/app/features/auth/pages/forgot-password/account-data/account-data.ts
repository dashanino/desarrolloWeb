import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-data',
  imports: [ReactiveFormsModule],
  templateUrl: './account-data.html',
  styleUrl: './account-data.scss',
})
export class AccountData {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cedulaTest = '123456';
emailTest = 'urgentia@gmail.com';

form = this.fb.group({
  cedula: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
});
goBack() {
  this.router.navigate(['/begin']);
}
submit() {
  if (this.form.invalid) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  const cedula = this.form.value.cedula;
  const email = this.form.value.email;

  if (cedula !== this.cedulaTest || email !== this.emailTest) {
    alert('La cédula y el correo electrónico no corresponden a una cuenta registrada..');
    return;
  }

  console.log('Datos correctos');
  this.router.navigate(['/recuperar-contraseña/codigo']);
}
}