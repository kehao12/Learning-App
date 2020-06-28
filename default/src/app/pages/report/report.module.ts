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
import { TimeAgoPipe } from 'time-ago-pipe';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


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
    DataTableModule,
    Ng2SearchPipeModule,

  ],
  exports: [

  ],
  declarations: [
    ReportOrderComponent,
    ReportVenueComponent,
    ReportProcessComponent,
    TimeAgoPipe,
  ],
  entryComponents: [

  ]
})
export class ReportModule { }
