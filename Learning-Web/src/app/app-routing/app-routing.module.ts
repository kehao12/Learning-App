import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../admin/admin-layout/admin-layout.component';
import { HomelayoutComponent } from '../home/homelayout/homelayout.component';
import { IndexComponent } from '../home/homelayout/index/index.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../_guards/auth.guard';
import { MemberEditResolver } from '../_resolvers/member-edit.resolver';
import { MemberEditComponent } from '../admin/admin-layout/members/member-edit/member-edit.component';
import { MemberListsComponent } from '../admin/admin-layout/members/member-lists/member-lists.component';
import { PreventUnsavedChanges } from '../_guards/prevent-unsave-changed.guard';
import { MemberDetailComponent } from '../admin/admin-layout/members/member-detail/member-detail.component';
import { MemberListResolver } from '../_resolvers/member-list.resolver';


const appRoutes: Routes = [
  {path: '' , component: HomelayoutComponent, children: [
    {path: '', component: IndexComponent}
  ]},
  {
    path: 'login', component: LoginComponent
  },
  {path: 'admin', component: AdminLayoutComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
    {path: '', component: MemberListsComponent},
    { path: 'edit', component: MemberEditComponent,
    resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges] },
    {path: 'quanlynguoidung', component: MemberListsComponent,
    resolve: {users: MemberListResolver} }
  ]}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
