import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { debounceTime, filter, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'ui-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SearchComponent,
      multi: true,
    },
  ],
})
export class SearchComponent implements ControlValueAccessor {
  @Input() placeholder = 'Search...';
  @Output() empty = new EventEmitter<void>();
  protected value = '';
  onChange = (_: string) => {};
  onTouch = () => {};

  private readonly search = new ReplaySubject<string>(1);
  search$ = this.search.pipe(
    startWith(null),
    debounceTime(500),
    tap(i => i !== null && i.length === 0 && this.empty.emit()),
    filter((i): i is string => typeof i === 'string' && i.length > 0),
    tap(i => this.writeValue(i))
  );

  writeValue(obj: string): void {
    this.value = obj;
    this.onChange(obj);
    this.onTouch();
  }
  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  input(event: Event) {
    event = event as InputEvent;
    this.search.next((event.target as HTMLInputElement).value);
  }
}
