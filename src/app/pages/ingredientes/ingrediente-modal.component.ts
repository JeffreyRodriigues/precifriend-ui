import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredienteService } from '../../service/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente.model';

@Component({
  selector: 'app-ingrediente-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="fechar()"></div>
    <div class="modal-content">
      <h2>{{ isEdit ? 'Editar Ingrediente' : 'Novo Ingrediente' }}</h2>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" (click)="$event.stopPropagation()">
        <label>
          Nome:
          <input formControlName="nome" />
        </label><br/>
        <label>
          Quantidade Embalagem (g):
          <input type="number" formControlName="quantidadeEmbalagem" />
        </label><br/>
        <label>
          Custo Embalagem (R$):
          <input type="number" step="0.01" formControlName="custoEmbalagem" />
        </label><br/>
        <button type="submit" [disabled]="form.invalid">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
        <button type="button" (click)="fechar()">Cancelar</button>
      </form>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      z-index: 10;
    }
    .modal-content {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 1rem;
      z-index: 11;
      border-radius: 5px;
      width: 300px;
    }
    input { width: 100%; }
  `]
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
