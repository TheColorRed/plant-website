import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[toggle-handle]',
  exportAs: 'toggle',
})
export class ToggleDirective {
  /** Whether or not the toggle is open. */
  state = false;
  @HostBinding('class.toggled')
  get toggled() {
    return this.state;
  }
  /**
   * Opens or closes the toggle.
   */
  toggle() {
    this.state = !this.state;
  }
  /**
   * Opens the toggle.
   */
  open() {
    this.state = true;
  }
  /**
   * Closes the toggle.
   */
  close() {
    this.state = false;
  }
}
