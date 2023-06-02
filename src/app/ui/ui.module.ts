import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogPipe } from '../pipes/log.pipe';
import { NumberToArrayPipe } from '../pipes/number-to-array.pipe';
import { ArrowGroupDirective, ArrowItemDirective } from './arrow-group.directive';
import { AvatarComponent } from './avatar/avatar.component';
import { ButtonComponent } from './button/button.component';
import { CardComponent } from './card/card.component';
import { ContentComponent } from './card/content/content.component';
import { TitleDirective } from './card/title/title.directive';
import { ContentReadyDirective } from './content-ready.directive';
import { InputComponent } from './input/input.component';
import { LinkComponent } from './link/link.component';
import { LoadingComponent } from './loading/loading.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SearchComponent } from './search/search.component';
import { SideNavItemDirective } from './side-nav/side-nav-item.directive';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ToggleDirective } from './toggle.directive';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [
    ButtonComponent,
    LinkComponent,
    InputComponent,
    SearchComponent,
    CardComponent,
    TitleDirective,
    ContentComponent,
    AvatarComponent,
    ToggleDirective,
    TooltipComponent,
    TooltipDirective,
    LoadingComponent,
    ContentReadyDirective,
    PaginatorComponent,
    SideNavComponent,
    SideNavItemDirective,
    ArrowGroupDirective,
    ArrowItemDirective,
  ],
  exports: [
    FontAwesomeModule,
    ButtonComponent,
    LinkComponent,
    InputComponent,
    SearchComponent,
    CardComponent,
    TitleDirective,
    ContentComponent,
    AvatarComponent,
    ToggleDirective,
    TooltipDirective,
    LoadingComponent,
    ContentReadyDirective,
    PaginatorComponent,
    SideNavComponent,
    SideNavItemDirective,
    ArrowGroupDirective,
    ArrowItemDirective,
  ],
  imports: [CommonModule, FontAwesomeModule, OverlayModule, NumberToArrayPipe, RouterModule, LogPipe],
})
export class UiModule {}
