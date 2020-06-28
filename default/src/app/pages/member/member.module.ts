import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberRoutingModule } from './member-routing.module';
import { MemberAddComponent } from './member-add/member-add.component';
import { TabsModule } from 'ngx-bootstrap';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { StudentModalComponent } from './student-modal/student-modal.component';
import { DataTablesModule } from 'angular-datatables';
import { AdminComponent } from './admin/admin.component';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
import { TeacherModalComponent } from './teacher-modal/teacher-modal.component';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TeacherEditComponent } from './teacher-edit/teacher-edit.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';





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
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    DataTableModule,
    Ng2SearchPipeModule
  ],
  exports: [
      BsDatepickerModule,
  ],
  declarations: [MemberListComponent,
    MemberAddComponent,
    MemberEditComponent,
    StudentModalComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    AdminModalComponent,
    TeacherModalComponent,
  RolesModalComponent,
  ProfileStudentComponent,
StudentEditComponent,
TeacherEditComponent,
AdminEditComponent]
  ,  entryComponents: [
    RolesModalComponent,
    ProfileStudentComponent
  ]
})
export class MemberModule { }
