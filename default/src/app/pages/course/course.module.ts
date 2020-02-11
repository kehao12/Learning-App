import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [CourseListComponent]
})
export class CourseModule { }
