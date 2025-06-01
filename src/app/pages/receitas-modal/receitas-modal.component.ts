import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Receita } from '../../models/receita.model';
import { Ingrediente } from '../../models/ingrediente.model';
import { ReceitaService } from '../../service/receita.service';
import { IngredienteService } from '../../service/ingrediente.service';

@Component({
  selector: 'app-receita-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './receitas-modal.component.html',
})
export class ReceitaModalComponent implements OnInit {
  @Input() receita?: Receita;
  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  ingredientesDisponiveis: Ingrediente[] = [];

  constructor(
    private fb: FormBuilder,
    private receitaService: ReceitaService,
    private ingredienteService: IngredienteService
  ) {}

  ngOnInit() {
  this.ingredienteService.getIngredientes().subscribe(data => this.ingredientesDisponiveis = data);
  this.form = this.fb.group({
    nome: [this.receita?.nome || '', Validators.required],
    itens: this.fb.array(
      (this.receita?.itens?.map(item =>
        this.criarItem(item.ingrediente.id, item.quantidade)
      )) || [this.criarItem()]
    )
  });
}


  get itens() {
    return this.form.get('itens') as FormArray;
  }

  criarItem(ingredienteId: number | null = null, quantidade: number | null = null): FormGroup {
    return this.fb.group({
      ingredienteId: [ingredienteId, Validators.required],
      quantidade: [quantidade, [Validators.required, Validators.min(1)]]
    });
  }

  adicionarItem() {
    this.itens.push(this.criarItem());
  }

  removerItem(index: number) {
    this.itens.removeAt(index);
  }

  salvar() {
    const receitaPayload: Receita = {
      id: this.receita?.id,
      nome: this.form.value.nome,
      itens: this.form.value.itens.map((item: any) => ({
        ingrediente: { id: item.ingredienteId } as Ingrediente,
        quantidade: item.quantidade
      })),
      custoTotal: 0,
      precoFinal: 0
    };

    const op = receitaPayload.id
      ? this.receitaService.update(receitaPayload.id, receitaPayload)
      : this.receitaService.create(receitaPayload);

    op.subscribe(() => this.saved.emit());
  }

  fechar() {
    this.closed.emit();
  }
}
