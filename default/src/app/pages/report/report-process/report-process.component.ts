import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report-process',
  templateUrl: './report-process.component.html',
  styleUrls: ['./report-process.component.scss']
})
export class ReportProcessComponent implements OnInit {
  courses: Course[];
  dtOptions: DataTables.Settings = {};
  users: User[];
  searchText;
  courseText = 'Khoá học: Toàn bộ khoá học';
  constructor(private route: ActivatedRoute, private courseService: CourseService, private userService: UserService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.userService.getStudentByCouresAll().subscribe(rs => this.users = rs);
    // this.route.data.subscribe(data => {
    //   this.users = data['users'];
    // });
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

  loadCourse(id, name) {
    this.userService.getUsersCourse(id).subscribe(rs => this.users = rs);
    this.courseText = 'Khoá học: ' + name;
  }
  loadCourseAll() {
    this.userService.getStudentByCouresAll().subscribe(rs => this.users = rs);
    this.courseText = 'Khoá học: Toàn bộ khoá học';
  }


}
