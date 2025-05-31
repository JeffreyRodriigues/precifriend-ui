import { ItemReceita } from './item-receita.model';

export interface Receita {
  id?: number;
  nome: string;
  itens: ItemReceita[];
  custoTotal: number;
  precoFinal: number;
}
