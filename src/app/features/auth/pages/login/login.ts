import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
 
  userTest = 'Jesus';
  password = '1234567';
 
  form = this.fb.group({
    user: ['', Validators.required],
    //email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
 
  initLogin() {
    console.log('Login initialized');
    //window.location.href = '/home';
    this.router.navigate(['/home']);
  }
 
  submit(){
    if (this.form.valid) {
      console.log('Form submitted', this.form.value);
      // Handle form submission logic here
      this.router.navigate(['/home']);
    }
    }
}
