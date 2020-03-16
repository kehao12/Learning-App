import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';
import { CourseCategoryRoutingModule } from './course-category-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { CourseCategoryAddComponent } from './course-category-add/course-category-add.component';
import { ButtonsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { CourseCategoryUpdateComponent } from './course-category-update/course-category-update.component';



@NgModule({
  imports: [
    CommonModule,
    CourseCategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    DataTablesModule,
    ButtonsModule.forRoot(),
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BsDatepickerModule.forRoot()
  ],
  declarations: [CourseCategoryListComponent, CourseCategoryAddComponent, CourseCategoryUpdateComponent]
})
export class CourseCategoryModule { }
