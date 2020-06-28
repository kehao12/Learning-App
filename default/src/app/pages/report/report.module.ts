import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { FileUploadModule } from 'ng2-file-upload';
import { NgxGalleryModule } from 'ngx-gallery';
import { ReportOrderComponent } from './report-order/report-order.component';
import { ReportRoutingModule } from './report-routing.module';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ReportVenueComponent } from './report-venue/report-venue.component';
import { ReportProcessComponent } from './report-process/report-process.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    NgxGalleryModule,
    ReportRoutingModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),

  ],
  exports: [

  ],
  declarations: [
    ReportOrderComponent,
    ReportVenueComponent,
    ReportProcessComponent
  ],
  entryComponents: [

  ]
})
export class ReportModule { }
