import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ui-side-nav-item]',
})
export class SideNavItemDirective {
  @HostBinding('class.ui-side-nav-item') sideNavItem = true;
}
