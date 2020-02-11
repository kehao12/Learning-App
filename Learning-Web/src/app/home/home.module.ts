import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { IndexComponent } from './homelayout/index/index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HomelayoutComponent,
    IndexComponent
  ]
})
export class HomeModule { }
