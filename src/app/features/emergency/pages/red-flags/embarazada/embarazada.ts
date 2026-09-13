import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-embarazada',
  imports: [MatIconModule],
  templateUrl: './embarazada.html',
  styleUrl: './embarazada.scss',
})
export class Embarazada {

  private router = inject(Router);

  banderaSeleccionada: string | null = null;

  seleccionarBandera(bandera: string) {
    this.banderaSeleccionada = bandera;
  }

  estaSeleccionada(bandera: string): boolean {
    return this.banderaSeleccionada === bandera;
  }

  continuar() {
    if (!this.banderaSeleccionada) {
      return;
    }

    sessionStorage.setItem(
      'banderaRoja',
      this.banderaSeleccionada
    );

    this.router.navigate(['/resultado']);
  }
  goBack() {
    this.router.navigate(['/patient-group']);
  }
}