import { Component, OnInit } from '@angular/core';
import { Quiz } from '../../../../app/_models/quiz';
import { QuizConfig } from '../../../../app/_models/quiz-config';
import { QuizService } from '../../../../app/_services/quiz.service';
import { Question } from '../../../../app/_models/question';
import { Option } from '../../../../app/_models/option';
import { ExamService } from '../../../../app/_services/exam.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  // quiz: any;
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

  constructor(private route: ActivatedRoute, private examService: ExamService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
        this.examService.getExam(this.id).subscribe(res => {
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

    });

  }
  loadQuiz() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
        this.examService.getExam(this.id).subscribe(res => {
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

    });
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
    return question.answer.find(x => x.selected) ? 'Answered' : 'Not Answered';
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
