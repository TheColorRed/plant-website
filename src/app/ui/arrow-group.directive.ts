import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { ContentChildren, Directive, ElementRef, HostListener, Input, QueryList } from '@angular/core';

@Directive({ selector: '[arrow-item]' })
export class ArrowItemDirective implements Highlightable {
  constructor(private readonly host: ElementRef, private readonly parent: ArrowGroupDirective) {}
  /**
   * When the item is focused, notify the parent arrow group.
   * This is used for detecting when the group receives focus.
   */
  @HostListener('focus')
  onFocus() {
    this.parent.setFocus(this);
  }
  /**
   * This is triggered by the parent arrow group's key manager.
   */
  setActiveStyles() {
    this.host.nativeElement.focus();
  }
  /** This is triggered by the parent arrow group's key manager. */
  setInactiveStyles() {}
}

@Directive({ selector: '[arrow-group]' })
export class ArrowGroupDirective {
  /**
   * The orientation of the arrow group.
   *
   * * `horizontal` = left/right arrow keys.
   * * `vertical` = up/down arrow keys.
   * * `both` = all arrow keys.
   */
  @Input() orientation: 'horizontal' | 'vertical' | 'both' = 'vertical';
  /** The direction of the arrow group when the orientation is horizontal. */
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  /** The list of items in the arrow group. */
  @ContentChildren(ArrowItemDirective, { descendants: true }) listItems!: QueryList<ArrowItemDirective>;
  /** The key manager for the arrow group. */
  keyManager!: ActiveDescendantKeyManager<ArrowItemDirective>;

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    // Initialize the key manager with the items.
    this.keyManager = new ActiveDescendantKeyManager(this.listItems);
    this.keyManager.withWrap();

    // Set the orientation of the key manager.
    this.keyManager.withVerticalOrientation(this.orientation === 'vertical' || this.orientation === 'both');
    if (this.orientation === 'horizontal' || this.orientation === 'both') {
      this.keyManager.withHorizontalOrientation(this.direction);
    }
  }
  /**
   * Handles the keyboard events for the arrow group.
   * @param event The keyboard event.
   */
  @HostListener('keydown', ['$event'])
  handleKeyup(event: KeyboardEvent) {
    if (!this.keyManager) return;
    if (event.key === 'Tab') {
      this.focusNextElement(event);
    }
    this.keyManager.onKeydown(event);
  }
  /**
   * Sets the active item to the item passed in.
   * @param item The item to set as active.
   */
  setFocus(item: ArrowItemDirective) {
    this.keyManager.setActiveItem(item);
  }
  /**
   * Focuses on the next item outside of the trap. If shift is held, it will focus on the previous item.
   * @param event The keyboard event.
   */
  private focusNextElement(event: KeyboardEvent) {
    let focusableElements =
      'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';

    if (!document.activeElement) return;

    const allFocusable = Array.from<HTMLElement>(document.querySelectorAll(focusableElements));
    const trapItems = Array.from<HTMLElement>(this.host.nativeElement.querySelectorAll(focusableElements));
    const firstTrapItem = trapItems[0];
    const lastTrapItem = trapItems[trapItems.length - 1];

    if (event.shiftKey) {
      const idx = allFocusable.findIndex(item => item === firstTrapItem);
      if (idx === -1) return;
      allFocusable[idx]?.focus();
    } else {
      const idx = allFocusable.findIndex(item => item === lastTrapItem);
      if (idx === -1) return;
      allFocusable[idx]?.focus();
    }
  }
}
