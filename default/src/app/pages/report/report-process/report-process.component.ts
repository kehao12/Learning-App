import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';

@Component({
  selector: 'app-report-process',
  templateUrl: './report-process.component.html',
  styleUrls: ['./report-process.component.scss']
})
export class ReportProcessComponent implements OnInit {
  courses: Course[];
  users: User[];
  constructor(private courseService: CourseService, private userService: UserService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.userService.getStudentByCouresAll().subscribe(rs => this.users = rs);
  }

  loadCourse(id) {
    this.userService.getUsersCourse(id).subscribe(rs => this.users = rs);
  }
  loadCourseAll() {
    this.userService.getStudentByCouresAll().subscribe(rs => this.users = rs);
  }

}
