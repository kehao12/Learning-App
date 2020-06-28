import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseDetailResolver } from '../../_resolvers/course-detail.resolver';
import { LessonAddComponent } from './lesson-add/lesson-add.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { FileComponent } from './file/file.component';
import { CourseListResolver } from '../../../app/_resolvers/course-list.resolver';
import { MyCourseComponent } from './my-course/my-course.component';


const routes: Routes = [
  {
    path: 'list',
    component: CourseListComponent,
    data: {
      breadcrumb: 'Danh sách khoá học',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  },
  {
    path: 'my-course',
    component: MyCourseComponent,
    data: {
      breadcrumb: 'Khoá học của tôi',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  },
  // {
  //   path: 'addcourse',
  //   component: CourseAddComponent,

  // },
  {
    path: 'edit/:id',
    component: CourseDetailComponent,
    resolve: {course: CourseDetailResolver},
    data: {
      breadcrumb: 'Chi tiết khoá học',
      icon: 'icofont-home bg-c-blue',
      status: false
    }

  },
  {
    path: 'addLesson/:id',
    resolve: {course: CourseDetailResolver},
    component: LessonAddComponent,

  },
  {
    path: 'lesson/:id',
    component: FileComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
