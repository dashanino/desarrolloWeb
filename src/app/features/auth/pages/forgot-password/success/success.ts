import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.html',
  styleUrl: './success.scss',
})
export class Success {
private router = inject(Router);
  submit() {
  console.log('Form submitted');
  this.router.navigate(['/login']);

  }
}
