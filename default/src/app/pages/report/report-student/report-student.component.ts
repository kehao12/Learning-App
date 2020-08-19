import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { StatisticService } from '../../../../app/_services/statistic.service';


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
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // grey
      backgroundColor: '#FAFAFA',
      borderColor: '#4680ff',
      pointBackgroundColor: '#4680ff',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#FC6180'
    },
        { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  countUserAllTime: any[];
  countUserMonth: any[];
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
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private statisticService: StatisticService) { }

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
    this.statisticService.CountStudentMonth(monthNow, yearNow).subscribe(rs => {
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
      dataLine.push({data: this.data1, label: 'Học viên'});
      this.lineChartData = dataLine;
    });
    this.statisticService.CountTeacherMonth(monthNow, yearNow).subscribe(rs => {
      this.data1 = [];
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
        // this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Giảng viên'});
      this.lineChartData = dataLine;
    });
    this.statisticService.CountAdminMonth(monthNow, yearNow).subscribe(rs => {
      this.data1 = [];
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
        // this.lineChartLabels.push(date1);
      });
      dataLine.push({data: this.data1, label: 'Quản trị viên'});
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
}
