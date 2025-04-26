import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {} // Inyección de dependencia 

  getPokemonList(offset: number = 0) {
     // Obtiene 10 Pokémon desde la API a partir del offset.
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      .pipe(map(res => res.results));// Extrae solo el array de resultados.
  }

  getPokemonDetails(url: string) {
    // Obtiene detalles del Pokémon usando su URL.
    return this.http.get<any>(url);
  }
}

