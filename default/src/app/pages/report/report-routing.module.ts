import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportOrderComponent } from './report-order/report-order.component';
import { ReportVenueComponent } from './report-venue/report-venue.component';
import { ReportProcessComponent } from './report-process/report-process.component';
import { ReportProcessResolver } from '../../../app/_resolvers/report-process.resolver';
import { ProcessCourseUserComponent } from './process-course-user/process-course-user.component';
import { ReportStudentComponent } from './report-student/report-student.component';


const routes: Routes = [
    {
        path: 'order',
        component: ReportOrderComponent,
        data: {
          breadcrumb: 'Báo cáo doanh thu',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
      {
        path: 'venue',
        component: ReportVenueComponent,
        data: {
          breadcrumb: 'Báo cáo doanh thu',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
      {
        path: 'process',
        component: ReportProcessComponent,
        resolve: {users: ReportProcessResolver},
        data: {
          breadcrumb: 'Báo cáo tiến độ',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
            {
        path: 'student',
        component: ReportStudentComponent,
        data: {
          breadcrumb: 'Báo cáo tiến độ',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      },
      {
        path: 'process/:idCourse/:idUser',
        component: ProcessCourseUserComponent,
        data: {
          breadcrumb: 'Báo cáo tiến độ',
          icon: 'icofont-home bg-c-blue',
          status: false
        }
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
