import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule
  ],
  declarations: [CourseListComponent, CourseAddComponent, CourseEditComponent]
})
export class CourseModule { }
