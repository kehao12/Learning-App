import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamAddComponent } from './exam-add/exam-add.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuizComponent } from './quiz/quiz.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';





const routes: Routes = [
  {
    path: 'exam',
    component: ExamListComponent,
    data: {
      breadcrumb: 'Danh sách đề thi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'question',
    component: QuestionListComponent,
    data: {
      breadcrumb: 'Danh sách câu hỏi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    },
  },
  {
    path: 'question/add',
    component: QuestionAddComponent,
    data: {
      breadcrumb: 'Thêm câu hỏi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    },
  },
  {
    path: 'question/edit/:id',
    component: EditQuestionComponent,
    data: {
      breadcrumb: 'Sửa câu hỏi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    },
  },
  {
    path: 'exam/add',
    component: ExamAddComponent,
    data: {
      breadcrumb: 'Tạo đề thi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'exam/:id',
    component: QuizComponent,
    data: {
      breadcrumb: 'Đề thi',
      icon: 'icofont-justify-all bg-c-green',
      status: true
    }
  },
  {
    path: 'exam/edit/:id',
    component: ExamEditComponent,
    data: {
      breadcrumb: 'Sửa đề thi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
