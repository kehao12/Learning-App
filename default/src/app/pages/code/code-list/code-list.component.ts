import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.scss']
})
export class CodeListComponent implements OnInit {
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  month: any;
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      // pageLength: 15,
      orderCellsTop: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Vietnamese.json'
      }
    };
    const date = new Date;
    this.month = date.getMonth() + 1;
    console.log(this.getDaysInMonth(0, 2019));
  }

  getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

}
