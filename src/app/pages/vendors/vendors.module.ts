import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactPipe } from 'src/app/pages/vendors/pipes/contact.pipe';
import { SortHoursPipe } from 'src/app/pages/vendors/pipes/sort-hours.pipe';
import { GooglePipe } from 'src/app/pipes/google.pipe';
import { UiModule } from 'src/app/ui/ui.module';
import { LookupComponent } from './lookup/lookup.component';
import { HoursPipe } from './pipes/hours.pipe';

@NgModule({
  declarations: [LookupComponent],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    ContactPipe,
    GooglePipe,
    SortHoursPipe,
    HoursPipe,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'lookup' },
      { path: 'lookup', component: LookupComponent },
    ]),
  ],
})
export class VendorsModule {}
