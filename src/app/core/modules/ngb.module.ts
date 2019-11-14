import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

const ngb = [
  NgbDropdownModule,
  NgbCollapseModule,
]

@NgModule({
  declarations: [],
  imports: [ ngb ],
  exports: [ ngb ]
})
export class NgbComponentModule { }
