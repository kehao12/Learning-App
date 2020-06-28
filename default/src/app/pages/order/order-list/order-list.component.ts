import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../../app/_services/order.service';
import { Order } from '../../../../app/_models/order';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  orders: Order[];
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
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
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachgiaodich.xlsx');
  }
}
