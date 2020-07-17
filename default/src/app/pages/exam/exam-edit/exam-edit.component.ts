import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { Route } from '@angular/compiler/src/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.component.html',
  styleUrls: ['./exam-edit.component.scss']
})
export class ExamEditComponent implements OnInit {
  id: any;
  questions: any[];
  exam: any;
  listSelected: any[] = [];
  selectedQuestion: any[] = [];
  exam1: FormGroup;
  constructor(private examService: ExamService, private route: ActivatedRoute,
    private pnotifyService: PNotifyService, private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      this.examService.getExam(this.id).subscribe(rs => {
        this.exam = rs;
        console.log(this.exam);
        console.log(this.exam.questions);
        this.exam.questions.forEach(element => {
          console.log(element);
          this.listSelected.push(element.id);
          this.selectedQuestion.push(element);
        });
        console.log(this.listSelected);

        });
        this.examService.getQuestions().subscribe(rs => this.questions = rs);
    });
  }

  onOptionsSelected(ev) {
  let array = [];
  console.log(ev);
  // console.log(this.selectedQuestion);
  this.questions.forEach(element => {
    ev.forEach(ele => {
      if (element.id == ele) {
        array.push(element);
      }
    });
  });
  console.log(array);
  this.selectedQuestion = array;
  }
  updateExam() {
    this.exam.questions = this.selectedQuestion;
    console.log(this.exam);
    this.examService.addExam(Object.assign({}, this.exam.value)).subscribe(rs => {
      // this.bsModalRef.hide();
      // this.itemCreated.emit();
      this.pnotifyService.success('Bạn vừa tạo đề thi ' + ' thành công');
      this.router.navigate(['/question-exam/exam']);
      console.log('success');
    }, error => {
      console.log('fail');
      this.pnotifyService.error('Lỗi hệ thống');
    });
  }

}
