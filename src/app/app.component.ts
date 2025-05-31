import { Component } from '@angular/core';
import { IngredientesListComponent } from './pages/ingredientes/ingredientes-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IngredientesListComponent],
  template: `<app-ingredientes-list />`
})
export class AppComponent {}
