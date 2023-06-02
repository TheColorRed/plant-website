import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fields } from '@hasura-query-builder/core';
import { exhaustMap, filter, map, startWith } from 'rxjs/operators';
import { GetCompanionPlants, Plant } from 'src/app/models/plants.model';

@Component({
  selector: 'app-plant',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class PlantDetailsComponent {
  tab$ = this.route.queryParams.pipe(map(params => params['tab'] ?? 'details'));

  plant$ = this.route.params.pipe(
    map(params => params['id']),
    exhaustMap(id => Plant.findPlant(id)),
    startWith({ id: -1 } as Fields<Plant>)
  );

  companionPlants$ = this.route.queryParams.pipe(
    filter(params => params['tab'] === 'companion-plants'),
    map(() => Number(this.route.snapshot.params['id'])),
    exhaustMap(id => GetCompanionPlants.plant(id))
  );

  constructor(private readonly route: ActivatedRoute, private readonly router: Router) {}
}
