import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'a[ui-link]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @HostBinding('class') class = 'ui-link';
}
