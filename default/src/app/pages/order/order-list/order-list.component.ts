import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from '../../../../app/_services/order.service';
import { Order } from '../../../../app/_models/order';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { CodeService } from '../../../../app/_services/code.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  orders: Order[];
  form: FormGroup;
  searchText;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  constructor(private route: ActivatedRoute, private orderService: OrderService,
    private codeService: CodeService, private fb: FormBuilder,
    private pnotifyService: PNotifyService, private alertify: AlertifyService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.orders = data['orders'];
    // });
    this.orderService.getOrders().subscribe(rs => {
      this.orders = rs;
      console.log(this.orders);
    });

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
  refeshList() {
    this.orderService.getOrders().subscribe(rs => {
      this.orders = rs;
      console.log(this.orders);
    });
  }
  sendMail(order) {
    let code: any;
    let text: any;
    console.log(order);
    this.codeService.getCode(order.codeId).subscribe(rs => {
      code = rs;
      console.log(code);
      text = 'Đơn hàng của bạn đã được thanh toán thành công mã kích hoạt của bạn là '
      + '<strong>' + code + '</strong>' + ' vào trang web sau để kích hoạt khóa học của bạn http://localhost:4200/active';
      this.form = this.fb.group({
        Text: text,
        To: 'kehao12@gmail.com',
        IdOrder: order.id
      });
     this.orderService.sendMail(Object.assign({}, this.form.value)).subscribe(res => {
       console.log('success');
       this.pnotifyService.success('Đã gửi mã kích hoạt cho khách hàng');
     }, error => {
      this.pnotifyService.error('Lỗi hệ thống');
     });
    });

  }
  cancelOrder(order) {
    this.form = this.fb.group({
      Status: 2,
    });

    this.alertify.confirm('Bạn có muốn xoá mục ' + name + ' ?' , () => {
      this.orderService.UpdateOrder(order.id, Object.assign({}, this.form.value)).subscribe(() => {
        this.refeshList();
        // this.redirectTo('course-category');
        this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Danh mục chưa được xoá');
      });
    });
  }
}
