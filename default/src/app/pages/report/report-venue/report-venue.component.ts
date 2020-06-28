import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';

@Component({
  selector: 'app-report-venue',
  templateUrl: './report-venue.component.html',
  styleUrls: ['./report-venue.component.scss']
})
export class ReportVenueComponent implements OnInit {

  course: Course[];
  CourseSeleted: number;
  TimeSelected: Date[];
  userParams: any = {};
  constructor(private courseService: CourseService, private fb: FormBuilder, private localeService: BsLocaleService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(rs => this.course = rs);
    this.userParams.start = Date.now();
    this.userParams.end = Date.now();
    this.userParams.course = 0;
  }


  onCourseSelected(CourseId: number): void {
    let start: Date;
    let end: Date;
    start = this.TimeSelected[0];
    end = this.TimeSelected[1];
    console.log(start);
    console.log(end);
    console.log(CourseId);
  }


}
