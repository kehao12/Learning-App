import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { state } from '@angular/animations';
import { CommonService } from '../../../../app/_services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-course-category-add',
  templateUrl: './course-category-add.component.html',
  styleUrls: ['./course-category-add.component.scss']
})
export class CourseCategoryAddComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;

  AddForm: FormGroup;
  CourseCategory: CourseCategory;
  courseCategories: CourseCategory[];
  bsConfig: Partial<BsDatepickerConfig>;
  pnotify = undefined;
  constructor(private courseCateService: CourseCategoryService, private router: Router, private route: ActivatedRoute
    , private alertify: AlertifyService, private fb: FormBuilder, private commonService: CommonService,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService) { }



    ngOnInit() {
      this.route.data.subscribe(data => {
        this.courseCategories = data['courseCategories'];
      });
      this.createAddForm();
    }

    showModal() {
      this.bsModalRef = this.modalService.show(this.itemCreateMdl);
      this.createAddForm();
   }

    createAddForm() {
      this.AddForm = this.fb.group({
        name: ['sd', Validators.required],
        alias: [''],
        displayOrder: ['1', Validators.required],
        description: ['sadsads', Validators.required],
        status: 1,
        abc: null,
        parentID: null,
        createdDate: new Date()
      });
    }
    AddCourseCate() {
      const name = this.AddForm.get('name').value;
      if (this.AddForm.valid) {
        this.AddForm.controls['alias'].setValue(this.commonService.getSeoTitle(this.AddForm.get('name').value));
        this.CourseCategory = Object.assign({}, this.AddForm.value);
        this.courseCateService.addCourseCate(this.CourseCategory).subscribe(res => {
          this.bsModalRef.hide();
          this.itemCreated.emit();
          this.pnotifyService.success('Bạn vừa thêm danh mục ' + name + ' thành công');
        }, error => {
          this.pnotifyService.error('Thêm không thành công');
        });
      }
    }



GetSeoTitle(input) {

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
