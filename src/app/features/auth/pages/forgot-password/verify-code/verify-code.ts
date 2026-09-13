import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-verify-code',
  imports: [ReactiveFormsModule],
  templateUrl:'./verify-code.html',
  styleUrl: './verify-code.scss',
})
export class VerifyCode {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  code = Math.floor(100000 + Math.random() * 900000);

  form = this.fb.group({
    codigo: ['', Validators.required],
  });
  


constructor() {
    console.log('Código de verificación:', this.code);
  }

  submit() {
  if (this.form.valid) {
    if (Number(this.form.value.codigo) === this.code) {
        console.log('Código correcto');
        alert('Código ingresado correcto')
        this.router.navigate(['/recuperar-contraseña/nueva-contraseña']);

      } 
    else {
      console.log('Código incorrecto');
      alert('Código ingresado incorrecto, intente nuevamente')
    }

  }
}
}
