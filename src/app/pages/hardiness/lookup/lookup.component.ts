import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Fields } from '@hasura-query-builder/core';
import { Subject, exhaustMap, map, merge, tap } from 'rxjs';
import { City } from 'src/app/models/cities.model';
import { LocationService } from 'src/app/services/location.service';
import { states } from '../../../data-maps/states.map';
import { zones } from '../../../data-maps/zones.map';

export type SearchType = 'zip' | 'state' | 'city' | 'zone' | 'city-state';
export interface SearchTypes {
  value: SearchType;
  label: string;
}

@Component({
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class HardinessZoneLookupComponent {
  /** Map of states. */
  protected states = states;
  protected zones = zones;
  protected loading = false;
  private readonly searchSub = new Subject<string>();

  search$ = this.searchSub.pipe(
    tap(() => (this.loading = true)),
    exhaustMap(q => City.query(q))
  );

  private findLocation = new Subject<void>();
  findLocation$ = this.findLocation.pipe(
    tap(() => (this.loading = true)),
    exhaustMap(() => this.locationService.findLocation()),
    exhaustMap(location => City.getClosestCities(location.coords.latitude, location.coords.longitude))
  );

  locationResults$ = merge(this.search$, this.findLocation$).pipe(
    map(zone => {
      if (Array.isArray(zone)) return zone;
      if (Object.keys(zone).length > 0) return [zone];
      return [];
    }),
    tap(() => (this.loading = false))
  );

  group = new FormGroup({
    search: new FormControl(''),
  });

  constructor(private readonly locationService: LocationService) {}

  search(query: string) {
    this.searchSub.next(query);
  }

  setLocation(location: Fields<City>) {
    this.locationService.setLocalLocation(location);
  }
  getLocation() {
    this.findLocation.next();
  }
}
