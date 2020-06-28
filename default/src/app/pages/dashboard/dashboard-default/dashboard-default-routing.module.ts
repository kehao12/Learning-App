import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardDefaultComponent} from './dashboard-default.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardDefaultComponent,
    data: {
      breadcrumb: 'Trang tổng quan',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardDefaultRoutingModule { }
