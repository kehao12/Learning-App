import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberAddComponent } from './member-add/member-add.component';
import { BsDatepickerModule, TabsModule } from 'ngx-bootstrap';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { TimeAgoPipe } from 'time-ago-pipe';






@NgModule({
  imports: [
    CommonModule,
    MemberRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    PaginationModule.forRoot(),
    NgxGalleryModule,
    TabsModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [MemberListComponent, MemberAddComponent, MemberEditComponent, TimeAgoPipe]
})
export class MemberModule { }
