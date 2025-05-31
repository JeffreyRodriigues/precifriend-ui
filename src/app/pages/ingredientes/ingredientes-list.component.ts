import { Component, OnInit } from '@angular/core';
import { Ingrediente } from '../../models/ingrediente.model';
import { IngredienteService } from '../../service/ingrediente.service';
import { IngredienteModalComponent } from './ingrediente-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredientes-list',
  standalone: true,
  imports: [CommonModule, IngredienteModalComponent],
  template: `
    <div class="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-3xl font-bold text-gray-800">Ingredientes</h2>
        <button
          (click)="abrirModal()"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Novo Ingrediente
        </button>
      </div>

      <ul class="divide-y divide-gray-200">
        <li
          *ngFor="let ingrediente of ingredientes"
          class="flex justify-between items-center py-3 hover:bg-gray-50 rounded"
        >
          <div>
            <p class="text-lg font-semibold text-gray-900">{{ ingrediente.nome }}</p>
            <p class="text-sm text-gray-600">
              {{ ingrediente.quantidadeEmbalagem }}g — R$ {{ ingrediente.custoEmbalagem | number:'1.2-2' }}
            </p>
          </div>

          <div class="space-x-2">
            <button
              (click)="abrirModal(ingrediente)"
              class="text-blue-600 hover:underline"
              aria-label="Editar ingrediente"
            >
              Editar
            </button>
            <button
              (click)="deleteIngrediente(ingrediente.id!)"
              class="text-red-600 hover:underline"
              aria-label="Excluir ingrediente"
            >
              Excluir
            </button>
          </div>
        </li>
      </ul>

      <app-ingrediente-modal
        *ngIf="mostrarModal"
        [ingrediente]="ingredienteSelecionado"
        (saved)="onSalvo()"
        (closed)="onFechar()"
      ></app-ingrediente-modal>
    </div>
  `,
})
export class IngredientesListComponent implements OnInit {
  ingredientes: Ingrediente[] = [];
  mostrarModal = false;
  ingredienteSelecionado?: Ingrediente;

  constructor(private ingredienteService: IngredienteService) {}

  ngOnInit(): void {
    this.loadIngredientes();
  }

  loadIngredientes(): void {
    this.ingredienteService.getIngredientes().subscribe(data => {
      this.ingredientes = data;
    });
  }

  abrirModal(ingrediente?: Ingrediente): void {
    this.ingredienteSelecionado = ingrediente ? { ...ingrediente } : undefined;
    this.mostrarModal = true;
  }

  onSalvo(): void {
    this.mostrarModal = false;
    this.loadIngredientes();
  }

  onFechar(): void {
    this.mostrarModal = false;
  }

  deleteIngrediente(id: number): void {
    if (confirm('Tem certeza que deseja excluir este ingrediente?')) {
      this.ingredienteService.deleteIngrediente(id).subscribe(() => {
        this.loadIngredientes();
      });
    }
  }
}
