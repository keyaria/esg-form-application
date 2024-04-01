import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ResultsComponent } from './esg/results/results.component';
import { FormComponent } from './esg/form/form.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ResultsComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
    ],
  },
];
