import { Component, OnInit, TemplateRef, Input, OnDestroy } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Course } from '../../../../app/_models/course';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { CourseAddComponent } from '../course-add/course-add.component';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnDestroy, OnInit {
  courses: Course[] = [];
  listCourseCate: CourseCategory[];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  bsModalRef: BsModalRef;
  dtTrigger: Subject<any> = new Subject();
  sub: any;
  searchText;
  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService
    ) { }

  ngOnInit() {
    this.refeshList();
    this.sub = this.route.data.subscribe(data => {
      this.listCourseCate = data['CourseCategory'];
    });


  }
  changeStatus(course, e) {

    let status = e.target.checked;
    console.log(status);
    if (status == true) {
      course.status = 1;
    }
    if (status == false) {
      course.status = 0;
    }
    this.courseService.UpdateStatus(course.id, course).subscribe(next => {
      this.pnotifyService.success('Bạn vừa cập nhật trạng thái ' + ' thành công');
    }, error => {
      this.pnotifyService.error('Xảy ra lỗi');
    });
  }

  refeshList() {
    this.courseService.getCourses()
    .subscribe(data => {
      this.courses = data;
    });
  }

  ngOnDestroy(): void {

  }


  itemCreated() {
    this.refeshList();
  }

  deleteCourse(id: number, name) {
    this.alertify.confirm('Bạn có muốn xoá mục ' + name + ' ?' , () => {
      this.courseService.deleteCourse(id).subscribe(() => {
        this.refeshList();
        // this.redirectTo('course-category');
        this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Danh mục chưa được xoá');
      });
    });

  }

}
