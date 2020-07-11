import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';

@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html',
  styleUrls: ['./exam-add.component.scss']
})
export class ExamAddComponent implements OnInit {

  questions: any[];
  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.getQuestions().subscribe(rs => this.questions = rs);
  }

}
