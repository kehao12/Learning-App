import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicRegComponent } from './basic-reg.component';
import {BasicRegRoutingModule} from './basic-reg-routing.module';
import {SharedModule} from '../../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    BasicRegRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [BasicRegComponent]
})
export class BasicRegModule { }
