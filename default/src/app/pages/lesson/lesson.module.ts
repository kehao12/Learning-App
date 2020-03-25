import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { DataTablesModule } from 'angular-datatables';

import { ButtonsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { LessonRoutingModule } from './lesson.routing.module';
import { LessonListComponent } from './lesson-list/lesson-list.component';


@NgModule({
  imports: [
    CommonModule,
    LessonRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BsDatepickerModule.forRoot()
  ],
  declarations: [LessonListComponent]
})
export class LessonModule { }
