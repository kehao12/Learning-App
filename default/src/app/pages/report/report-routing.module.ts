import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportOrderComponent } from './report-order/report-order.component';
import { ReportVenueComponent } from './report-venue/report-venue.component';
import { ReportProcessComponent } from './report-process/report-process.component';


const routes: Routes = [
    {
        path: 'order',
        component: ReportOrderComponent,
        data: {
          breadcrumb: 'Báo cáo doanh thu',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
      {
        path: 'venue',
        component: ReportVenueComponent,
        data: {
          breadcrumb: 'Báo cáo doanh thu',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
      {
        path: 'process',
        component: ReportProcessComponent,
        data: {
          breadcrumb: 'Báo cáo tiến độ',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
