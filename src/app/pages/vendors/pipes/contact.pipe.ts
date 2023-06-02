import { Pipe, PipeTransform } from '@angular/core';
import { Fields } from '@hasura-query-builder/core';
import { City } from '../../../models/cities.model';
import { Vendors } from '../../../models/vendors.model';

export type ContactType = 'phone' | 'address' | 'hours-today' | 'website';
const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

@Pipe({
  name: 'contact',
  standalone: true,
})
export class ContactPipe implements PipeTransform {
  transform(value: Fields<Vendors>, type: ContactType) {
    if (type === 'address') {
      // @ts-ignore
      const city: Fields<City> = value.city;
      return `${value.address}, ${this.titleCase(city.city)}, ${city.state} ${city.zip}`;
    } else if (type === 'phone') {
      return value.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3');
    } else if (type === 'website') {
      return value.website;
    } else if (type === 'hours-today') {
      const today = new Date().getDay();
      const day = days[today];
      // @ts-ignores
      const [open, close] = value.hours[day];
      return `${open} - ${close}`;
    }
    return '&mdash;';
  }

  titleCase(str: string) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  }
}
