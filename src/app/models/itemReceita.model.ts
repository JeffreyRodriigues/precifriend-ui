import { Ingrediente } from './ingrediente.model';

export interface ItemReceita {
  id: number;
  ingrediente: Ingrediente;
  quantidade: number;
}
