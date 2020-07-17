import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent implements OnInit {
  id: any;
  question: any;
  constructor(private examService: ExamService, private route: ActivatedRoute,
    private pnotifyService: PNotifyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      this.examService.getQuestion(this.id).subscribe(rs => {
        this.question = rs;
        console.log(this.question);
        });
    });

  }
  getLetter(index) {
    return String.fromCharCode(65 + index);
}
  handleRadio(answerIndex: number): void {
    this.question.answer.forEach((answer) => {
      answer.answerTrue = false;
    });
    this.question.answer[answerIndex].answerTrue = true;
  }
  editQuestion() {
    console.log(this.question);
    this.examService.UpdateQuestion(this.id, this.question).subscribe(rs => {
      this.pnotifyService.success('Bạn vừa sửa câu hỏi ' + ' thành công');
      this.router.navigate(['/question-exam/question']);
       console.log('success');
       this.pnotifyService.success('Sửa câu hỏi thành công');
     }, error => {
       console.log('fail');
       this.pnotifyService.error('Lỗi hệ thống');
     });
  }

}
