import { Routes } from '@angular/router';
import { OrderListComponent } from './features/components/order-list/order-list.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'orders',
    component: OrderListComponent,
  },
];
