import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogPipe } from 'src/app/pipes/log.pipe';
import { UiModule } from 'src/app/ui/ui.module';
import { HardinessZoneLookupComponent } from './lookup/lookup.component';

@NgModule({
  declarations: [HardinessZoneLookupComponent],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    LogPipe,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'lookup' },
      { path: 'lookup', component: HardinessZoneLookupComponent },
    ]),
  ],
})
export class HardinessModule {}
