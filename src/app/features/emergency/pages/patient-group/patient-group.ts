import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-group',
  imports: [MatIconModule],
  templateUrl: './patient-group.html',
  styleUrl: './patient-group.scss',
})
export class PatientGroup {

  private router = inject(Router);

  poblacionSeleccionada: string | null = null;

  seleccionarPoblacion(poblacion: string) {
    this.poblacionSeleccionada = poblacion;
  }

  estaSeleccionada(poblacion: string): boolean {
    return this.poblacionSeleccionada === poblacion;
  }

  continuar() {
    if (!this.poblacionSeleccionada) {
      return;
    }

    sessionStorage.setItem(
      'tipoPoblacion',
      this.poblacionSeleccionada
    );

    switch (this.poblacionSeleccionada) {
      case 'Niño':
        this.router.navigate(['/red-flags/nino']);
        break;

      case 'Adulto':
        this.router.navigate(['/red-flags/adulto']);
        break;

      case 'Adulto Mayor':
        this.router.navigate(['/red-flags/adulto-mayor']);
        break;

      case 'Embarazada':
        this.router.navigate(['/red-flags/embarazada']);
        break;

      case 'Trauma/Accidente':
        this.router.navigate(['/red-flags/trauma']);
        break;
    }
  }

  goBack() {
    this.router.navigate(['/antecedentes']);
  }
}