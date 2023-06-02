import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Fields } from '@hasura-query-builder/core';
import { concatMap, filter, map, startWith, tap } from 'rxjs';
import { CompanionPlants, GetCompanionPlants, Plant, PlantInfo } from 'src/app/models/plants.model';

export interface PlantCompanion {
  name: string;
  id: number;
}

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
})
export class PlantComponent {
  group = this.fb.nonNullable.group({
    description: [''],
    companions: new FormArray<FormControl>([]),
    plant_id: [0],
  });

  private router$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    startWith(this.router),
    map(() => Number(this.route.snapshot.paramMap.get('id'))),
    tap(id => this.group.controls.plant_id.setValue(id))
  );

  plant$ = this.router$.pipe(
    concatMap(id => Plant.findPlant(id)),
    tap(plant => this.group.controls.description.setValue(plant.plant_info?.description))
  );

  companionPlants$ = this.router$.pipe(
    concatMap(id => GetCompanionPlants.plant(id)),
    tap(plants => this.setPlants(plants))
  );

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly fb: FormBuilder) {}

  addCompanionPlant() {
    this.setPlants([...this.group.controls.companions.value, { name: 'asdfs', id: 1 }]);
    this.group.markAsDirty();
  }

  save() {
    const { description, companions, plant_id } = this.group.controls;

    PlantInfo.save(plant_id.value, description.value).subscribe();
    CompanionPlants.save(plant_id.value, companions.value).subscribe();
  }

  private setPlants(plants: (Fields<GetCompanionPlants> | PlantCompanion)[] | PlantCompanion) {
    let companions: FormArray<FormControl>;
    if (this.isModel(plants)) {
      companions = new FormArray(plants.map(p => new FormControl({ name: p.plant.common_name, id: p.plant.id })));
    } else if ('plant' in plants) {
      companions = new FormArray([...this.group.controls.companions.value, new FormControl(plants)]);
    } else {
      companions = new FormArray((plants as PlantCompanion[]).map(p => new FormControl(p)));
    }
    this.group.setControl('companions', companions);
  }

  private isModel(obj: any): obj is Fields<GetCompanionPlants>[] {
    return Array.isArray(obj) && obj.every(i => 'plant' in i);
  }
}
