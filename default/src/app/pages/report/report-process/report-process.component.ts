import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as XLSX from 'xlsx';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PNotifyService } from '../../../../app/_services/pnotify.service';


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
  idCourse = 0;
  changing = 0;
  form: FormGroup;
  public lineChartLabels: Label[] = [];
  public lineChartData: ChartDataSets[] = [{}];
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private userService: UserService, private statisticService: StatisticService,
    private fb: FormBuilder, private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.courseService.getCourses().subscribe(rs => this.courses = rs);
    
    // this.route.data.subscribe(data => {
    //   this.users = data['users'];
    // });
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    const dataLine: any[] = [];
    this.statisticService.TimeStudyMonth(0, monthNow, yearNow).subscribe(rs => {
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
    this.userService.GetStudentByCouresMonth(0, monthNow, yearNow).subscribe(rs => {
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
  }

  SendMail() {
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    this.users.forEach(ele => {
      console.log(new Date(ele.createdCourse.getDate()));
      const date: Date = ele.createdCourse;
      if (ele.processing < 100 && ele.createdCourse.getFullYear() > yearNow
      || (ele.createdCourse.getFullYear() ==  yearNow && ele.createdCourse.getMonth() > monthNow) ||
      (ele.createdCourse.getFullYear() ==  yearNow && ele.createdCourse.getMonth() == monthNow 
      && (dayNow - ele.created.getDate()) > 2)) {
        const text = ele.firstname + ele.lastname + 'thân mến' + '<p>Bạn học khoá học </p>' + ele.course.name +
        ' đến đâu rồi?' + '<p>Tôi vẫn chưa nhận được thông báo hoàn thành bài học từ bạn.</p>' +
        '<p>Nếu bạn gặp khó khăn gì hay reply email này và chia sẽ cho tôi biết khó khăn, thách thức của bạn.</p>';
      this.form = this.fb.group({
        Text: text,
        To: ele.email,
        IdOrder: 1
      });
      this.statisticService.sendMail(Object.assign({}, this.form.value)).subscribe(res => {
        this.pnotifyService.success('Đã gửi thành công');
      }, error => {
        this.pnotifyService.error('Lỗi hệ thống');
       });
      }
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
    this.idCourse = id;
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    console.log('changing' + this.changing);
    if (this.changing == 0) {
      this.venueDay();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueYear();
    }

    this.courseText = 'Khoá học: ' + name;
  }
  loadCourseAll() {
    this.idCourse = 0;

    if (this.changing == 0) {
      this.venueDay();
    }
    if (this.changing == 1) {
      this.venueMonth();
    }
    if (this.changing == 2) {
      this.venueYear();
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
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.changing = 1;
    this.lineChartLabels = [];
    this.data1 = [];
    const dataLine: any[] = [];
    const now = new Date();
    const dayNow = now.getDate();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    if (this.idCourse != 0) {
    this.statisticService.TimeStudyMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
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
    this.userService.GetStudentByCouresMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
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
    } else {
      this.statisticService.TimeStudyMonth(0, monthNow, yearNow).subscribe(rs => {
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
      this.userService.GetStudentByCouresMonth(this.idCourse, monthNow, yearNow).subscribe(rs => {
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
    }
  }

  venueYear() {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    console.log('yaer');
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
    if (this.idCourse != 0) {
    this.statisticService.TimeStudyYear(this.idCourse, yearNow).subscribe(rs => {
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
    this.userService.GetStudentByCouresYear(this.idCourse, yearNow).subscribe(rs => {
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
  } else {
    this.statisticService.TimeStudyYear(0, yearNow).subscribe(rs => {
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
    this.userService.GetStudentByCouresYear(this.idCourse, yearNow).subscribe(rs => {
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
  }
  }

  venueDay() {
    this.timeAvange = 0;
    this.totalTime = 0;
    let count = 0;
    this.changing = 0;
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
    if (this.idCourse != 0) {
    this.statisticService.TimeStudyDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
      this.revenueTransactionMonth = rs;
      this.hoursNumber.forEach(hour => {
        let total = 0;
        this.revenueTransactionMonth.forEach(revenue => {
          console.log('abc day');
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
    this.userService.GetStudentByCouresDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
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
  } else {
    this.statisticService.TimeStudyDay(0, dayNow, monthNow, yearNow).subscribe(rs => {
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
    this.userService.GetStudentByCouresDay(this.idCourse, dayNow, monthNow, yearNow).subscribe(rs => {
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
  }
  }
  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Danhsachtiendohocvien.xlsx');
  }

}
