import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../../app/_services/common.service';

@Component({
  selector: 'app-course-category-update',
  templateUrl: './course-category-update.component.html',
  styleUrls: ['./course-category-update.component.scss']
})
export class CourseCategoryUpdateComponent implements OnInit {
  @ViewChild('editForm',  { static: true }) editForm: NgForm;
  courseCate: CourseCategory;
  listcourseCate: CourseCategory[];
  constructor(private CourseCateService: CourseCategoryService, private alertify: AlertifyService,
    private route: ActivatedRoute, private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courseCate = data['courseCate'];
    });
    this.route.data.subscribe(data => {
      this.listcourseCate = data['listCourseCate'];
    });
  }

  updateCourseCate(ID) {
    this.CourseCateService.UpdateCourseCate(ID, this.courseCate).subscribe(next => {
      this.alertify.success('Đã sửa thành công');
      this.editForm.reset(this.courseCate);
      this.router.navigate(['/course-category']);
    }, error => {
      this.alertify.error(error);
    });
  }

  GetSeoTitle(input) {
    this.courseCate.Alias = this.commonService.getSeoTitle(input);
    console.log(input);
    console.log(this.courseCate.Alias);
  }
}
