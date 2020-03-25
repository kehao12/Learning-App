import { Component, OnInit, TemplateRef, ComponentRef } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  styleUrls: ['./course-category-list.component.scss']
})
export class CourseCategoryListComponent implements OnInit {


  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  SelectedIDs: any[] = [];
  courseCategories: CourseCategory[];
  constructor(private courseCategoryService: CourseCategoryService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService, private router: Router,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courseCategories = data['courseCategories'];
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    console.log(this.courseCategories);
    this.dtOptions = {
      // pageLength: 15,
      orderCellsTop: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Vietnamese.json'
      }
    };

  }

  loadCourseCate() {
    this.courseCategoryService.getCourseCategories().subscribe(data => this.courseCategories = data);
  }

  deleteCourseCate(id: number, name) {
    this.alertify.confirm('Bạn có muốn xoá mục ' + name + ' ?' , () => {
      this.courseCategoryService.deleteCourseCate(id).subscribe(() => {
        this.loadCourseCate();
        // this.redirectTo('course-category');
        this.pnotifyService.success('Bạn vừa xoá danh mục ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Danh mục chưa được xoá');
      });
    });
  }

  deleteCourseCate1(id: number) {
    this.courseCategoryService.deleteCourseCate(id).subscribe(() => {
      this.pnotifyService.success('Bạn vừa xoá danh mục ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Danh mục chưa được xoá');
    });
  }

 selectID(id, event: any) {
  console.log(id);
  this.SelectedIDs.push(id);

}

deleteSelected() {
    console.log(this.SelectedIDs);
    this.SelectedIDs.forEach(function (value) {
    this.deleteCourseCate1(value);
  });
    // this.deleteCourseCate(obj.id);
}


}
