import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hours', standalone: true })
export class HoursPipe implements PipeTransform {
  transform(value: [string, string], ...args: any[]): any {
    return `${value[0]} - ${value[1]}`;
  }
}
