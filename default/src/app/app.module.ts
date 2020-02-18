import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layout/admin/title/title.component';
import { AuthComponent } from './layout/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AlertifyService } from './_services/alertify.service';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { HttpClientModule } from '@angular/common/http';
import { PreventUnsavedChanges } from './_guards/prevent-unsave-changed.guard';
import { CourseCategoryListResolver } from './_resolvers/courseCategory-list.resolver';
import { DataTablesModule } from 'angular-datatables';
import { CourseCategoryDetailResolver } from './_resolvers/courseCategory-detail.resolver';
import { CourseListResolver } from './_resolvers/course-list.resolver';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    BreadcrumbsComponent,
    TitleComponent,
    AuthComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    DataTablesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    PreventUnsavedChanges,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    CourseCategoryListResolver,
    CourseCategoryDetailResolver,
    CourseListResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
