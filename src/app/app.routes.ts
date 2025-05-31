import { Routes } from '@angular/router';
import { IngredientesListComponent } from './pages/ingredientes/ingredientes-list.component';

export const routes: Routes = [
  { path: 'ingredientes', component: IngredientesListComponent },
  { path: '', redirectTo: 'ingredientes', pathMatch: 'full' },
  { path: '**', redirectTo: 'ingredientes' }
];
