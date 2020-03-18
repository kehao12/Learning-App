import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { BsDatepickerModule, BsModalRef, ModalModule, TabsModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FileUploadModule } from 'ng2-file-upload';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CKEditorModule } from 'ngx-ckeditor';





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
    TabsModule  ,
    ModalModule.forRoot(),
    CKEditorModule
  ],
  declarations: [CourseListComponent, CourseAddComponent, CourseEditComponent, CourseDetailComponent],
  entryComponents: [
    CourseAddComponent
  ]
})
export class CourseModule { }
