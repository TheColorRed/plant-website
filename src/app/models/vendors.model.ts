import { Json, Model } from '@hasura-query-builder/core';
import { City } from './cities.model';

export class Vendors extends Model {
  override table = 'vendors';
  override primary = 'id';
  override connection = 'public';
  override fields = {
    vendor_id: Number(),
    name: String(),
    address: String(),
    website: String(),
    phone: String(),
    zip: String(),
    avatar: String(),
    hours: Json({
      monday: Json([String(), String()]),
      tuesday: Json([String(), String()]),
      wednesday: Json([String(), String()]),
      thursday: Json([String(), String()]),
      friday: Json([String(), String()]),
      saturday: Json([String(), String()]),
      sunday: Json([String(), String()]),
    }),
    description: String(),
    private: Boolean(),
    city: City,
  };

  static search(search: string) {
    return this.all()
      .where({ name: { _eq: search } })
      .get();
  }

  static getVendor(id: number) {
    return this.all()
      .where({ id: { _eq: id } })
      .get();
  }
}

export class VendorSearch extends Model {
  override table = 'find_vendors';
  override fields = {
    ...new Vendors().fields,
  };

  static search(query: string) {
    return this.call({ query }).get();
  }
}

export class VendorNearbySearch extends Model {
  override table = 'find_vendors_nearby';
  override fields = {
    ...new Vendors().fields,
  };

  static search(query: string, latitude: number, longitude: number) {
    return this.call({ query, latitude, longitude }).get();
  }
}

export class NearbyVendors extends Model {
  override table = 'nearby_vendors';
  override fields = {
    ...new Vendors().fields,
  };

  static search(latitude: number, longitude: number) {
    return this.call({ latitude, longitude }).get();
  }
}
