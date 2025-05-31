import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredienteService } from '../../service/ingrediente.service';
import { Ingrediente } from '../../models/ingrediente.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ingrediente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>{{ isEdit ? 'Editar Ingrediente' : 'Novo Ingrediente' }}</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>
        Nome:
        <input formControlName="nome" />
      </label><br />
      <label>
        Quantidade Embalagem (g):
        <input type="number" formControlName="quantidadeEmbalagem" />
      </label><br />
      <label>
        Custo Embalagem (R$):
        <input type="number" step="0.01" formControlName="custoEmbalagem" />
      </label><br />

      <button type="submit" [disabled]="form.invalid">{{ isEdit ? 'Atualizar' : 'Salvar' }}</button>
    </form>
  `
})
export class IngredienteFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private ingredienteService: IngredienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      quantidadeEmbalagem: [null, [Validators.required, Validators.min(1)]],
      custoEmbalagem: [null, [Validators.required, Validators.min(0)]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.id = +params['id'];
        this.ingredienteService.getIngrediente(this.id).subscribe(data => {
          this.form.patchValue(data);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const ingrediente = this.form.value as Ingrediente;

    if (this.isEdit && this.id != null) {
      this.ingredienteService.updateIngrediente(this.id, ingrediente).subscribe(() => {
        this.router.navigate(['/ingredientes']);
      });
    } else {
      this.ingredienteService.createIngrediente(ingrediente).subscribe(() => {
        this.router.navigate(['/ingredientes']);
      });
    }
  }
}
