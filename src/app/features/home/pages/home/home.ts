import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl:'./home.html',
  styleUrl: './home.scss',
})
export class Home {

  private router = inject(Router);

  irPerfil() {
    this.router.navigate(['app/perfil']);
  }

  // nuevaEvaluacion() {
  //   this.router.navigate(['/red-flags/adulto']);
  // }

}