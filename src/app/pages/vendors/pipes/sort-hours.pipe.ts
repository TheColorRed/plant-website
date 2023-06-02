import { Pipe, PipeTransform } from '@angular/core';

export type Days = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

@Pipe({
  name: 'sortHours',
  standalone: true,
})
export class SortHoursPipe implements PipeTransform {
  transform(value: any[], ...args: any[]): any[] {
    const days: Days[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return value.sort((a: any, b: any) => days.indexOf(a.key) - days.indexOf(b.key));
  }
}
