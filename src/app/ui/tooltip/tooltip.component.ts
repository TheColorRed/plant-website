import { Component, Inject } from '@angular/core';
import { TOOLTIP_DATA } from './tokens';

@Component({
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  constructor(@Inject(TOOLTIP_DATA) public data: string) {}
}
