import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ComponentRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { TOOLTIP_DATA } from './tokens';
import { TooltipComponent } from './tooltip.component';

@Directive({
  selector: '[tooltip]',
  providers: [Overlay],
})
export class TooltipDirective implements OnDestroy, OnChanges {
  @Input() tooltip: string = '';
  @Input() position: 'above' | 'below' | 'left' | 'right' = 'below';

  delay = 500;
  private overlayRef?: OverlayRef;
  private portal?: ComponentRef<TooltipComponent>;
  private opening = false;

  private readonly tooltipStateSubject = new Subject<'open' | 'close'>();
  private readonly tooltipStateHandler = this.tooltipStateSubject
    .pipe(
      tap(state => state === 'close' && this.overlayRef?.detach()),
      switchMap(() =>
        timer(this.delay).pipe(
          filter(() => this.opening),
          filter(() => !this.overlayRef?.hasAttached()),
          tap(() => {
            this.opening = false;
            this.overlayRef = this.overlay.create({
              positionStrategy: this.overlay
                .position()
                .flexibleConnectedTo(this.elementRef)
                .withPositions([
                  ...(this.position === 'below' ? this.below() : []),
                  ...(this.position === 'above' ? this.above() : []),
                  ...(this.position === 'left' ? this.left() : []),
                  ...(this.position === 'right' ? this.right() : []),
                ]),
            });
            const tooltip = new ComponentPortal(
              TooltipComponent,
              null,
              Injector.create({ providers: [{ provide: TOOLTIP_DATA, useValue: this.tooltip }] })
            );
            this.portal = this.overlayRef.attach(tooltip);
          })
        )
      )
    )
    .subscribe();

  @HostBinding('attr.tabindex') tabindex = 0;

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('focus', ['$event'])
  @HostListener('blur', ['$event'])
  toggle(event: MouseEvent) {
    this.opening = event.type === 'mouseenter' || event.type === 'focus';
    this.tooltipStateSubject.next(event.type === 'mouseenter' || event.type === 'focus' ? 'open' : 'close');
  }

  @HostListener('keydown.escape')
  close() {
    this.tooltipStateSubject.next('close');
  }

  constructor(private readonly overlay: Overlay, private readonly elementRef: ElementRef<HTMLElement>) {}

  ngOnDestroy() {
    this.tooltipStateHandler.unsubscribe();
  }

  ngOnChanges(change: SimpleChanges) {
    if ('tooltip' in change) {
      if (this.portal?.instance) {
        this.portal.instance.data = this.tooltip;
      }
    }
  }

  private below(): ConnectedPosition[] {
    return [
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
    ];
  }
  private above(): ConnectedPosition[] {
    return [
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' },
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' },
    ];
  }
  private left(): ConnectedPosition[] {
    return [
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
    ];
  }
  private right(): ConnectedPosition[] {
    return [
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' },
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' },
    ];
  }
}
