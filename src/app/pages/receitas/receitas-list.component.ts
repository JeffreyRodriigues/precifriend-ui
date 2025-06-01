import { Component, OnInit } from '@angular/core';
import { Receita } from '../../models/receita.model';
import { ReceitaService } from '../../service/receita.service';
import { ReceitaModalComponent } from '../receitas-modal/receitas-modal.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-receita-list',
  standalone: true,
  imports: [NgIf, NgFor, ReceitaModalComponent],
  templateUrl: './receitas-list.component.html',
})
export class ReceitaListComponent implements OnInit {
  receitas: Receita[] = [];
  receitaSelecionada?: Receita;
  modalAberto = false;

  constructor(private receitaService: ReceitaService) {}

  ngOnInit() {
    this.carregarReceitas();
  }

  carregarReceitas() {
    this.receitaService.getAll().subscribe(res => this.receitas = res);
  }

  novaReceita() {
    this.receitaSelecionada = undefined;
    this.modalAberto = true;
  }

  editar(receita: Receita) {
    this.receitaSelecionada = receita;
    this.modalAberto = true;
  }

  Salvar() {
    this.modalAberto = false;
    this.carregarReceitas();
  }

  excluir(id: number) {
    this.receitaService.delete(id).subscribe(() => this.carregarReceitas());
  }
}
