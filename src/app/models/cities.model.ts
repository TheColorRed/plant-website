import { Model } from '@hasura-query-builder/core';

export class City extends Model {
  override table = 'cities';
  override primary = 'zip';
  override connection = 'public';
  override fields = {
    zip: String(),
    zone: String(),
    city: String(),
    state: String(),
    state_short: String(),
    latitude: Number(),
    longitude: Number(),
  };

  static query(query: string) {
    return this.call({ query }).clone('find_cities').get();
  }

  static getClosestCities(latitude: number, longitude: number) {
    return this.call({ latitude, longitude }).clone('closest_cities').get();
  }
}

export class HardinessZoneLookup extends City {
  override fields = {
    ...new City().fields,
    distance: Number(),
  };

  static getClosetZoneByLatLong(latitude: number, longitude: number) {
    return this.all()
      .where({ latitude: { _eq: latitude }, longitude: { _eq: longitude } })
      .first();
  }
}
