import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberListComponent } from './member-list/member-list.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberDetailResolver } from '../../../app/_resolvers/member-detail.resolver';


const routes: Routes = [
  {
    path: '',
    component: MemberListComponent,
    data: {
      breadcrumb: 'Danh sách thành viên',
      icon: 'icofont-justify-all bg-c-green',
      status: true
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
