import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { HeaderComponent } from './admin-layout/header/header.component';
import { BsDropdownModule, TabsModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberCardComponent } from './admin-layout/members/member-card/member-card.component';
import { MemberDetailComponent } from './admin-layout/members/member-detail/member-detail.component';
import { MemberListsComponent } from './admin-layout/members/member-lists/member-lists.component';
import { MemberEditComponent } from './admin-layout/members/member-edit/member-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './admin-layout/members/photo-editor/photo-editor.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    FileUploadModule,
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })

  ],
  // tslint:disable-next-line:max-line-length
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListsComponent,
    MemberEditComponent,
    PhotoEditorComponent

  ],
  exports: [
    AdminLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberListsComponent,
    MemberEditComponent,
    PhotoEditorComponent

  ],
})
export class AdminModule { }
