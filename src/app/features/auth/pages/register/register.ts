import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})

export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  form = this.fb.group({
    names: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', Validators.required],
    DOB: ['', Validators.required],
    EPS: ['', Validators.required],
    nueva_contraseña: ['', Validators.required],
    confirmar_contraseña: ['', Validators.required],
    terminos: [false, Validators.requiredTrue]
  });
  goBack() {
    this.router.navigate(['/begin']);
  }

  checkTerms(){
    window.open('docs/Urgentia_Terminos_Condiciones.pdf')
  }

  checkPrivacy(){
    window.open('/docs/Urgentia_Politica_Privacidad.pdf')
  }

  submit() {

    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const password = this.form.value.nueva_contraseña;
    const confirmPassword = this.form.value.confirmar_contraseña;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Form submitted', this.form.value);

    this.router.navigate(['/login']);
  }
}