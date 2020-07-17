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
    { data: [0, 0, 1, 0, 3, 3, 0], label: 'Học viên' },
    { data: [1, 1, 0, 0, 0, 0, 0], label: 'Giảng viên' },
    { data: [1, 0, 1, 0, 0, 0, 0], label: 'Quản trị viên' }
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  countUserAllTime: any[];
  countUserMonth: any[];
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private statisticService: StatisticService) { }

  ngOnInit() {
    const date = new Date();
    console.log(date.getMonth());
    this.statisticService.countUser(0).subscribe(rs => this.countUserAllTime = rs);
    this.statisticService.countUser(date.getMonth()).subscribe(rs => this.countUserMonth = rs);
  }

}
