import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AuthService } from '../../../../app/_services/auth.service';
import { Course } from '../../../../app/_models/course';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { CourseAddComponent } from '../course-add/course-add.component';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  courses: Course[];
  constructor(private courseService: CourseService,
    private authService: AuthService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.courseService.getMyCourses(this.authService.decodedToken.unique_name).subscribe(rs => {
      this.courses = rs;
      console.log(this.authService.decodedToken.unique_name);
      console.log(this.courses);
    });
  }
  refeshList() {
    this.courseService.getMyCourses(this.authService.decodedToken.unique_name).subscribe(rs => {
      this.courses = rs;
      console.log(this.authService.decodedToken.unique_name);
      console.log(this.courses);
    });
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
