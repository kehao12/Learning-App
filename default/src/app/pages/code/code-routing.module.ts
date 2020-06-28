import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeListComponent } from './code-list/code-list.component';



const routes: Routes = [
  {
    path: '',
    component: CodeListComponent,
    data: {
      breadcrumb: 'Mã kích hoạt',
      icon: 'icofont-justify-all bg-c-green',
      breadcrumb_caption: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit - About Us',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
