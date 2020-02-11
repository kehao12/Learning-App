import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from '../client/client-layout/client-layout.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../admin/admin-layout/admin-layout.component';
import { MembersComponent } from '../admin/admin-layout/members/members.component';
import { HomeComponent } from '../client/client-layout/home/home.component';


const appRoutes: Routes = [
  {path: '' , component: ClientLayoutComponent, children: [
    {path: '', component: HomeComponent}
  ]},
  {path: 'admin', component: AdminLayoutComponent, children: [
    {path: '', component: MembersComponent},
    {path: 'quanlynguoidung', component: MembersComponent}
  ]}
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
