import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { BsDatepickerModule, TabsModule, ButtonsModule, PaginationModule } from 'ngx-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { NgxGalleryModule } from 'ngx-gallery';
import { TimeAgoPipe } from 'time-ago-pipe';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { NgModule } from '@angular/core';
import { CodeActiveOrderComponent } from './code-active-order/code-active-order.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';






@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    PaginationModule.forRoot(),
    NgxGalleryModule,
    TabsModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    DataTablesModule,
    DataTableModule,
    Ng2SearchPipeModule
  ],
  declarations: [OrderListComponent, CodeActiveOrderComponent, OrderModalComponent]
})
export class OrderModule { }
