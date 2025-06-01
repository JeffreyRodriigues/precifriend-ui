import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ingredientes',
    loadComponent: () => import('./pages/ingredientes/ingredientes-list.component').then(m => m.IngredientesListComponent)
  },
  {
    path: 'receitas',
    loadComponent: () => import('./pages/receitas/receitas-list.component').then(m => m.ReceitaListComponent)
  },
  { path: '', redirectTo: 'ingredientes', pathMatch: 'full' },
  { path: '**', redirectTo: 'ingredientes' }
];
