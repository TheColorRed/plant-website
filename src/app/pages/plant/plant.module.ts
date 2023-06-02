import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { LogPipe } from 'src/app/pipes/log.pipe';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { UiModule } from 'src/app/ui/ui.module';
import { PlantDetailsComponent } from './details/details.component';
import { LookupComponent } from './lookup/lookup.component';
@NgModule({
  declarations: [LookupComponent, PlantDetailsComponent],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    SlugPipe,
    LogPipe,
    MarkdownModule.forRoot(),
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'lookup' },
      { path: 'lookup', component: LookupComponent },
      { path: 'details/:id/:name', component: PlantDetailsComponent },
    ]),
  ],
})
export class PlantModule {}
