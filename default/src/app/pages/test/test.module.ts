import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test.component';



@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [TestComponent]
})
export class TestModule { }
