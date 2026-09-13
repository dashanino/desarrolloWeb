import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MatIconModule,RouterLink],
  standalone:true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})

export class Header {
  private router = inject(Router);
  pageTitle = signal('Dashboard') //variable que detecta un cambio al valor asociado (AL SET)

  showProfileMenu = false;
  showProfileModal = false;
 
  constructor(){
    //se ejecute un método
    this.updatePageTitle();
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => { //subscribe se queda esperando a que alguien le indique algo
      this.updatePageTitle();
    });
  }

  private updatePageTitle(){
    const url = this.router.url //si url incluye usuarios
    if (url.includes('usuarios')) {
      this.pageTitle.set('Usuarios');
      return;
    }
    if (url.includes('dashboard')) {
      this.pageTitle.set('Dashboard');
      return;
    }
    if (url.includes('home')) {
      this.pageTitle.set('Home');
      return;
    }
  }

  toggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
    console.log('perfil'), this.showProfileMenu
  }

  openProfileModal(){
    this.showProfileModal = true;
    this.showProfileMenu = false;
  }

  closeProfileModal(){
    this.showProfileModal = false;

  }

  logout(){
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

}