import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';
import { CourseCategoryUpdateComponent } from './course-category-update/course-category-update.component';
import { CourseCategoryDetailResolver } from '../../_resolvers/courseCategory-detail.resolver';
import { CourseCategoryListResolver } from '../../../app/_resolvers/courseCategory-list.resolver';


const routes: Routes = [
  {
    path: '',
    component: CourseCategoryListComponent,
    data: {
      breadcrumb: 'Danh mục khoá học',
      icon: 'icofont-justify-all bg-c-green',
      status: true
    }
  },
  {
    path: 'edit/:id',
    component: CourseCategoryUpdateComponent,
    resolve: {courseCate: CourseCategoryDetailResolver, listCourseCate: CourseCategoryListResolver},
    data: {
      breadcrumb: 'Danh sách ',
      icon: 'icofont-justify-all bg-c-green',
      status: false
    }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategoryRoutingModule { }
