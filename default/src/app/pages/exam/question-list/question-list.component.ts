import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';
import * as XLSX from 'xlsx';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: any[];
  data: [][];
  questionnaire: FormGroup;
  answer: FormArray;
  ques: FormGroup;
  answerGroup: FormGroup;
  items: any;
  constructor(private fb: FormBuilder, private examService: ExamService,
    private pnotifyService: PNotifyService,
    private modalService: BsModalService,
    private bsModalRef: BsModalRef) { }
  ngOnInit() {
    this.examService.getQuestions().subscribe(rs => this.questions = rs);
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
  // addAnswer() {
  //   if (ele.answerTrue === 1) {
  //     this.answer.push(this.creatAnswerTrue(ele.contentAnswer1));
  //     this.answer.push(this.creatAnswer(ele.contentAnswer2));
  //     this.answer.push(this.creatAnswer(ele.contentAnswer3));
  //     this.answer.push(this.creatAnswer(ele.contentAnswer4));
  //   }
  // }

  onFileChange(evt: any) {
    const target: DataTransfer =  <DataTransfer>(evt.target);

    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = XLSX.utils.sheet_to_json(ws, {header: 2});

      console.log(this.data);

      this.items = this.data;


     


    };


    reader.readAsBinaryString(target.files[0]);

  }
  createQuestion(data) {
 this.data.forEach( (ele: any) => {
        console.log(ele.answerTrue);
        if (ele.answerTrue == 1) {
          console.log(ele.content);
          this.ques = this.fb.group({
            content: ele.content,
            answer: this.fb.array([
              this.fb.group({
                content: ele.contentAnswer1,
                answerTrue: true
              }),
              this.fb.group({
                content: ele.contentAnswer2,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer3,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer4,
                answerTrue: false
              }),
            ])
          });
        }
        if (ele.answerTrue == 2) {
          this.ques = this.fb.group({
            content: ele.content,
            answer: this.fb.array([
              this.fb.group({
                content: ele.contentAnswer1,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer2,
                answerTrue: true
              }),
              this.fb.group({
                content: ele.contentAnswer3,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer4,
                answerTrue: false
              }),
            ])
          });
        }
        if (ele.answerTrue == 3) {
          this.ques = this.fb.group({
            content: ele.content,
            answer: this.fb.array([
              this.fb.group({
                content: ele.contentAnswer1,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer2,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer3,
                answerTrue: true
              }),
              this.fb.group({
                content: ele.contentAnswer4,
                answerTrue: false
              }),
            ])
          });
        }
        if (ele.answerTrue == 4) {
          this.ques = this.fb.group({
            content: ele.content,
            answer: this.fb.array([
              this.fb.group({
                content: ele.contentAnswer1,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer2,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer3,
                answerTrue: false
              }),
              this.fb.group({
                content: ele.contentAnswer4,
                answerTrue: true
              }),
            ])
          });
        }

        console.log(this.ques.value);
        this.examService.addQuestion(Object.assign({}, this.ques.value)).subscribe(rs => {
          this.pnotifyService.success('Bạn vừa thêm câu hỏi ' + ' thành công');
          this.examService.getQuestions().subscribe(res => this.questions = res);
          console.log('success');
        }, error => {
          console.log('fail');
          this.pnotifyService.error('Lỗi hệ thống');
        });
      });
      this.items = null;
      this.bsModalRef.hide();
  }
  deleteItem(i) {
    if (i > -1) {
      this.items.splice(i, 1);
    }
  }

}

