import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';


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
  totalTime: any;
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
  timeAvange: any;
  public lineChartLabels: Label[] = [];
  public lineChartData: ChartDataSets[] = [{}];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private userService: UserService, private statisticService: StatisticService) { }

  ngOnInit() {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.userService.getStudentByCouresAll().subscribe(rs => {
      this.users = rs;
      this.users.forEach(ele => {
        if (ele.processing == 100) {
          count = count + 1;
          this.timeAvange = this.timeAvange + ele.duration;
        }
        this.totalTime = this.totalTime + ele.duration;
      });
      this.timeAvange = this.timeAvange / count;

    });
    // this.route.data.subscribe(data => {
    //   this.users = data['users'];
    // });
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    const dataLine: any[] = [];
    this.statisticService.TimeStudyMonth(monthNow, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      date.forEach(listDay => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === listDay.getDate()) {
            total = revenue.total / 3600;
          }
        });
        const date1 = this.convert(listDay);
        this.data1.push(total);
        this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Thời gian học'});
      this.lineChartData = dataLine;
    });
  }

  convertTime(totalSeconds) {
    // if (!totalSeconds) {
    //   return 0;
    // }
    let min: any;
    let hour: any;
    let sec: any;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);

if (hours == 0 && minutes == 0) {
  return (seconds + ' giây');
}
if (hours == 0) {
  return ( minutes + ' phút ' + seconds + ' giây');
}
if (hours > 0) {
  return (hours + ' giờ ' + minutes + ' phút ' + seconds + ' giây');
}

}

  loadCourse(id, name) {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.userService.getUsersCourse(id).subscribe(rs => {
      this.users = rs;
      this.users.forEach(ele => {
        if (ele.processing == 100) {
          count = count + 1;
          this.timeAvange = this.timeAvange + ele.duration;
        }
        this.totalTime = this.totalTime + ele.duration;
      });
      this.timeAvange = this.timeAvange / count;

    });
    this.courseText = 'Khoá học: ' + name;
  }
  loadCourseAll() {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.userService.getStudentByCouresAll().subscribe(rs => {
      this.users = rs;
      this.users.forEach(ele => {
        if (ele.processing == 100) {
          count = count + 1;
          this.timeAvange = this.timeAvange + ele.duration;
        }
        this.totalTime = this.totalTime + ele.duration;
      });
      this.timeAvange = this.timeAvange / count;

    });
    this.courseText = 'Khoá học: Toàn bộ khoá học';
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

  venueMonth() {
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    this.statisticService.TimeStudyMonth(monthNow, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      date.forEach(listDay => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === listDay.getDate()) {
            total = revenue.total / 3600;
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
    this.statisticService.TimeStudyYear(1, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      this.monthsNumber.forEach(month => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === month) {
            total = revenue.total / 3600;
          }
        });

        this.data1.push(total);
      });
      this.lineChartLabels = this.months;
      dataLine.push({data: this.data1, label: 'Thời gian học'});
      this.lineChartData = dataLine;
    });
  }

  venueDay() {
    this.hours = [];
    this.hoursNumber = [];
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

    this.statisticService.TimeStudyDay(1, dayNow, monthNow, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      this.hoursNumber.forEach(hour => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc');
          if (revenue.createdAt === hour) {
            total = revenue.total / 3600;
          }
        });

        this.data1.push(total);
      });
      this.lineChartLabels = this.hours;
      dataLine.push({data: this.data1, label: 'Thời gian học'});
      this.lineChartData = dataLine;
    });
  }

}
