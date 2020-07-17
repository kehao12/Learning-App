import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { BsDatepickerModule, BsModalRef, ModalModule, TabsModule, CollapseModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { FileUploadModule } from 'ng2-file-upload';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { LessonAddComponent } from './lesson-add/lesson-add.component';
import { FileComponent } from './file/file.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { ChartsModule } from 'ng2-charts';
import { AddUserModalComponent } from './AddUserModal/AddUserModal.component';
import { ModalPreviewComponent } from './modal-preview/modal-preview.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SafePipe } from '../../../app/pipe/SafePipe.pipe';





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
    CKEditorModule,
    CollapseModule.forRoot(),
    ChartsModule,
    NgxDocViewerModule,
    NgSelectModule,
    DataTableModule,
    Ng2SearchPipeModule,
  ],
  declarations: [CourseListComponent, CourseAddComponent, CourseEditComponent,
    CourseDetailComponent, LessonAddComponent, FileComponent, MyCourseComponent,
  AddUserModalComponent, ModalPreviewComponent, SafePipe ],
  entryComponents: [
    CourseAddComponent
  ]
})
export class CourseModule { }
