import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',// Nombre del pipe para ser utilizado en las plantillas
  standalone: true
})
//Transforma un array de strings en una sola cadena
export class JoinPipe implements PipeTransform {
  transform(value: string[], separator: string = ', '): string {
    return value.join(separator);// Une los elementos del array usando el delimitador
  }
}

