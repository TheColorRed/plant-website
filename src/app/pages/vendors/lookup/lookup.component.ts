import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ReplaySubject, Subject, exhaustMap, merge, switchMap, tap } from 'rxjs';
import { NearbyVendors, VendorNearbySearch } from 'src/app/models/vendors.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.scss'],
})
export class LookupComponent implements AfterViewInit {
  currentDay = new Date().getDay();
  protected isLoading = false;

  private readonly searchSub = new ReplaySubject<string>(1);
  private readonly locationSub = new Subject<void>();

  searchNearby$ = this.searchSub.pipe(
    switchMap(search =>
      this.locationService.tryGetLocalLocation$().pipe(
        tap(() => (this.isLoading = true)),
        tap(() => this.router.navigate([], { queryParams: { search } })),
        exhaustMap(location => VendorNearbySearch.search(search, location.latitude, location.longitude))
      )
    )
  );
  allNearby$ = this.locationSub.pipe(
    tap(() => console.debug('all nearby')),
    switchMap(() =>
      this.locationService.tryGetLocalLocation$().pipe(
        tap(() => this.router.navigate([], { queryParams: { search: undefined } })),
        tap(() => (this.isLoading = true)),
        exhaustMap(location => NearbyVendors.search(location.latitude, location.longitude))
      )
    )
  );

  searchResults$ = merge(this.allNearby$, this.searchNearby$).pipe(tap(() => (this.isLoading = false)));

  group = new FormGroup({
    search: new FormControl(this.route.snapshot.queryParams['search'] ?? ''),
  });

  constructor(
    private readonly locationService: LocationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.group.value.search.length > 0) {
      this.query(this.group.value.search);
    } else {
      this.emptySearch();
    }
    this.cd.detectChanges();
  }

  query(search: string) {
    this.searchSub.next(search);
  }

  emptySearch() {
    this.locationSub.next();
  }
}
