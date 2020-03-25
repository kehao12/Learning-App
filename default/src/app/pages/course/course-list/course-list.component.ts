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

  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courses = data['Courses'];
      this.dtTrigger.next();
    });
    this.sub = this.route.data.subscribe(data => {
      this.listCourseCate = data['CourseCategory'];
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 15,
      orderCellsTop: true,
      processing: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Vietnamese.json'
      }
    };

  }


  refeshList() {
    this.courseService.getCourses()
    .subscribe(data => {
      this.courses = data;
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.sub.unsubscribe();
    this.dtTrigger.unsubscribe();
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
