import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { element } from 'protractor';
import { ReportVeneu } from '../../../../app/_models/reportveneu';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap';
defineLocale('vi', viLocale);

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
  totalTemp = 0;
  searchText;
  today: Date;

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    // annotation: {
    //   annotations: [
    //     {
    //       type: 'line',
    //       mode: 'vertical',
    //       scaleID: 'x-axis-0',
    //       value: 'March',
    //       borderColor: 'orange',
    //       borderWidth: 2,
    //       label: {
    //         enabled: true,
    //         fontColor: 'orange',
    //         content: 'LineAnno'
    //       }
    //     },
    //   ],
    // },
  };
  public lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: '#FAFAFA',
      borderColor: '#4680ff',
      pointBackgroundColor: '#4680ff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FC6180'
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public data1 = [];
  revenueTransactionMonth: Array<{total: number, createdAt: number}> = [];
  revenueToday: any;
  months = new Array('Tháng 1', 'Tháng 2', 'Tháng 3',
      'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9',
      'Tháng 10', 'Tháng 11', 'Tháng 12');
  monthsNumber = new Array(1, 2, 3,
      4, 5, 6, 7, 8, 9,
      10, 11, 12);
  hoursNumber: number[] = [];
  hours: string[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartData: ChartDataSets[] = [{}];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(private courseService: CourseService, private fb: FormBuilder,
     private localeService: BsLocaleService, private statisticService: StatisticService) {
      }

  ngOnInit() {
    this.today = new Date;
    this.localeService.use('vi');
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.userParams.start = Date.now();
    this.userParams.end = Date.now();
    this.userParams.course = 0;
    this.statisticService.GetStatisticVeneu().subscribe(rs =>{
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 3) {
          this.total = this.total + element.price;
        }
        this.totalTemp = this.totalTemp + element.price;
      });
    });
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    const dataLine: any[] = [];
    this.statisticService.getVenue(monthNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      date.forEach(listDay => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === listDay.getDate()) {
            total = revenue.total;
          }
        });
        const date1 = this.convert(listDay);
        this.data1.push(total);
        this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Doanh thu'});
      this.lineChartData = dataLine;
    });
  }

  onDateSelected1(TimeSelected1: Date[]): void {
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
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
    const date: Date[] = this.getDays(TimeSelected1[0], TimeSelected1[1]);
    console.log(daystart);
    this.statisticService.GetVenueRange(daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      date.forEach(listDay => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === listDay.getDate()) {
            total = revenue.total;
          }
        });
        const date1 = this.convert(listDay);
        this.data1.push(total);
        this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Doanh thu'});
      this.lineChartData = dataLine;
    });
  }

  getDays(start: Date, end: Date) {

    const date = new Date(start.getFullYear(), start.getMonth() , 1);
    const dateEnd = new Date(end.getFullYear(), end.getMonth() , 1);
    const days = [];
    console.log(date.getMonth());
    while (date <= dateEnd) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  venueMonth() {
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    this.statisticService.getVenue(monthNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      date.forEach(listDay => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === listDay.getDate()) {
            total = revenue.total;
          }
        });
        const date1 = this.convert(listDay);
        this.data1.push(total);
        this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Doanh thu'});
      this.lineChartData = dataLine;
    });
  }

  venueYear() {
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    console.log(this.lineChartData);
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    console.log(monthNow);
    const yearNow = now.getFullYear();
    this.statisticService.getVenueYear(yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      this.monthsNumber.forEach(month => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === month) {
            total = revenue.total;
          }
        });

        this.data1.push(total);
      });
      this.lineChartLabels = this.months;
      dataLine.push({data: this.data1, label: 'Doanh thu'});
      this.lineChartData = dataLine;
    });
  }

  venueDay() {
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    console.log(monthNow);
    const yearNow = now.getFullYear();
    for (let index = 0; index <= 23; index++) {
      this.hoursNumber.push(index);
      this.hours.push(index + ' giờ');
    }

    this.statisticService.getVenueDay(dayNow, monthNow, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      this.hoursNumber.forEach(hour => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === hour) {
            total = revenue.total;
          }
        });

        this.data1.push(total);
      });
      this.lineChartLabels = this.hours;
      dataLine.push({data: this.data1, label: 'Doanh thu'});
      this.lineChartData = dataLine;
    });
  }

  convert(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth].join('/');
  }
  getDaysInMonth(month, year) {
    console.log(month);
    const date = new Date(year, month - 1 , 1);
    const days = [];
    console.log(date.getMonth());
    while (date.getMonth() === month - 1) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  setTotal() {
    this.total = 0;
    this.totalTemp = 0;
    if (this.report.length == 0) {
      this.statisticService.GetStatisticVeneu().subscribe(rs =>{
        this.report = rs;
        // tslint:disable-next-line:no-shadowed-variable
        this.report.forEach(element => {
          if(element.status == 3) {
            this.total = this.total + element.price;
          }
          this.totalTemp = this.totalTemp + element.price;
        });
      });
    }
  }
  onCourseSelected(CourseId: number): void {

    let start: Date;
    let end: Date;
    start = this.TimeSelected[0];
    end = this.TimeSelected[1];
    this.report = this.report.filter((item: ReportVeneu) =>
      item.createdAt.getTime() >= start.getTime() && item.createdAt.getTime() <= end.getTime()
    );
    this.setTotal();
  }
  onDateSelected(TimeSelected1: Date[]): void {
    this.total = 0;
    this.totalTemp = 0;
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
          if(element.status == 3) {
            this.total = this.total + element.price;
          }
          this.totalTemp = this.totalTemp + element.price;
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
    this.totalTemp = 0;
    this.statisticService.GetStatisticVeneuCourse(id).subscribe(rs => {
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 3) {
          this.total = this.total + element.price;
        }
        this.totalTemp = this.totalTemp + element.price;
      });
    });
  }
  loadCourseAll() {
    this.total = 0;
    this.totalTemp = 0;
    this.statisticService.GetStatisticVeneu().subscribe(rs =>{
      this.report = rs;
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 3) {
          this.total = this.total + element.price;
        }
        this.totalTemp = this.totalTemp + element.price;
      });
    });

  }


}
