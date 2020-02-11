import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { SharedModule } from '../../shared/shared.module';
import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';
import { CourseCategoryRoutingModule } from './course-category-routing.module';



@NgModule({
  imports: [
    CommonModule,
    CourseCategoryRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [CourseCategoryListComponent]
})
export class CourseCategoryModule { }
