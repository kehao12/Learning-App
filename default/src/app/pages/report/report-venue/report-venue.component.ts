import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { element } from 'protractor';
import { ReportVeneu } from '../../../../app/_models/reportveneu';

@Component({
  selector: 'app-report-venue',
  templateUrl: './report-venue.component.html',
  styleUrls: ['./report-venue.component.scss']
})
export class ReportVenueComponent implements OnInit {

  courses: Course[];
  CourseSeleted: number;
  TimeSelected: Date[];
  userParams: any = {};
  report: ReportVeneu[];
  total = 0;
  searchText;
  constructor(private courseService: CourseService, private fb: FormBuilder,
     private localeService: BsLocaleService, private statisticService: StatisticService) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.userParams.start = Date.now();
    this.userParams.end = Date.now();
    this.userParams.course = 0;
    this.statisticService.GetStatisticVeneu().subscribe(rs =>{
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    });
  }


  onCourseSelected(CourseId: number): void {
    let start: Date;
    let end: Date;
    start = this.TimeSelected[0];
    end = this.TimeSelected[1];
    this.report = this.report.filter((item: ReportVeneu) =>
      item.createdAt.getTime() >= start.getTime() && item.createdAt.getTime() <= end.getTime()
    );
  }
  onDateSelected(TimeSelected1: Date[]): void {
    this.total = 0;
    let daystart;
    let monthstart;
    let yearstart;

    let dayend;
    let monthend;
    let yearend;
    daystart = TimeSelected1[0].getDate();
    monthstart = TimeSelected1[0].getMonth() + 1;
    yearstart = TimeSelected1[0].getFullYear();

    dayend = TimeSelected1[1].getDate();
    monthend = TimeSelected1[1].getMonth() + 1;
    yearend = TimeSelected1[1].getFullYear();
    if (this.report.length == 0) {
      this.statisticService.GetStatisticVeneu().subscribe(rs =>{
        this.report = rs;
        // tslint:disable-next-line:no-shadowed-variable
        this.report.forEach(element => {
          if(element.status == 0) {
            this.total = this.total + element.price;
          }
        });
      });
    }

    this.report = this.report.filter((item: ReportVeneu) =>
      // const a = new Date(item.createdAt);
      // console.log(new Date(item.createdAt).getMonth() + 1);
      // console.log(new Date(item.createdAt).getMonth() + 1);
      // console.log(TimeSelected1[0]);
      // tslint:disable-next-line:no-unused-expression
      // new Date(item.createdAt).getDate() >= daystart && new Date(item.createdAt).getDate() <= dayend
      // && new Date(item.createdAt).getMonth() + 1 >= monthstart && new Date(item.createdAt).getMonth() + 1 <= monthend
      // && new Date(item.createdAt).getFullYear() >= yearstart && new Date(item.createdAt).getFullYear() <= yearend
      // tslint:disable-next-line:no-unused-expression
      new Date(item.createdAt).getTime() >= TimeSelected1[0].getTime() && new Date(item.createdAt).getTime() <= TimeSelected1[1].getTime()
      );
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    console.log(this.report);
  }

  loadCourse(id, name) {
    this.total = 0;
    this.statisticService.GetStatisticVeneuCourse(id).subscribe(rs => {
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
      if(element.status == 0) {
        this.total = this.total + element.price;
      }
      });
    });
  }
  loadCourseAll() {
    this.total = 0;
    this.statisticService.GetStatisticVeneu().subscribe(rs =>{
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    });

  }


}
