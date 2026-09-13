import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss',
})
export class Perfil {
  private router = inject(Router);

  irHome() {
    this.router.navigate(['/home']);
  }

  cerrar() {
    this.router.navigate(['/login']);
    sessionStorage.setItem('isLoggedIn', 'false');
  }
   
  
  
}
