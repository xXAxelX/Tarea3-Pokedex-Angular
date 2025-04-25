import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemonList(offset: number = 0) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`)
      .pipe(map(res => res.results));
  }

  getPokemonDetails(url: string) {
    return this.http.get<any>(url);
  }
}

