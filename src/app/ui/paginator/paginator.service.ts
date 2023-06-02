import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Fields, Model, Paginator } from '@hasura-query-builder/core';
import { filter, map, share, tap } from 'rxjs';

@Injectable()
export class PaginatorService<T extends Model = Model> {
  paginator!: Paginator<Fields<T>>;

  route$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.route.snapshot.queryParams),
    tap(params => params['type'] === 'first' && this.paginator.first()),
    tap(params => params['type'] === 'last' && this.paginator.last()),
    tap(params => params['type'] === 'next' && this.paginator.next()),
    tap(params => params['type'] === 'prev' && this.paginator.previous()),
    share()
  );

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}
}
