import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';

import { DataTablesModule } from 'angular-datatables';

import { ButtonsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ExamRoutingModule } from './exam.routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ChartsModule } from 'ng2-charts';
import { DataTableModule } from 'ng-angular8-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ExamAddComponent } from './exam-add/exam-add.component';
import { QuestionAddComponent } from './question-add/question-add.component';


@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BsDatepickerModule.forRoot(),
    ChartsModule,
    DataTableModule,
    Ng2SearchPipeModule,
  ],
  declarations: [ExamListComponent, QuestionListComponent, ExamAddComponent
, QuestionAddComponent]
})
export class ExamModule { }
