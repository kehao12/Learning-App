import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html',
  styleUrls: ['./exam-add.component.scss']
})
export class ExamAddComponent implements OnInit {
  selected: any;
  questions: any[];
  exam: FormGroup;
  selectedQuestion: any[] = [];
  constructor(private examService: ExamService, private fb: FormBuilder,
    private pnotifyService: PNotifyService, private route: Router) { }

  ngOnInit() {
    this.examService.getQuestions().subscribe(rs => this.questions = rs);
    this.exam = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      time: ['' , [Validators.required, Validators.min(300), Validators.max(3600)]],
      point: ['', [Validators.required, Validators.min(40), Validators.max(100)]],
      questions: []
      // answer : this.fb.array([this.creatAnswer()])
    });
  }

  itemCreated(event) {
    this.selectedQuestion.push(event);
    this.questions.push(event);
    console.log(event);
  }

  public onOptionsSelected(event) {
    console.log(event);
  //   if (this.questions.find(x => x.id == event.id)) {
  //     console.log(this.questions.find(x => x.id == event.id));
  //     this.selectedQuestion.push(this.questions.find(x => x.id == event.id));
  //     this.questions.splice(this.questions.findIndex(x => x.id == event.id), 1);
  //  }
  this.selectedQuestion = event;
  console.log(this.selectedQuestion);

  console.log(this.exam.value);
 }
 createExam() {
  this.exam.get('questions').setValue(this.selectedQuestion);
  console.log(this.exam.value);
  this.examService.addExam(Object.assign({}, this.exam.value)).subscribe(rs => {
    // this.bsModalRef.hide();
    // this.itemCreated.emit();
    this.pnotifyService.success('Bạn vừa tạo đề thi ' + ' thành công');
    this.route.navigate(['/question-exam/exam']);
    console.log('success');
  }, error => {
    console.log('fail');
    this.pnotifyService.error('Lỗi hệ thống');
  });
 }


}
