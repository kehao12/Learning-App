import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { AdminSidebarComponent } from './admin-layout/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './admin-layout/admin-header/admin-header.component';
import { MembersComponent } from './admin-layout/members/members.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [AdminLayoutComponent, AdminSidebarComponent, AdminHeaderComponent, MembersComponent],
  exports: [AdminLayoutComponent, AdminSidebarComponent, AdminHeaderComponent, MembersComponent],
})
export class AdminModule { }
