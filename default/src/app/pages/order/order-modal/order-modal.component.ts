import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {
  students: User[];
  courses: Course[];
  constructor(private userService: UserService, private courseService: CourseService) { }

  ngOnInit() {
    this.userService.getStudent().subscribe(rs => this.students = rs );
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
  }

}
