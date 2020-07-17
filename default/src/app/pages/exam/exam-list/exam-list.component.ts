import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  exams: any[];
  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.getExams().subscribe(rs => this.exams = rs);
  }

}
