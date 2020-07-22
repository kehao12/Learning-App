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
import { CourseAddRouteComponent } from './course-add-route/course-add-route.component';
import { CourseLessonAddComponent } from './course-lesson-add/course-lesson-add.component';
import { CourseFileComponent } from './course-file/course-file.component';


const routes: Routes = [
  {
    path: 'list',
    component: CourseListComponent,
    data: {
      breadcrumb: 'Danh sách khoá học',
      icon: 'icofont-home bg-c-blue',
      status: true
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
      status: true
    }
  },
  {
    path: 'add',
    component: CourseAddRouteComponent,
    data: {
      breadcrumb: 'Chi tiết khoá học',
      icon: 'icofont-home bg-c-blue',
      status: true
    }
  },
  {
    path: 'addLesson/:id',
    resolve: {course: CourseDetailResolver},
    component: LessonAddComponent,
    data: {
      breadcrumb: 'Thêm chương',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  },
  {
    path: 'lesson/:id',
    component: FileComponent,
    data: {
      breadcrumb: 'Thêm bài học',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  },
  {
    path: 'add/lesson/:id',
    component: CourseLessonAddComponent,
    data: {
      breadcrumb: 'Thêm chương',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  },
  {
    path: 'add/lesson/chapter/:id',
    component: CourseFileComponent,
    data: {
      breadcrumb: 'Thêm bài học',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
