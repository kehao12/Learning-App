import { Component, OnInit, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ExamService } from '../../../../app/_services/exam.service';


@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.scss']
})
export class QuestionModalComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  questionnaire: FormGroup;
  answer: FormArray;
  ques: FormGroup;
  answerGroup: FormGroup;
  constructor(private fb: FormBuilder, private examService: ExamService,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
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
        this.bsModalRef.hide();
        this.itemCreated.emit(rs);
        this.pnotifyService.success('Bạn vừa thêm câu hỏi ' + ' thành công');
        console.log('success');
      }, error => {
        console.log('fail');
        this.pnotifyService.error('Lỗi hệ thống');
      });
    }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl);
 }
}
