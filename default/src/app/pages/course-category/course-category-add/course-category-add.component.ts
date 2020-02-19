import { Component, OnInit } from '@angular/core';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { state } from '@angular/animations';
import { CommonService } from '../../../../app/_services/common.service';

@Component({
  selector: 'app-course-category-add',
  templateUrl: './course-category-add.component.html',
  styleUrls: ['./course-category-add.component.scss']
})
export class CourseCategoryAddComponent implements OnInit {

  AddForm: FormGroup;
  CourseCategory: CourseCategory;
  courseCategories: CourseCategory[];
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private courseCateService: CourseCategoryService, private router: Router, private route: ActivatedRoute
    , private alertify: AlertifyService, private fb: FormBuilder, private commonService: CommonService) { }



    ngOnInit() {
      this.route.data.subscribe(data => {
        this.courseCategories = data['courseCategories'];
      });
      this.createAddForm();
    }

    createAddForm() {
      this.AddForm = this.fb.group({
        name: ['', Validators.required],
        alias: ['', Validators.required],
        displayOrder: ['', Validators.required],
        description: ['', Validators.required],
        status: 1,
        abc: null,
        parentID: ''
      });
    }

    loadCourseCate() {
      this.courseCateService.getCourseCategories().subscribe(data => this.courseCategories = data);
    }

    AddCourseCate() {
      if (this.AddForm.valid) {
        this.CourseCategory = Object.assign({}, this.AddForm.value);
        this.courseCateService.addCourseCate(this.CourseCategory).subscribe(() => {
          this.redirectTo('course-category');
          this.loadCourseCate();
          this.alertify.success('Thêm thành công');
        }, error => {
          this.alertify.error('Danh mục đã tồn tại');
        });
      }
    }



GetSeoTitle(input) {
 this.AddForm.controls['alias'].setValue(this.commonService.getSeoTitle(input));
//  console.log(this.AddForm.get('alias'));
 console.log(input);
}

GetParentId(input) {
 console.log(input);
 this.AddForm.controls['parentID'].setValue(input);
}
redirectTo(uri: string) {
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
  this.router.navigate([uri]));
}
}
