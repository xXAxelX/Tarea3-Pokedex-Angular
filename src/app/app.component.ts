// Importaciones necesarias para el componente principal de la app
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { PokemonService } from './services/pokemon.service';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
// Animaciones para listas y detalle
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  // Importa componentes e HttpClient para peticiones
    CommonModule,
    HttpClientModule,
    PokemonListComponent,
    PokemonDetailComponent,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokemonService],// Servicio disponible solo en este componente
  animations: [
    // Animación para la lista de pokemones
    trigger('fadeInList', [
      transition('* => *', [
        query('li', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeDetail', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  pokemones: any[] = []; // Lista de pokemones
  error: string = ''; 
  offset: number = 0;   // Control de paginación
  pokemonSeleccionado: any = null;
  cargando: boolean = false;

  constructor(private pokemonService: PokemonService) {
    console.log('AppComponent iniciado');
  }

  ngOnInit(): void {
    this.cargarPokemones(); // Carga inicial
  }
// Carga la lista de pokemones desde la API
  cargarPokemones(): void {
    this.cargando = true;
    this.pokemonService.getPokemonList(this.offset).subscribe({
      next: (data: any[]) => {
        console.log('Pokemones cargados:', data);
        this.pokemones = [...this.pokemones, ...data];
        this.offset += 10;
        this.cargando = false;
      },
      error: (err: any) => {
        this.error = err.message;
        this.cargando = false;
      }
    });
  }
  // Carga el detalle
  verDetalles(pokemon: any): void {
    this.pokemonService.getPokemonDetails(pokemon.url).subscribe({
      next: (data: any) => {
        this.pokemonSeleccionado = {
          name: data.name,
          imageUrl: data.sprites.front_default,
          abilities: data.abilities.map((a: any) => a.ability.name)
        };
      },
      error: (err: any) => {
        this.error = 'Error al cargar los detalles del Pokémon.';
      }
    });
  }
// Cierra el panel de detalle
  cerrarDetalles(): void {
    this.pokemonSeleccionado = null;
  }
}
