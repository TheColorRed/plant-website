import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: '[ui-button], [ui-button-icon], [ui-transparent-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input('ui-button-icon') buttonIcon?: string;
  @Input('ui-transparent-button') transButton?: string;
  @Input() size?: 'sm' | 'md' | 'lg' = 'md';

  @HostBinding('class') get classes() {
    return {
      'button-icon': this.buttonIcon !== undefined,
      'transparent-button': this.transButton !== undefined,
      [`button-size-${this.size}`]: this.size !== undefined,
    };
  }
}
