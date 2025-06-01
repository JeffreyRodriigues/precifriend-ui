// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header class="bg-indigo-600 text-white p-4 shadow-md">
      <h1 class="text-xl font-semibold">Precifriend</h1>
      <nav class="mt-2">
        <a routerLink="/ingredientes" routerLinkActive="underline" class="mr-4 cursor-pointer hover:text-indigo-200">Ingredientes</a>
        <a routerLink="/receitas" routerLinkActive="underline" class="cursor-pointer hover:text-indigo-200">Receitas</a>
      </nav>
    </header>

    <main class="container mx-auto p-6">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}
