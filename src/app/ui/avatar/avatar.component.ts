import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() url?: string;
  @Input() name?: string;
  @Input({ required: true }) size: string = '48px';
  @Input() shape?: 'circle' | 'square' | 'rounded' = 'circle';

  @HostBinding('class')
  get classes() {
    return {
      circle: this.shape === 'circle',
      rounded: this.shape === 'rounded',
    };
  }
}
