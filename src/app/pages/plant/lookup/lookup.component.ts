import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fields, Page, Paginator } from '@hasura-query-builder/core';
import { BehaviorSubject, EMPTY, Observable, filter, tap } from 'rxjs';
import { Plant, PlantSearch } from 'src/app/models/plants.model';
import { PaginatorService } from 'src/app/ui/paginator/paginator.service';

@Component({
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
  providers: [PaginatorService],
})
export class LookupComponent implements AfterViewInit {
  paginator!: Paginator<Fields<Plant>>;
  page$: Observable<Page<Fields<Plant>>> = EMPTY;

  protected isLoading = false;
  private readonly searchSub = new BehaviorSubject<{ query: string; page: number }>({ query: '', page: 1 });

  readonly search$ = this.searchSub.pipe(
    filter(sub => sub.query.length > 0),
    tap(() => (this.isLoading = true)),
    tap(sub => (this.paginator = PlantSearch.search(sub.query).options({ cache: false }).paginate())),
    tap(() => (this.page$ = this.paginator.page$)),
    tap(sub => this.router.navigate(['/plants', 'lookup'], { queryParams: { ...sub } })),
    tap(sub => (sub.page === 1 ? this.paginator.first() : this.paginator.page(sub.page))),
    tap(() => (this.isLoading = false))
  );

  group = new FormGroup({
    plant: new FormControl(this.activatedRoute.snapshot.queryParams['query'] ?? ''),
  });

  constructor(private readonly router: Router, private readonly activatedRoute: ActivatedRoute, private readonly cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.search(this.activatedRoute.snapshot.queryParams['query'] ?? '', Number(this.activatedRoute.snapshot.queryParams['page'] ?? 1));
    this.cd.detectChanges();
  }

  search(query: string, page: number = 1) {
    this.searchSub.next({ query, page });
  }
}
