import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: any[];
  constructor(private examService: ExamService) { }

  ngOnInit() {
    this.examService.getQuestions().subscribe(rs => this.questions = rs);
  }
  
}
