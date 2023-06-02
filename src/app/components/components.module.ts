import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule } from '../ui/ui.module';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [TopNavComponent],
  exports: [TopNavComponent],
  imports: [CommonModule, UiModule, RouterModule],
})
export class ComponentsModule {}
