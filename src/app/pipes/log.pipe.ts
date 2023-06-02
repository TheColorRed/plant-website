import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'log',
  standalone: true,
})
export class LogPipe implements PipeTransform {
  transform<T>(value: T): '' {
    if (environment.production) return '';
    console.debug(value);
    return '';
  }
}
