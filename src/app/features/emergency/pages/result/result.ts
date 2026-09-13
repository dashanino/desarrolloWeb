import { Component,inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-result',
  imports: [MatIconModule],
  templateUrl: './result.html',
  styleUrl: './result.scss',
})
export class Result {
  private router = inject(Router);
  goBack() {
    this.router.navigate(['/red-flags/embarazada']);
  }
}
