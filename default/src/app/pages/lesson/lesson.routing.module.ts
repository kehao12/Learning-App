import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CourseCategoryDetailResolver } from '../../_resolvers/courseCategory-detail.resolver';
import { CourseCategoryListResolver } from '../../../app/_resolvers/courseCategory-list.resolver';
import { LessonListComponent } from './lesson-list/lesson-list.component';


const routes: Routes = [
  {
    path: '',
    component: LessonListComponent,
    data: {
      breadcrumb: 'Danh mục bài học',
      icon: 'icofont-justify-all bg-c-green',
      status: true
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
