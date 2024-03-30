import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ResultsComponent } from './esg/results/results.component';
import { FormComponent } from './esg/form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'results',
        component: ResultsComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      },
    ],
  },
];
