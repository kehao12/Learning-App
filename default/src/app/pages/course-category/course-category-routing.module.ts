import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseCategoryListComponent } from './course-category-list/course-category-list.component';


const routes: Routes = [
  {
    path: '',
    component: CourseCategoryListComponent,
    data: {
      breadcrumb: 'Danh mục khoá học',
      icon: 'icofont-justify-all bg-c-green',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseCategoryRoutingModule { }
