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
    <h2>Ingredientes</h2>
    <button (click)="abrirModal()">Novo Ingrediente</button>

    <ul>
      <li *ngFor="let ingrediente of ingredientes">
        {{ ingrediente.nome }} - {{ ingrediente.quantidadeEmbalagem }}g - R$ {{ ingrediente.custoEmbalagem | currency:'BRL' }}
        <button (click)="abrirModal(ingrediente)">Editar</button>
        <button (click)="deleteIngrediente(ingrediente.id!)">Excluir</button>
      </li>
    </ul>

    <app-ingrediente-modal
      *ngIf="mostrarModal"
      [ingrediente]="ingredienteSelecionado"
      (saved)="onSalvo()"
      (closed)="onFechar()"
    ></app-ingrediente-modal>
  `
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
