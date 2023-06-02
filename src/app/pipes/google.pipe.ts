import { Pipe, PipeTransform } from '@angular/core';
import { GoogleService } from '../services/google.service';

@Pipe({
  name: 'google',
  standalone: true,
})
export class GooglePipe implements PipeTransform {
  constructor(private readonly google: GoogleService) {}

  transform(value: string, type: 'directions' | 'location') {
    if (type === 'directions') {
      return this.google.directions('my location', value);
    } else if (type === 'location') {
      return this.google.location(value);
    }
    return '';
  }
}
