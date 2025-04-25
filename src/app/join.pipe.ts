import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'join', standalone: true })
export class JoinPipe implements PipeTransform {
  transform(value: string[], separator: string = ', '): string {
    return Array.isArray(value) ? value.join(separator) : value;
  }
}

