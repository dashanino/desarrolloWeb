import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-antecedentes',
  imports: [MatIconModule,ReactiveFormsModule],
  templateUrl: './antecedentes.html',
  styleUrl: './antecedentes.scss',
})
export class Antecedentes {

  private router = inject(Router);

  antecedentesSeleccionados: string[] = [];

  toggleAntecedente(antecedente: string) {
    if (this.antecedentesSeleccionados.includes(antecedente)) {
      this.antecedentesSeleccionados =
        this.antecedentesSeleccionados.filter(
          item => item !== antecedente
        );
    } else {
      this.antecedentesSeleccionados.push(antecedente);
    }
  }

  isSelected(antecedente: string): boolean {
    return this.antecedentesSeleccionados.includes(antecedente);
  }

  continuar() {
    sessionStorage.setItem(
      'antecedentes',
      JSON.stringify(this.antecedentesSeleccionados)
    );

    this.router.navigate(['/patient-group']);
  }
}

