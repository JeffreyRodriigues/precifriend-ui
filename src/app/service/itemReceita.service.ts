import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { ItemReceita } from '../models/itemReceita.model';

@Injectable({
  providedIn: 'root'
})
export class ItemReceitaService {
  private apiUrl = `${environment.apiUrl}/itens`;

  constructor(private http: HttpClient) {}

  getItensReceita(): Observable<ItemReceita[]> {
    return this.http.get<ItemReceita[]>(this.apiUrl);
  }

  getItemReceita(id: number): Observable<ItemReceita> {
    return this.http.get<ItemReceita>(`${this.apiUrl}/${id}`);
  }

  createItemReceita(item: ItemReceita): Observable<ItemReceita> {
    return this.http.post<ItemReceita>(this.apiUrl, item);
  }

  updateItemReceita(id: number, item: ItemReceita): Observable<ItemReceita> {
    return this.http.put<ItemReceita>(`${this.apiUrl}/${id}`, item);
  }

  deleteItemReceita(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
