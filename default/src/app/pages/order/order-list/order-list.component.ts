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
    });

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
    this.codeService.getCode(order.codeId).subscribe(rs => {
      code = rs;
      text = '<p>Kính gửi anh/chị ' + order.user.firstName + ' ' + order.user.lastName + '</p>' +
      '<p>Trung tâm học trực tuyến UCA xin thông báo đơn hàng của bạn đã được thanh toán thành công với mã kích hoạt: </p>' +
 '<p><strong>' + code.codeID + '</strong></p>' +
      '</p>Hãy vào đường dẫn được đính kèm để kích hoạt khóa học của bạn http://localhost:4200/active </p>'
      + '<br><hr><br><p>Mọi chi tiết thắc mắc vui lòng liên hệ:</p>' +
      '<p>Trung tâm học trực tuyến UCA</p>' + '<p>Số điện thoại: 0903.763.581</p>' + '<p>Email: hotro@uca.edu.vn</p>'
      + '<p>Địa chỉ: 236B Lê Văn Sỹ, Phường 1, Quận Tân Bình, TP. Hồ Chí Minh</p>';
      this.form = this.fb.group({
        Text: text,
        To: 'kehao12@gmail.com',
        IdOrder: order.id
      });
     this.orderService.sendMail(Object.assign({}, this.form.value)).subscribe(res => {
      this.orderService.getOrders().subscribe(rs => {
        this.orders = rs;
      });
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

    this.alertify.confirm('Bạn có muốn huỷ giao dịch '  + ' ?' , () => {
      this.orderService.UpdateOrder(order.id, Object.assign({}, this.form.value)).subscribe(() => {
        this.refeshList();
        // this.redirectTo('course-category');
        this.pnotifyService.success('Bạn vừa huỷ ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Lỗi hệ thống');
      });
    });
  }
}
