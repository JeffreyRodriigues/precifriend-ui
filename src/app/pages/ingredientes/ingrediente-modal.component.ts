import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredienteService } from '../../service/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente.model';

@Component({
  selector: 'app-ingrediente-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [FormBuilder],
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      (click)="fechar()"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg"
        (click)="$event.stopPropagation()"
      >
        <h2 class="text-xl font-semibold mb-4">
          {{ isEdit ? 'Editar Ingrediente' : 'Novo Ingrediente' }}
        </h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <label class="block mb-3">
            <span class="text-gray-700 font-medium">Nome:</span>
            <input
              formControlName="nome"
              type="text"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="form.controls['nome'].invalid && form.controls['nome'].touched"
            />
            <small
              *ngIf="form.controls['nome'].invalid && form.controls['nome'].touched"
              class="text-red-600 text-sm"
            >
              Nome é obrigatório.
            </small>
          </label>

          <label class="block mb-3">
            <span class="text-gray-700 font-medium">Quantidade Embalagem (g):</span>
            <input
              formControlName="quantidadeEmbalagem"
              type="number"
              min="1"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="
                form.controls['quantidadeEmbalagem'].invalid && form.controls['quantidadeEmbalagem'].touched
              "
            />
            <small
              *ngIf="form.controls['quantidadeEmbalagem'].invalid && form.controls['quantidadeEmbalagem'].touched"
              class="text-red-600 text-sm"
            >
              Quantidade deve ser no mínimo 1.
            </small>
          </label>

          <label class="block mb-4">
            <span class="text-gray-700 font-medium">Custo Embalagem (R$):</span>
            <input
              formControlName="custoEmbalagem"
              type="number"
              step="0.01"
              min="0"
              class="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              [class.border-red-500]="form.controls['custoEmbalagem'].invalid && form.controls['custoEmbalagem'].touched"
            />
            <small
              *ngIf="form.controls['custoEmbalagem'].invalid && form.controls['custoEmbalagem'].touched"
              class="text-red-600 text-sm"
            >
              Custo deve ser zero ou positivo.
            </small>
          </label>

          <div class="flex justify-end space-x-3">
            <button
              type="submit"
              [disabled]="form.invalid"
              class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {{ isEdit ? 'Atualizar' : 'Salvar' }}
            </button>
            <button
              type="button"
              (click)="fechar()"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class IngredienteModalComponent implements OnInit, OnChanges {
  @Input() ingrediente?: Ingrediente;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ingrediente']) {
      this.isEdit = !!this.ingrediente?.id;
      this.initForm();
      if (this.isEdit && this.ingrediente) {
        this.form.patchValue(this.ingrediente);
      }
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      nome: [this.ingrediente?.nome || '', Validators.required],
      quantidadeEmbalagem: [this.ingrediente?.quantidadeEmbalagem || null, [Validators.required, Validators.min(1)]],
      custoEmbalagem: [this.ingrediente?.custoEmbalagem || null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const ingredienteDados: Ingrediente = this.form.value;

    if (this.isEdit && this.ingrediente?.id) {
      this.ingredienteService.updateIngrediente(this.ingrediente.id, ingredienteDados).subscribe(() => {
        this.saved.emit();
      });
    } else {
      this.ingredienteService.createIngrediente(ingredienteDados).subscribe(() => {
        this.saved.emit();
      });
    }
  }

  fechar(): void {
    this.closed.emit();
  }
}