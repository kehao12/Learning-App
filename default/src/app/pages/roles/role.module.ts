import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { UserManagementComponent } from './user-management/user-management.component';
import { RolesModalComponent } from './roles-modal/roles-modal.component';
import { RoleRoutingModule } from './role-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgxGalleryModule,
    RoleRoutingModule
  ],
  exports: [
    RolesModalComponent
  ],
  declarations: [
    UserManagementComponent,
    RolesModalComponent
  ],
  entryComponents: [
    RolesModalComponent
  ]
})
export class RoleModule { }
