import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinPipe } from '../../join.pipe';// Pipe personalizado para unir textos

@Component({
  selector: 'app-pokemon-detail',// nombre del elemento que se usa en la vista 
  standalone: true,
  imports: [CommonModule, JoinPipe],// Se importa CommonModule y el pipe para usar en el HTML
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['../../app.component.css']
})
export class PokemonDetailComponent {
  @Input() pokemon: any;// Recibe el pokémon seleccionado desde el componente padre
  @Output() cerrar = new EventEmitter<void>();

  cerrarDetalle() {
    // Llama al padre para cerrar el detalle
    this.cerrar.emit();
  }
}
