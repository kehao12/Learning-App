import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { CodeRoutingModule } from './code-routing.module';
import { CodeListComponent } from './code-list/code-list.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgxGalleryModule,
    CodeRoutingModule,
    DataTablesModule,
  ],
  declarations: [
    CodeListComponent,
  ],
  entryComponents: [
  ]
})
export class CodeModule { }
