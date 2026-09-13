import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-begin',
  imports: [],
  templateUrl:'./begin.html',
  styleUrl: './begin.scss',
})
export class Begin {

  private router = inject(Router);

  irEmergencia() {
    this.router.navigate(['/antecedentes']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

}