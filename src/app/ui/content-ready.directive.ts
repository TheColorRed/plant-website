import { Directive, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, forkJoin, tap } from 'rxjs';

@Directive({
  selector: '[content-ready]',
  exportAs: 'contentReady',
})
export class ContentReadyDirective implements OnDestroy {
  isReady = false;

  sub?: Subscription;
  @Input('content-ready')
  set watch(observables: Observable<any>[]) {
    this.sub = forkJoin(observables)
      .pipe(
        tap(() => console.debug('content ready')),
        tap(() => (this.isReady = true))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
