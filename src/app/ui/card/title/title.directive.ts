import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ui-card-title]',
})
export class TitleDirective {
  @HostBinding('class.ui-card-title') class = true;
  @HostBinding('style.margin-top') display = 0;
}
