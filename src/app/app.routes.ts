import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guards';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
  // Ruta inicial
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'begin',
  },

  // -------------------------
  // AUTENTICACIÓN
  // -------------------------

  {
    path: 'begin',
    loadComponent: () => import('./features/begin/pages/begin').then((m) => m.Begin),
  },

  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login').then((m) => m.Login),
  },

  {
    path: 'registro',
    loadComponent: () => import('./features/auth/pages/register/register').then((m) => m.Register),
  },

  {
    path: 'recuperar-contraseña',
    loadComponent: () =>
      import('./features/auth/pages/forgot-password/account-data/account-data').then(
        (m) => m.AccountData,
      ),
  },

  {
    path: 'recuperar-contraseña/codigo',
    loadComponent: () =>
      import('./features/auth/pages/forgot-password/verify-code/verify-code').then(
        (m) => m.VerifyCode,
      ),
  },

  {
    path: 'recuperar-contraseña/nueva-contraseña',
    loadComponent: () =>
      import('./features/auth/pages/forgot-password/new-password/new-password').then(
        (m) => m.NewPassword,
      ),
  },

  {
    path: 'recuperar-contraseña/exito',
    loadComponent: () =>
      import('./features/auth/pages/forgot-password/success/success').then((m) => m.Success),
  },

  // -------------------------
  // MAIN LAYOUT
  // Rutas hijas
  // -------------------------

  {
    path: 'app',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/pages/home/home').then((m) => m.Home),
      },

      {
        path: 'perfil',
        loadComponent: () => import('./features/perfil/pages/perfil/perfil').then((m) => m.Perfil),
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuarios/usuarios').then((m) => m.Usuarios),
      },
    ],
  },

  // -------------------------
  // EMERGENCY
  // -------------------------

  {
    path: 'patient-group',
    loadComponent: () =>
      import('./features/emergency/pages/patient-group/patient-group').then((m) => m.PatientGroup),
  },

  {
    path: 'antecedentes',
    loadComponent: () =>
      import('./features/emergency/pages/antecedentes/antecedentes').then((m) => m.Antecedentes),
  },

  {
    path: 'red-flags/adulto',
    loadComponent: () =>
      import('./features/emergency/pages/red-flags/adulto/adulto').then((m) => m.Adulto),
  },

  {
    path: 'red-flags/adulto-mayor',
    loadComponent: () =>
      import('./features/emergency/pages/red-flags/adulto-mayor/adulto-mayor').then(
        (m) => m.AdultoMayor,
      ),
  },

  {
    path: 'red-flags/embarazada',
    loadComponent: () =>
      import('./features/emergency/pages/red-flags/embarazada/embarazada').then(
        (m) => m.Embarazada,
      ),
  },

  {
    path: 'red-flags/nino',
    loadComponent: () =>
      import('./features/emergency/pages/red-flags/nino/nino').then((m) => m.Nino),
  },

  {
    path: 'red-flags/trauma',
    loadComponent: () =>
      import('./features/emergency/pages/red-flags/trauma/trauma').then((m) => m.Trauma),
  },

  {
    path: 'resultado',
    loadComponent: () => import('./features/emergency/pages/result/result').then((m) => m.Result),
  },

  // -------------------------
  // RUTA NO ENCONTRADA
  // -------------------------

  {
    path: '**',
    redirectTo: 'begin',
  },
];
