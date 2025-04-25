import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService } from './services/pokemon.service';
import { JoinPipe } from './join.pipe';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, JoinPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PokemonService],
  animations: [
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
  pokemones: any[] = [];
  error: string = '';
  offset: number = 0;
  pokemonSeleccionado: any = null;
  cargando: boolean = false;


  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.cargarPokemones();
  }

  cargarPokemones() {
    this.cargando = true;
    this.pokemonService.getPokemonList(this.offset).subscribe({
      next: data => {
        this.pokemones = [...this.pokemones, ...data];
        this.offset += 10;
        this.cargando = false;
      },
      error: err => {
        this.error = err.message;
        this.cargando = false;
      }
    });
  }
  

  verDetalles(pokemon: any) {
    this.pokemonService.getPokemonDetails(pokemon.url).subscribe({
      next: data => {
        this.pokemonSeleccionado = {
          name: data.name,
          imageUrl: data.sprites.front_default,
          abilities: data.abilities.map((a: any) => a.ability.name)
        };
      },
      error: err => this.error = 'Error al cargar los detalles del Pokémon.'
    });
  }

  cerrarDetalles() {
    this.pokemonSeleccionado = null;
  }
}
