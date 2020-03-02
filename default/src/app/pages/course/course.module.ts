import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FileUploadModule } from 'ng2-file-upload';





@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    FileUploadModule,
    ReactiveFormsModule,
  ],
  declarations: [CourseListComponent, CourseAddComponent, CourseEditComponent]
})
export class CourseModule { }
