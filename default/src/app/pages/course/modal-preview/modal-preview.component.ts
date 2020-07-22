import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Quiz } from '../../../../app/_models/quiz';
import { QuizConfig } from '../../../../app/_models/quiz-config';
import { QuizService } from '../../../../app/_services/quiz.service';
import { Question } from '../../../../app/_models/question';
import { Option } from '../../../../app/_models/option';
import { ExamService } from '../../../../app/_services/exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-preview',
  templateUrl: './modal-preview.component.html',
  styleUrls: ['./modal-preview.component.scss']
})
export class ModalPreviewComponent implements OnInit {
  @Input() file;
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  id: any;
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': true,  // if true, it will move to next question automatically when answered.
    'duration': 10,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': true,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': true,
    'showPager': true,
    'theme': 'none'
  };

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  timer: any = null;
  startTime: Date;
  endTime: Date;
  ellapsedTime = '00:00';
  duration = '';
  url: any;

  constructor( private router: Router, private route: ActivatedRoute
    , private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService, private examService: ExamService,
    private dom: DomSanitizer  ) { }

  ngOnInit() {
    if (this.file.typeId == 2 ){
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.file.url);
    }
    if (this.file.typeId == 3) {

          this.loadQuiz();
    }

  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl, {class: 'modal-lg'});
 }
 onSelect(question: Question, option: Option) {

  question.answer.forEach((x) => { if (x.id !== option.id) { x.selected = false; } }); 
   if (this.config.autoMove) {
     this.goTo(this.pager.index + 1);
   }
 }

 goTo(index: number) {
   if (index >= 0 && index < this.pager.count) {
     this.pager.index = index;
     this.mode = 'quiz';
   }
 }

 get filteredQuestions() {
   return (this.quiz.questions) ?
     this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
 }
 loadQuiz() {
  this.examService.getExam(this.file.testId).subscribe(res => {
    this.quiz = new Quiz(res);
    this.pager.count = this.quiz.questions.length;
    this.startTime = new Date();
    this.ellapsedTime = '00:00';
    this.timer = setInterval(() => { this.tick(); }, 1000);
    this.duration = this.parseTime(this.quiz.time);
    this.config.duration = this.quiz.time;
    console.log(this.quiz);
  });
  this.mode = 'quiz';
 }

 parseTime(totalSeconds: number) {
   let mins: string | number = Math.floor(totalSeconds / 60);
   let secs: string | number = Math.round(totalSeconds % 60);
   mins = (mins < 10 ? '0' : '') + mins;
   secs = (secs < 10 ? '0' : '') + secs;
   return `${mins}:${secs}`;
 }

 tick() {
   const now = new Date();
   const diff = (now.getTime() - this.startTime.getTime()) / 1000;
   if (diff >= this.config.duration) {
     this.onSubmit();
   }
   this.ellapsedTime = this.parseTime(diff);
 }

 isAnswered(question: Question) {
   return question.answer.find(x => x.selected) ? 'Đã trả lời' : 'Chưa trả lời';
 }

 isCorrect(question: Question) {
   return question.answer.every(x => x.selected === x.answerTrue) ? 'đúng' : 'sai';
 }

 onSubmit() {
   let answers = [];
   this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

   // Post your data to the server here. answers contains the questionId and the users' answer.
   console.log(this.quiz.questions);
   this.mode = 'result';
 }

 getLetter(index) {
   return String.fromCharCode(65 + index);
}
}
