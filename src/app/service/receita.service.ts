import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Receita } from '../models/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
  private apiUrl = `${environment.apiUrl}/receitas`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Receita[]> {
    return this.http.get<Receita[]>(this.apiUrl);
  }

  getById(id: number): Observable<Receita> {
    return this.http.get<Receita>(`${this.apiUrl}/${id}`);
  }

  create(receita: Receita): Observable<Receita> {
    return this.http.post<Receita>(this.apiUrl, receita);
  }

  update(id: number, receita: Receita): Observable<Receita> {
    return this.http.put<Receita>(`${this.apiUrl}/${id}`, receita);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
