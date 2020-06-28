import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../app/_services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../app/_models/order';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { CodeService } from '../../../../app/_services/code.service';
import { Code } from '../../../../app/_models/code';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-code-active-order',
  templateUrl: './code-active-order.component.html',
  styleUrls: ['./code-active-order.component.scss']
})
export class CodeActiveOrderComponent implements OnInit {
  idOrder: number;
  idCourse: number[] = [];
  order: Order;
  courses: Course[];
  code: Code;
  constructor(private orderService: OrderService, private route: ActivatedRoute,
    private courseService: CourseService, private codeService: CodeService,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idOrder = Number.parseInt(params['id']);
      this.orderService.getOrder(this.idOrder).subscribe(rs => {
        this.order = rs;
        console.log(rs);
        if (this.order.codeId) {
          this.codeService.getCode(this.order.codeId).subscribe(res => {
            this.code = res;
            console.log(this.code);
          });
        }
      });
    });

    this.courseService.getCourses().subscribe(rs => {
      this.courses = rs;
    });

  }
  refesh() {
    this.route.params.subscribe(params => {
      this.idOrder = Number.parseInt(params['id']);
      this.orderService.getOrder(this.idOrder).subscribe(rs => {
        this.order = rs;
        console.log(rs);
        if (this.order.codeId) {
          this.codeService.getCode(this.order.codeId).subscribe(res => {
            this.code = res;
            console.log(this.code);
          });
        }
      });
    });

    this.courseService.getCourses().subscribe(rs => {
      this.courses = rs;
    });
  }

  generateCode() {
    this.order.orderDetail.forEach(ele => {
      this.idCourse.push(ele.courseId);
    });
    const course = {
      courseId: this.idCourse
    };

    this.codeService.generateCode(course).subscribe((rs: any) => {
      const oderUpdate = {
        codeId: rs.id,
        status: 1
      };
      console.log('generate code');
      this.pnotifyService.success('Tạo mã kích hoạt thành công');
      this.orderService.UpdateOrder(this.order.id, oderUpdate).subscribe(res => {
        console.log('Đơn hàng đã được cập nhật');
        this.refesh();
      });

    });
  }

}
