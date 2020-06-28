import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../app/_services/order.service';
import { Order } from '../../../../app/_models/order';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  orders: Order[];
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.orders = data['orders'];
    });
    // this.orderService.getOrders().subscribe(rs => {
    //   this.orders = rs;
    //   console.log(this.orders);
    // });

    this.dtOptions = {
      // pageLength: 15,
      orderCellsTop: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Vietnamese.json'
      }
    };
  }

}
