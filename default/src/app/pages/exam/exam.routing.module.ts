import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ExamAddComponent } from './exam-add/exam-add.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionAddComponent } from './question-add/question-add.component';





const routes: Routes = [
  {
    path: '',
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
    path: 'add',
    component: ExamAddComponent,
    data: {
      breadcrumb: 'Tạo đề thi',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
