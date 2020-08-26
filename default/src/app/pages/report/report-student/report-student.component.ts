import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { CourseService } from '../../../../app/_services/course.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import * as XLSX from 'xlsx';
import { viLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService, BsDatepickerConfig } from 'ngx-bootstrap';
defineLocale('vi', viLocale);


@Component({
  selector: 'app-report-student',
  templateUrl: './report-student.component.html',
  styleUrls: ['./report-student.component.scss']
})
export class ReportStudentComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {}
    // { data: [1, 1, 0, 0, 0, 0, 0], label: 'Giảng viên' },
    // { data: [1, 0, 1, 0, 0, 0, 0], label: 'Quản trị viên' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,

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
  public lineChartLegend = true;
  public lineChartType = 'line';

  countUserAllTime: any[];
  countUserMonth: any[];
   public data1 = [];
  revenueTransactionMonth: Array<{total: number, createdAt: number}> = [];
  revenueTransactionMonthRange: Array<{total: number, createdAt: any, day: number, month: number, year: number}> = [];
  revenueToday: any;
  months = new Array('Tháng 1', 'Tháng 2', 'Tháng 3',
      'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9',
      'Tháng 10', 'Tháng 11', 'Tháng 12');
  monthsNumber = new Array(1, 2, 3,
      4, 5, 6, 7, 8, 9,
      10, 11, 12);
  hoursNumber: number[] = [];
  hours: string[] = [];
  listUser: any[] = [];
  courses: any[] = [];
  courseText: any;
  idCourse = 0;
  changing = 0;
  TimeSelected: Date[];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private statisticService: StatisticService, private courseService: CourseService,
    private localeService: BsLocaleService) { }

  ngOnInit() {
    const dateUser = new Date();
    console.log(dateUser.getMonth());
    this.statisticService.countUser(0).subscribe(rs => this.countUserAllTime = rs);
    this.statisticService.countUser(dateUser.getMonth()).subscribe(rs => this.countUserMonth = rs);
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    const dataLine: any[] = [];
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    this.statisticService.StudentRegisterByCourseMonth(0, monthNow, yearNow).subscribe(rs => {
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
      dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
      this.lineChartData = dataLine;
    });
    this.statisticService.ListStudentRegisterByCourseYear(0, yearNow).subscribe(rs => {
      this.listUser = rs;
      console.log(this.listUser);
    });
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'DanhsachdangkySV.xlsx');
  }
  onDateSelected1(TimeSelected1: Date[]): void {
    this.changing = 3;
    const getDaysArray: Date[] = this.getDayRange(TimeSelected1[0], TimeSelected1[1]);
    console.log(getDaysArray);
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

    this.statisticService.ListStudentRegisterByCourseRange(this.idCourse, daystart, monthstart, yearstart,
      dayend, monthend, yearend).subscribe(rs => {
      this.listUser = rs;
      // this.updateSumVeneu();
    });
    if (this.idCourse != 0) {
      this.statisticService.StudentRegisterByCourseRange(this.idCourse, daystart, monthstart,
        yearstart, dayend, monthend, yearend).subscribe(rs => {
        this.revenueTransactionMonthRange = rs;
        console.log(this.revenueTransactionMonthRange);
        getDaysArray.forEach(listDay => {
          let total = 0;
          const date1 = this.convert1(listDay);
          this.revenueTransactionMonthRange.forEach(revenue => {
            console.log('abc');
            console.log('day: ' + listDay.getDate());
            console.log('month: ' + listDay.getMonth());
            console.log('year: ' + listDay.getFullYear());
            if (revenue.day === listDay.getDate() && revenue.month === listDay.getMonth() + 1 && revenue.year === listDay.getFullYear()) {
              total = revenue.total;
            }
          });

          this.data1.push(total);
          this.lineChartLabels.push(date1);
        });
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.StudentRegisterByCourseRange(0, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
        this.revenueTransactionMonthRange = rs;
        console.log(this.revenueTransactionMonthRange);
        getDaysArray.forEach(listDay => {
          let total = 0;
          const date1 = this.convert1(listDay);
          this.revenueTransactionMonthRange.forEach(revenue => {
            console.log('abc');
            console.log('day: ' + listDay.getDate());
            console.log('month: ' + listDay.getMonth());
            console.log('year: ' + listDay.getFullYear());
            if (revenue.day === listDay.getDate() && revenue.month === listDay.getMonth() + 1 && revenue.year === listDay.getFullYear()) {
              total = revenue.total;
            }
          });
  
          this.data1.push(total);
          this.lineChartLabels.push(date1);
        });
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    }


  }

  convert1(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      year = ('0' + (date.getFullYear())).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, year].join('/');
  }

  getDayRange(start, end) {
    let arr = [];
    let dt: any;
    for (arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1 )) {
        arr.push(new Date(dt));
    }
    return arr;
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

  loadCourse(id, name) {
    this.idCourse = id;
    if (this.changing == 0) {
      this.venueYear();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueDay();
    }
    if (this.changing == 3) {
      this.updateChanging3();
    }
    this.courseText = 'Khoá học: ' + name;
  }
  loadCourseAll() {
    this.idCourse = 0;
    if (this.changing == 0) {
      this.venueYear();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueDay();
    }
    if (this.changing == 3) {
      this.updateChanging3();
    }
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
    this.changing = 1;
    if (this.idCourse == 0) {
      this.statisticService.ListStudentRegisterByCourseMonth(0, monthNow, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });

      this.statisticService.StudentRegisterByCourseMonth(0, monthNow, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.ListStudentRegisterByCourseMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });
      this.statisticService.StudentRegisterByCourseMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    }

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
    this.changing = 0;
    if (this.idCourse == 0) {
      this.statisticService.ListStudentRegisterByCourseYear(0, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });
      this.statisticService.StudentRegisterByCourseYear(0, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.ListStudentRegisterByCourseYear(this.idCourse, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });
      this.statisticService.StudentRegisterByCourseYear(this.idCourse, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    }

  }

  venueDay() {
    this.changing = 2;
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
    if (this.idCourse == 0) {
      this.statisticService.ListStudentRegisterByCourseDay(0, dayNow, monthNow, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });
      this.statisticService.StudentRegisterByCourseDay(0, dayNow, monthNow, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.ListStudentRegisterByCourseDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
        this.listUser = rs;
        console.log(this.listUser);
      });
      this.statisticService.StudentRegisterByCourseDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    }

  }

  updateChanging3() {
    this.changing = 3;
    const getDaysArray: Date[] = this.getDayRange(this.TimeSelected[0], this.TimeSelected[1]);
    console.log(getDaysArray);
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    let daystart;
    let monthstart;
    let yearstart;

    let dayend;
    let monthend;
    let yearend;

    daystart = this.TimeSelected[0].getDate();
    monthstart = this.TimeSelected[0].getMonth() + 1;
    yearstart = this.TimeSelected[0].getFullYear();

    dayend = this.TimeSelected[1].getDate();
    monthend = this.TimeSelected[1].getMonth() + 1;
    yearend = this.TimeSelected[1].getFullYear();
    const date: Date[] = this.getDays(this.TimeSelected[0], this.TimeSelected[1]);
    console.log(daystart);

   
    this.statisticService.ListStudentRegisterByCourseRange(this.idCourse, daystart, monthstart, yearstart,
      dayend, monthend, yearend).subscribe(rs => {
      this.listUser = rs;
      // this.updateSumVeneu();
    });
    if (this.idCourse != 0) {
      this.statisticService.StudentRegisterByCourseRange(this.idCourse, daystart, monthstart,
        yearstart, dayend, monthend, yearend).subscribe(rs => {
        this.revenueTransactionMonthRange = rs;
        console.log(this.revenueTransactionMonthRange);
        getDaysArray.forEach(listDay => {
          let total = 0;
          const date1 = this.convert1(listDay);
          this.revenueTransactionMonthRange.forEach(revenue => {
            console.log('abc');
            console.log('day: ' + listDay.getDate());
            console.log('month: ' + listDay.getMonth());
            console.log('year: ' + listDay.getFullYear());
            if (revenue.day === listDay.getDate() && revenue.month === listDay.getMonth() + 1 && revenue.year === listDay.getFullYear()) {
              total = revenue.total;
            }
          });

          this.data1.push(total);
          this.lineChartLabels.push(date1);
        });
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.StudentRegisterByCourseRange(0, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
        this.revenueTransactionMonthRange = rs;
        console.log(this.revenueTransactionMonthRange);
        getDaysArray.forEach(listDay => {
          let total = 0;
          const date1 = this.convert1(listDay);
          this.revenueTransactionMonthRange.forEach(revenue => {
            console.log('abc');
            console.log('day: ' + listDay.getDate());
            console.log('month: ' + listDay.getMonth());
            console.log('year: ' + listDay.getFullYear());
            if (revenue.day === listDay.getDate() && revenue.month === listDay.getMonth() + 1 && revenue.year === listDay.getFullYear()) {
              total = revenue.total;
            }
          });
  
          this.data1.push(total);
          this.lineChartLabels.push(date1);
        });
        dataLine.push({data: this.data1, label: 'Lượt đăng ký'});
        this.lineChartData = dataLine;
      });
    }
  }
}
