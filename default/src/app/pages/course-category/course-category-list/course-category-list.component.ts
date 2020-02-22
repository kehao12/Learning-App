import { Component, OnInit, TemplateRef } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

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
    private route: ActivatedRoute, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courseCategories = data['courseCategories'];
    });
    console.log(this.courseCategories);
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 15,
      orderCellsTop: true,
      processing: true
    };

  }

  loadCourseCate() {
    this.courseCategoryService.getCourseCategories().subscribe(data => this.courseCategories = data);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteCourseCate(id: number, name) {
    this.alertify.confirm('Bạn có muốn xoá mục ' + name + ' ?' , () => {
      this.courseCategoryService.deleteCourseCate(id).subscribe(() => {
        this.loadCourseCate();
        // this.redirectTo('course-category');
        this.alertify.success('Mục đã được xoá');
      }, error => {
        this.alertify.error('Mục không được xoá');
      });
    });
  }

  deleteCourseCate1(id: number) {
    this.courseCategoryService.deleteCourseCate(id).subscribe(() => {
        this.alertify.success('Mục đã được xoá');
      }, error => {
        this.alertify.error('Mục không được xoá');
    });
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
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
