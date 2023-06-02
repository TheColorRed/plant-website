import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { faLeftToLine } from '@fortawesome/pro-duotone-svg-icons/faLeftToLine';
import { faRightToLine } from '@fortawesome/pro-duotone-svg-icons/faRightToLine';
import { faPlus } from '@fortawesome/sharp-solid-svg-icons';
import { faClock } from '@fortawesome/sharp-solid-svg-icons/faClock';
import { faCrosshairs } from '@fortawesome/sharp-solid-svg-icons/faCrosshairs';
import { faGlobe } from '@fortawesome/sharp-solid-svg-icons/faGlobe';
import { faLocationDot } from '@fortawesome/sharp-solid-svg-icons/faLocationDot';
import { faMagnifyingGlass } from '@fortawesome/sharp-solid-svg-icons/faMagnifyingGlass';
import { faMap } from '@fortawesome/sharp-solid-svg-icons/faMap';
import { faPhone } from '@fortawesome/sharp-solid-svg-icons/faPhone';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class FAModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faRightToLine,
      faLeftToLine,
      faCrosshairs,
      faCaretDown,
      faLocationDot,
      faCaretUp,
      faClock,
      faGlobe,
      faMap,
      faPlus,
      faPhone,
      faMagnifyingGlass
    );
  }
}
