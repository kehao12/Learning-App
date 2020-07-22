import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ExamService } from '../../../../app/_services/exam.service';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.scss']
})
export class QuestionAddComponent implements OnInit {
  questionnaire: FormGroup;
  answer: FormArray;
  ques: FormGroup;
  answerGroup: FormGroup;
  constructor(private fb: FormBuilder, private examService: ExamService,
    private pnotifyService: PNotifyService) { }
  ngOnInit() {
  this.ques = this.fb.group({
      content: [''],
      answer: this.fb.array([
      ])
  });
  this.questionnaire = this.fb.group({
      content: ['', Validators.required],
      contentAnswer1: ['', Validators.required],
      answerTrue: [null , Validators.required],
      contentAnswer2: ['', Validators.required],
      contentAnswer3: ['', Validators.required],
      contentAnswer4: ['', Validators.required],

      // answer : this.fb.array([this.creatAnswer()])
    });
  }
addAnswer() {
  if (this.questionnaire.get('answerTrue').value === 1) {
    this.answer.push(this.creatAnswerTrue(this.questionnaire.get('contentAnswer1').value));
    this.answer.push(this.creatAnswer(this.questionnaire.get('contentAnswer2').value));
    this.answer.push(this.creatAnswer(this.questionnaire.get('contentAnswer3').value));
    this.answer.push(this.creatAnswer(this.questionnaire.get('contentAnswer4').value));
  }
}
// addSection() {
//  this.section = this.questionnaire.get('section') as FormArray;
//   this.section.push(this.creatSection());
// }
creatAnswer(input): FormGroup {
  return this.fb.group({
    content: input,
    answerTrue: false
  });
}
creatAnswerTrue(input): FormGroup {
  return this.fb.group({
    content: input,
    answerTrue: true
  });
}
handleChange(evt) {
  const value = 0;
  const rad = document.getElementsByName('myRadios');
  let prev = null;
  for (let i = 0; i < rad.length; i++) {
      rad[i].addEventListener('change', function() {
          // tslint:disable-next-line:no-unused-expression
          (prev) ? console.log(prev.value) : null;
          if (this !== prev) {
              prev = this;
          }
          console.log(value);
      });
}
}

createQuestion() {
  // this.answerGroup
  if (this.questionnaire.get('answerTrue').value == 1) {
    this.ques = this.fb.group({
      content: this.questionnaire.get('content').value,
      answer: this.fb.array([
        this.fb.group({
          content: this.questionnaire.get('contentAnswer1').value,
          answerTrue: true
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer2').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer3').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer4').value,
          answerTrue: false
        }),
      ])
    });
  }
  if (this.questionnaire.get('answerTrue').value == 2) {
    this.ques = this.fb.group({
      content: this.questionnaire.get('content').value,
      answer: this.fb.array([
        this.fb.group({
          content: this.questionnaire.get('contentAnswer1').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer2').value,
          answerTrue: true
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer3').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer4').value,
          answerTrue: false
        }),
      ])
    });
  }
  if (this.questionnaire.get('answerTrue').value == 3) {
    this.ques = this.fb.group({
      content: this.questionnaire.get('content').value,
      answer: this.fb.array([
        this.fb.group({
          content: this.questionnaire.get('contentAnswer1').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer2').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer3').value,
          answerTrue: true
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer4').value,
          answerTrue: false
        }),
      ])
    });
  }
  if (this.questionnaire.get('answerTrue').value == 4) {
    this.ques = this.fb.group({
      content: this.questionnaire.get('content').value,
      answer: this.fb.array([
        this.fb.group({
          content: this.questionnaire.get('contentAnswer1').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer2').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer3').value,
          answerTrue: false
        }),
        this.fb.group({
          content: this.questionnaire.get('contentAnswer4').value,
          answerTrue: true
        }),
      ])
    });
  }

  console.log(this.ques.value);
  this.examService.addQuestion(Object.assign({}, this.ques.value)).subscribe(rs => {
    // this.bsModalRef.hide();
    // this.itemCreated.emit();
    this.pnotifyService.success('Bạn vừa thêm câu hỏi ' + ' thành công');
    this.questionnaire = this.fb.group({
      content: ['', Validators.required],
      contentAnswer1: ['', Validators.required],
      answerTrue: [null , Validators.required],
      contentAnswer2: ['', Validators.required],
      contentAnswer3: ['', Validators.required],
      contentAnswer4: ['', Validators.required],

      // answer : this.fb.array([this.creatAnswer()])
    });
    console.log('success');
  }, error => {
    console.log('fail');
    this.pnotifyService.error('Lỗi hệ thống');
  });
}
}
