import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { StatisticService } from '../../../../app/_services/statistic.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap';
defineLocale('vi', viLocale);

@Component({
  selector: 'app-report-order',
  templateUrl: './report-order.component.html',
  styleUrls: ['./report-order.component.scss']
})
export class ReportOrderComponent implements OnInit {
  // Pie
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  // };

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [

  ];
  data1 = [];
  DateSelected = ' Tháng này';
  revenueTransactionMonth: Array<{total: number, createdAt: number}> = [];
  top5Sale: any;
  top5Venue: any;
  top5Rv: any;
  top5Regis: any;
  top5Rating: any;
  TimeSelected: Date[];

  constructor(private statisticService: StatisticService, private localeService: BsLocaleService) { }

  ngOnInit() {
    this.localeService.use('vi');
    const now = new Date();
    const monthNow = now.getMonth() + 1;
    console.log(monthNow);
    const yearNow = now.getFullYear();
    const date: Date[] = this.getDaysInMonth(monthNow, yearNow);
    this.statisticService.Top5CourseOrder(monthNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenue(monthNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewMonth(monthNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingMonth(monthNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterMonth(monthNow).subscribe(rs => this.top5Regis = rs);
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
        this.barChartLabels.push(date1);
        console.log(total);
        this.data1.push(total);
        // this.barChartData.push(d.push(total),label:'Doanh thu');
        // this.data.push({year : date1, value: total});
      });

    });
    console.log(this.data1);
    this.barChartData.push({data : this.data1, label: 'Doanh thu'});
  }

  onDateSelected(TimeSelected1: Date[]): void {
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
    console.log(daystart);
    this.DateSelected = ' Từ ngày ' + daystart + '/' + monthstart + '/' + yearstart + ' đến ' + dayend + '/' + monthend + '/' + yearend;

    this.statisticService.Top5CourseReview(daystart, monthstart, yearstart, dayend, monthend, yearend).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseOrderRange(daystart, monthstart, yearstart, dayend, monthend, yearend)
    .subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseRating(daystart, monthstart, yearstart, dayend, monthend, yearend)
    .subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegister(daystart, monthstart, yearstart, dayend, monthend, yearend)
    .subscribe(rs => this.top5Regis = rs);
    this.statisticService.Top5CourseVenueRange(daystart, monthstart, yearstart, dayend, monthend, yearend)
    .subscribe(rs => this.top5Venue = rs);
  }

  ChangeMonthNow() {
    this.DateSelected = ' Tháng này';
    const now = new Date();
    const monthNow = now.getMonth() + 1;
    console.log(monthNow);
    this.statisticService.Top5CourseOrder(monthNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenue(monthNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewMonth(monthNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingMonth(monthNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterMonth(monthNow).subscribe(rs => this.top5Regis = rs);
  }
  ChangeMonthPrevious() {
    this.DateSelected = ' Tháng trước';
    const now = new Date();
    const monthNow = now.getMonth();
    console.log(monthNow);
    this.statisticService.Top5CourseOrder(monthNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenue(monthNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewMonth(monthNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingMonth(monthNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterMonth(monthNow).subscribe(rs => this.top5Regis = rs);
  }
  ChangeDayNow() {
    this.DateSelected = ' Hôm nay';
    const now = new Date();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const dayNow = now.getDate();
    console.log(dayNow);
    this.statisticService.Top5CourseOrderDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenueDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Regis = rs);

  }
  ChangeDayPrevious() {
    this.DateSelected = ' Hôm qua';
    const now = new Date();
    const monthNow = now.getMonth() + 1;
    const yearNow = now.getFullYear();
    const dayNow = now.getDate() - 1;
    console.log(dayNow);
    this.statisticService.Top5CourseOrderDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenueDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterDay(dayNow, monthNow, yearNow).subscribe(rs => this.top5Regis = rs);
  }
  ChangeYearNow() {
    this.DateSelected = ' Năm nay';
    const now = new Date();
    const monthNow = now.getFullYear();
    console.log(monthNow);
    this.statisticService.Top5CourseOrderYear(monthNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenueYear(monthNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewYear(monthNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingYear(monthNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterYear(monthNow).subscribe(rs => this.top5Regis = rs);
  }
  ChangeYearPrevious() {
    this.DateSelected = ' Năm trước';
    const now = new Date();
    const monthNow = now.getFullYear() - 1;
    console.log(monthNow);
    this.statisticService.Top5CourseOrderYear(monthNow).subscribe(rs => this.top5Sale = rs);
    this.statisticService.Top5CourseVenueYear(monthNow).subscribe(rs => this.top5Venue = rs);
    this.statisticService.Top5CourseReviewYear(monthNow).subscribe(rs => this.top5Rv = rs);
    this.statisticService.Top5CourseRatingYear(monthNow).subscribe(rs => this.top5Rating = rs);
    this.statisticService.Top5CourseRegisterYear(monthNow).subscribe(rs => this.top5Regis = rs);
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
