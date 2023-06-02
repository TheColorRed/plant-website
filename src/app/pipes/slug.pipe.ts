import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug',
  standalone: true,
})
export class SlugPipe implements PipeTransform {
  transform(value: string, separator: string = '-'): unknown {
    return value.toLowerCase().replace(/\s/g, separator);
  }
}
