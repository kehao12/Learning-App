import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDetailResolver } from '../../_resolvers/course-detail.resolver';
import { LessonAddComponent } from './lesson-add/lesson-add.component';


const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    data: {
      breadcrumb: 'Danh sách khoá học',
      icon: 'icofont-justify-all bg-c-green',
      status: true
    }
  },
  {
    path: 'edit/:id',
    component: CourseDetailComponent,
    resolve: {course: CourseDetailResolver},
    data: {
      breadcrumb: 'Danh sách ',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'addLesson/:id',
    resolve: {course: CourseDetailResolver},
    component: LessonAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
