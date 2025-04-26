// Importación de módulos necesarios
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-pokemon-list',//nombre componete que se usara en la pantalla 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['../../app.component.css'],
  animations: [
    // Animación para que los elementos de la lista
    trigger('fadeInList', [
      transition('* => *', [ // Se activa en cada cambio de la lista
        query('li', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(100, [// Retrasa la aparición de cada elemento
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class PokemonListComponent {
  @Input() pokemones: any[] = [];// Recibe lista de pokémon desde la raiz
  @Output() verDetalles = new EventEmitter<any>();//hace el evento

  seleccionarPokemon(pokemon: any) {
  // Llama al componente padre con el pokémon seleccionado
    this.verDetalles.emit(pokemon);
  }
}

