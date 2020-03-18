import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changed.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { CourseCategoryListResolver } from './_resolvers/courseCategory-list.resolver';
import { CourseListResolver } from './_resolvers/course-list.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      }, {
        path: 'test',
        loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule)
      }, {
        path: 'basic',
        loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module')
        .then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'user',
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule
        ),
        resolve: {user: MemberEditResolver}
      }, {
        path: 'course',
        data: {roles: ['Admin', 'Moderator']},
        loadChildren: () => import('./pages/course/course.module').then(m => m.CourseModule
        ),
        resolve: {Courses: CourseListResolver, listCourseCate: CourseCategoryListResolver}
      }, {
        path: 'course-category',
        loadChildren: () => import('./pages/course-category/course-category.module').then(m => m.CourseCategoryModule
        )
      }, {
        path: 'member',
        resolve: {users: MemberListResolver},
        loadChildren: () => import('./pages/member/member.module').then(m => m.MemberModule)
      },  {
        path: 'lesson',
        resolve: {users: MemberListResolver},
        loadChildren: () => import('./pages/lesson/lesson.module').then(m => m.LessonModule)
      }, {
        path: 'simple-page',
        loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
