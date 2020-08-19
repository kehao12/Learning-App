import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../../app/_services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { CourseService } from '../../../../app/_services/course.service';

@Component({
  selector: 'app-mycourse-update-route',
  templateUrl: './mycourse-update-route.component.html',
  styleUrls: ['./mycourse-update-route.component.scss']
})
export class MycourseUpdateRouteComponent implements OnInit {
  @ViewChild('editForm',  { static: true }) editForm: NgForm;
  courseCate: CourseCategory[];
  file: File;
  previewUrl: any;
  id: any;
  course: any;
  constructor(private courseService: CourseService,
    private CourseCateService: CourseCategoryService ,
    private router: Router, private route: ActivatedRoute
   , private alertify: AlertifyService, private commonService: CommonService,
   private modalService: BsModalService, private bsModalRef: BsModalRef,
   private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.CourseCateService.getCourseCategories().subscribe(data => this.courseCate = data);
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    this.courseService.getCourse(this.id).subscribe(rs => {
      this.course = rs;
    });
  });
}

onFileSelect(event) {
  if (event.target.files.length > 0) {
    this.file = event.target.files[0];
    this.course.file = this.file;
    // this.AddForm.get('file').setValue(this.file);
    this.preview();
  }
}
  preview() {
    // Show preview
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }

  updateCourse(ID) {
    const formData = new FormData();
    // formData.append('file', this.course.file);
    formData.append('name', this.course.name);
    formData.append('alias', this.course.alias);
    formData.append('price', this.course.price);
    formData.append('status', this.course.status);
    formData.append('courseCategoryID', this.course.courseCategoryID);
    formData.append('description', this.course.description);
    formData.append('descriptionMain', this.course.descriptionMain);
    this.courseService.UpdateCourse(ID, formData).subscribe(next => {
      this.pnotifyService.success('Bạn vừa sửa khoá học ' + ' thành công');
      this.router.navigate(['/course/addMyCourse/lesson/chapter', this.id]);
    }, error => {
      this.pnotifyService.error('Có lỗi xảy ra');
    });
  }
}


