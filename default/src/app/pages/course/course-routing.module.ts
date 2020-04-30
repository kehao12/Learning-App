import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDetailResolver } from '../../_resolvers/course-detail.resolver';
import { LessonAddComponent } from './lesson-add/lesson-add.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { FileComponent } from './file/file.component';
import { CourseListResolver } from '../../../app/_resolvers/course-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
    data: {
      breadcrumb: 'Danh sách khoá học',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'addcourse',
    component: CourseAddComponent,
    data: {
      breadcrumb: 'Danh sách ',
      icon: 'icofont-justify-all bg-c-green',
      status: false
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
    component: LessonAddComponent,
    data: {
      breadcrumb: 'Thêm chương ',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  },
  {
    path: 'lesson/:id',
    component: FileComponent,
    // resolve: {course: CourseDetailResolver},
    data: {
      breadcrumb: 'Thêm chương ',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
