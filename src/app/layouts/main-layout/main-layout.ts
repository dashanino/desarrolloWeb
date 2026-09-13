import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Footer } from '../../shared/components/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
