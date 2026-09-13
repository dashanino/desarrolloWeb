import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './new-password.html',
  styleUrl: './new-password.scss',
})
export class NewPassword {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  showNewPassword = false;
  showConfirmPassword = false;


  form = this.fb.group({
    NewPassword: ['', Validators.required],
    ConfirmPassword: ['', Validators.required],
  });


  showNewPasswordValue() {
      this.showNewPassword = !this.showNewPassword;
    }

  showConfirmPasswordValue() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  submit() {

    if (this.form.invalid) {
      alert('Por favor, complete ambos campos.');
      return;
    }

    const password = this.form.value.NewPassword;
    const confirmPassword = this.form.value.ConfirmPassword;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    console.log('Contraseña actualizada');

    this.router.navigate(['/recuperar-contraseña/exito']);
  }
}
