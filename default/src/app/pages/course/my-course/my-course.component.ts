import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AuthService } from '../../../../app/_services/auth.service';
import { Course } from '../../../../app/_models/course';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  courses: Course[];
  constructor(private courseService: CourseService,
    private authService: AuthService) { }

  ngOnInit() {
    this.courseService.getMyCourses(this.authService.decodedToken.unique_name).subscribe(rs => {
      this.courses = rs;
      console.log(this.authService.decodedToken.unique_name);
      console.log(this.courses);
    });
  }

}
