import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberDetailResolver } from '../../../app/_resolvers/member-detail.resolver';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentListResolver } from '../../../app/_resolvers/student-list.resolver';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      breadcrumb: 'Danh sách thành viên',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'student',
    component: StudentComponent,
    resolve: {students: StudentListResolver},
    data: {
      breadcrumb: 'Danh sách thành viên',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    data: {
      breadcrumb: 'Danh sách thành viên',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
      path: 'edit/:id',
      component: MemberEditComponent,
      resolve: {user: MemberDetailResolver},
      data: {
        breadcrumb: 'Danh sách thành viên',
        icon: 'icofont-justify-all bg-c-green',
        status: false
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
