import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { element } from 'protractor';
import { ReportVeneu } from '../../../../app/_models/reportveneu';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import * as XLSX from 'xlsx';
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
  courseText: any;
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
  revenueTransactionMonth: Array<{total: number, createdAt: any}> = [];
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
  public lineChartLabels: Label[] = [];
  public lineChartData: ChartDataSets[] = [{}];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  idCourse = 0;
  changing = 0;
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
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
        if (element.status == 3) {
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
    this.statisticService.getVenue(this.idCourse, monthNow).subscribe(rs => {
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

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachgiaodich.xlsx');
  }

  updateSumVeneu() {
    this.total = 0;
    this.totalTemp = 0;
    // tslint:disable-next-line:no-shadowed-variable
    this.report.forEach(element => {
      if(element.status == 3) {
        this.total = this.total + element.price;
      }
      this.totalTemp = this.totalTemp + element.price;
    });
    console.log(this.report);
  }
  refeshReport() {
    this.statisticService.GetStatisticVeneu().subscribe(rs =>{
      this.report = [];
      this.report = rs;
     this.updateSumVeneu();
    });
    console.log(this.report);
    // this.statisticService.GetStatisticVeneu().subscribe(rs =>{
    //   this.report = rs;
    //   // tslint:disable-next-line:no-shadowed-variable
    //   this.report.forEach(element => {
    //     if(element.status == 3) {
    //       this.total = this.total + element.price;
    //     }
    //     this.totalTemp = this.totalTemp + element.price;
    //   });
    // });
    // console.log(this.report);
  }
  updateReport() {
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
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();

    if (this.changing == 0) {
      this.report = this.report.filter((item: ReportVeneu) =>
      new Date(item.createdAt).getDate() === dayNow
      );
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    }
    if (this.changing == 1) {

      console.log(monthNow);
      this.report = this.report.filter((item: ReportVeneu) =>
      new Date(item.createdAt).getMonth() + 1 == monthNow
      );
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    }
    if (this.changing == 2) {
      this.refeshReport();
      this.report = this.report.filter((item: ReportVeneu) =>
      new Date(item.createdAt).getFullYear() == yearNow
      );
      // tslint:disable-next-line:no-shadowed-variable
      this.report.forEach(element => {
        if(element.status == 0) {
          this.total = this.total + element.price;
        }
      });
    }


    console.log(this.report);
    this.updateSumVeneu();
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

    this.statisticService.GetStatisticVeneuRange(this.idCourse, daystart, monthstart, yearstart,
      dayend, monthend, yearend).subscribe(rs => {
      this.report = rs;
      this.updateSumVeneu();
    });
    if (this.idCourse != 0) {
      this.statisticService.GetVenueRange(this.idCourse, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Doanh thu'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.GetVenueRange(0, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Doanh thu'});
        this.lineChartData = dataLine;
      });
    }


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
    this.TimeSelected = null;
    this.changing = 1;
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    this.statisticService.getVenue(this.idCourse, monthNow).subscribe(rs => {
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
    this.statisticService.GetStatisticVeneuMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
      this.report = rs;
      this.updateSumVeneu();
    });
  }

  venueYear() {
    this.TimeSelected = null;
    this.changing = 2;
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    console.log(this.lineChartData);
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    console.log(monthNow);
    const yearNow = now.getFullYear();
    this.statisticService.getVenueYear(this.idCourse, yearNow).subscribe(rs => {
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

    this.statisticService.GetStatisticVeneuYear(this.idCourse, yearNow).subscribe(rs => {
      this.report = rs;
      this.updateSumVeneu();
    });
  }

  venueDay() {
    this.TimeSelected = null;
    this.changing = 0;
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

    this.statisticService.getVenueDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
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

    this.statisticService.GetStatisticVeneuDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
      this.report = rs;
      this.updateSumVeneu();
    });
  }

  convert(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth].join('/');
  }
  convert1(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      year = ('0' + (date.getFullYear())).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [day, mnth, year].join('/');
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

  getDayRange(start, end) {
    let arr = [];
    let dt: any;
    for (arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1 )) {
        arr.push(new Date(dt));
    }
    return arr;
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
  // onDateSelected(TimeSelected1: Date[]): void {
  //   const getDaysArray: Date[] = this.getDayRange(TimeSelected1[0], TimeSelected1[1]);
  //   console.log(getDaysArray);
  //   getDaysArray.forEach(dt => {
  //     console.log(dt.getDate());
  //   });
  //   this.total = 0;
  //   this.totalTemp = 0;
  //   let daystart;
  //   let monthstart;
  //   let yearstart;

  //   let dayend;
  //   let monthend;
  //   let yearend;
  //   daystart = TimeSelected1[0].getDate();
  //   monthstart = TimeSelected1[0].getMonth() + 1;
  //   yearstart = TimeSelected1[0].getFullYear();

  //   dayend = TimeSelected1[1].getDate();
  //   monthend = TimeSelected1[1].getMonth() + 1;
  //   yearend = TimeSelected1[1].getFullYear();
  //   if (this.report.length == 0) {
  //     this.statisticService.GetStatisticVeneu().subscribe(rs =>{
  //       this.report = rs;
  //       // tslint:disable-next-line:no-shadowed-variable
  //       this.report.forEach(element => {
  //         if(element.status == 3) {
  //           this.total = this.total + element.price;
  //         }
  //         this.totalTemp = this.totalTemp + element.price;
  //       });
  //     });
  //   }

  //   this.report = this.report.filter((item: ReportVeneu) =>
  //     new Date(item.createdAt).getTime() >= TimeSelected1[0].getTime() && new Date(item.createdAt).getTime() <= TimeSelected1[1].getTime()
  //     );
  //     // tslint:disable-next-line:no-shadowed-variable
  //     this.report.forEach(element => {
  //       if(element.status == 0) {
  //         this.total = this.total + element.price;
  //       }
  //     });
  //   console.log(this.report);
  // }

  loadCourse(id, name) {
    this.idCourse = id;
    this.total = 0;
    this.totalTemp = 0;
    // if (this.TimeSelected[0] && this.TimeSelected[1]) {
    //   this.onCourseSelected(this.idCourse);
    // }
    // if (this.changing == 3) {
      
    // }
    if (this.changing == 0) {
      this.venueDay();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueYear();
    }
    if (this.changing == 3) {
      this.updateChanging3();
    }

    this.courseText = name;
  }
  loadCourseAll() {
    this.idCourse = 0;
    this.total = 0;
    this.totalTemp = 0;
    if (this.changing == 0) {
      this.venueDay();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueYear();
    }
    if (this.changing == 3) {
      this.updateChanging3();
    }
    this.courseText = name;
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

    this.statisticService.GetStatisticVeneuRange(this.idCourse, daystart, monthstart, yearstart,
      dayend, monthend, yearend).subscribe(rs => {
      this.report = rs;
      this.updateSumVeneu();
    });
    if (this.idCourse != 0) {
      this.statisticService.GetVenueRange(this.idCourse, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Doanh thu'});
        this.lineChartData = dataLine;
      });
    } else {
      this.statisticService.GetVenueRange(0, daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => {
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
        dataLine.push({data: this.data1, label: 'Doanh thu'});
        this.lineChartData = dataLine;
      });
    }
  }
}
