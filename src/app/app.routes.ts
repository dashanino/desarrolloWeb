import { Component } from '@angular/compiler';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/pages/login/login').then((Component) => Component.Login),
    },
    {
        path: 'registro',
        loadComponent: () =>
            import('./features/auth/pages/register/register').then((Component) => Component.Register),
    },
    {
        path: 'recuperar-contrasena',
        loadComponent: () =>
            import('./features/auth/pages/forgot-password/forgot-password').then((Component) => Component.ForgotPassword),
    },
    {
        path: 'home',
        loadComponent: () =>
            import('./features/home/pages/home/home').then((Component) => Component.Home),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: '**',
        redirectTo: 'login',
    }

];
