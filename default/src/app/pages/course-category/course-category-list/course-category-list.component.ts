import { Component, OnInit, TemplateRef } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
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

  courseCategories: CourseCategory[];
  constructor(private courseCategoryService: CourseCategoryService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService) { }

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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
