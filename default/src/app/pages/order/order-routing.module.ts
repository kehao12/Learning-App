import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OrderListComponent } from './order-list/order-list.component';
import { CodeActiveOrderComponent } from './code-active-order/code-active-order.component';
import { OrderModalComponent } from './order-modal/order-modal.component';


const routes: Routes = [
  {
    path: 'list',
    component: OrderListComponent,
    data: {
      breadcrumb: 'Danh sách đơn hàng',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'addOrder',
    component: OrderModalComponent,
    data: {
      breadcrumb: 'Tạo giao dịch',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'detail/:id',
    component: CodeActiveOrderComponent,
    data: {
      breadcrumb: 'Tạo mã Code',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
