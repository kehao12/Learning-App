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
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {
  @Input() course;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  @ViewChild('editForm',  { static: true }) editForm: NgForm;
  courseCate: CourseCategory[];
  file: File;
  previewUrl: any;
  constructor(private courseService: CourseService,
     private CourseCateService: CourseCategoryService ,
     private router: Router, private route: ActivatedRoute
    , private alertify: AlertifyService, private commonService: CommonService,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.CourseCateService.getCourseCategories().subscribe(data => this.courseCate = data);
    console.log(this.course);
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl, {class: 'modal-lg'});
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
    formData.append('file', this.course.file);
    formData.append('name', this.course.name);
    formData.append('alias', this.course.alias);
    formData.append('price', this.course.price);
    formData.append('status', this.course.status);
    formData.append('courseCategoryID', this.course.courseCategoryID);
    formData.append('description', this.course.description);
    this.courseService.UpdateCourse(ID, formData).subscribe(next => {
      this.bsModalRef.hide();
      this.itemCreated.emit();
      this.pnotifyService.success('Bạn vừa sửa danh mục ' + ' thành công');
    }, error => {
      this.pnotifyService.error('Danh mục đã tồn tại');
    });
  }

}
