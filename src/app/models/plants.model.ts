import { Fields, Model } from '@hasura-query-builder/core';

export class Plant extends Model {
  override table = 'plants';
  override primary = 'id';
  override connection = 'public';

  override fields = {
    id: Number(),
    symbol: String(),
    synonym_symbol: String(),
    scientific_name: String(),
    common_name: String(),
    family: String(),
    plant_info: PlantInfo as unknown as Fields<PlantInfo>,
  };

  static findPlant(id: number) {
    return this.find(Number(id)).first();
  }
}

export class GetCompanionPlants extends Model {
  override table = 'get_companions';
  override connection = 'public';
  override fields = {
    id: Number(),
    plant: Plant as unknown as Fields<Plant>,
  };

  static plant(id: number) {
    return this.call({ id }).get();
  }

  static save(plant_id: number, companions: Fields<GetCompanionPlants>[]) {
    const ids = companions.map(c => ({ id: c.id }));
    return this.call({ id: plant_id, ids }).save();
  }
}

export class CompanionPlants extends Model {
  override table = 'companions';
  override connection = 'public';
  override fields = {
    plant_a: Number(),
    plant_b: Number(),
  };

  static save(plant_id: number, companions: Fields<GetCompanionPlants>[]) {
    const ids = companions.map(c => ({ id: c.id }));
    return this.insert(ids.map(id => ({ plant_a: plant_id, plant_b: id.id }))).save();
  }
}

export class PlantSearch extends Model {
  override table = 'find_plants';
  override fields = {
    ...new Plant().fields,
  };

  static search(query: string) {
    return this.call({ query });
  }
}

export class PlantInfo extends Model {
  override table = 'plant_info';
  override primary = 'plant_id';
  override connection = 'public';
  override fields = {
    description: String(),
    plant_id: Number(),
    // plant: Plant as unknown as Fields<Plant>,
  };

  static getPlant(id: number) {
    return this.find(Number(id)).first();
  }

  static save(plant_id: number, description: string) {
    return this.update({ description }).where('plant_id', plant_id).save();
  }
}

export class GetPlants extends Model {
  override table = 'get_plants';
  override connection = 'public';
  override fields = {
    ...new Plant().fields,
  };

  static plants(ids: number[]) {
    return this.call({ ids }).get();
  }
}
