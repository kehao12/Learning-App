import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { DataTablesModule } from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

import { ButtonsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ExamRoutingModule } from './exam.routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExamAddComponent } from './exam-add/exam-add.component';
import { QuestionAddComponent } from './question-add/question-add.component';
import { QuestionModalComponent } from './question-modal/question-modal.component';

import { QuizComponent } from './quiz/quiz.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { ExamEditComponent } from './exam-edit/exam-edit.component';

import { FileUploadModule } from 'ng2-file-upload';
@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    HttpClientModule,
    FileUploadModule,
    SharedModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BsDatepickerModule.forRoot(),
    ChartsModule,
    DataTableModule,
    Ng2SearchPipeModule,
    NgSelectModule
  ],
  declarations: [ExamListComponent, QuestionListComponent, ExamAddComponent
, QuestionAddComponent, QuestionModalComponent, QuizComponent, ExamEditComponent,
EditQuestionComponent]
})
export class ExamModule { }
