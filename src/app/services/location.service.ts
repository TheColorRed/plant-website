import { Injectable } from '@angular/core';
import { Fields } from '@hasura-query-builder/core';
import { BehaviorSubject, Observable, filter, from, map, of, startWith, switchMap } from 'rxjs';
import { City } from '../models/cities.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private location = new BehaviorSubject<Fields<City> | null>(null);
  location$ = this.location.pipe(filter(location => !!location));

  constructor() {
    const location = this.getLocalLocation();
    if (location) this.location.next(location);
  }

  findLocation() {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          location => {
            resolve(location);
          },
          error => reject(error)
        );
      })
    );
  }

  setLocalLocation(location: Fields<City>) {
    localStorage.setItem('location', JSON.stringify(location));
    this.location.next(location);
  }

  getLocalLocation(): Fields<City> | null {
    const location = localStorage.getItem('location');
    if (location) return JSON.parse(location);
    return null;
  }

  tryGetLocalLocation$(): Observable<Fields<City>> {
    return of({}).pipe(
      filter(i => Object.keys(i).length > 0),
      startWith(this.getLocalLocation()),
      switchMap(v =>
        v === null ? this.findLocation().pipe(map(i => ({ latitude: i.coords.latitude, longitude: i.coords.longitude }))) : of(v)
      ),
      filter((location): location is Fields<City> => 'latitude' in location && 'longitude' in location),
      map(location => ({
        zip: '',
        zone: '',
        city: '',
        state: '',
        state_short: '',
        latitude: location.latitude,
        longitude: location.longitude,
      }))
    );
  }
}
