import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LogPipe } from 'src/app/pipes/log.pipe';
import { SlugPipe } from 'src/app/pipes/slug.pipe';
import { UiModule } from 'src/app/ui/ui.module';
import { PlantComponent } from './plant/plant.component';
import { VendorComponent } from './vendor/vendor.component';

@NgModule({
  declarations: [PlantComponent, VendorComponent],
  imports: [
    CommonModule,
    LogPipe,
    SlugPipe,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    TextFieldModule,
    RouterModule.forChild([
      { path: 'plant/:id', component: PlantComponent },
      { path: 'vendor/:id', component: VendorComponent },
    ]),
  ],
})
export class AdminModule {}
