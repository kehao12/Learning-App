import { Component, OnInit, EventEmitter, Input, Inject, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Course } from '../../../../app/_models/course';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { Lesson } from '../../../../app/_models/lesson';
import { Lesson1 } from '../../../../app/_models/CLesson';
import { CommonService } from '../../../../app/_services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-add-route',
  templateUrl: './course-add-route.component.html',
  styleUrls: ['./course-add-route.component.scss']
})
export class CourseAddRouteComponent implements OnInit {

  AddForm: FormGroup;
  uploader: FileUploader;
  Course: Course;
  file: File;
  courseCate: CourseCategory[];
  lesson = new Lesson1;
  dataarray = [];
  previewUrl: any = null;
  sub: any;
  LessonForms: FormArray = this.fb.array([]);
  fg: FormGroup;
  update: FormGroup;
  mode = 'course';
  constructor(private fb: FormBuilder, private courseService: CourseService, private CourseCateService: CourseCategoryService,
    private alertify: AlertifyService,  private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService, private commonService: CommonService, 
    private router: Router) { }

  ngOnInit() {
    this.mode = 'course';
      this.CourseCateService.getCourseCategories().subscribe(data => this.courseCate = data);
      this.createAddForm();
      this.addLessonForm();
    this.update = this.fb.group({
      Name: [''],
      CourseId: 1
    });
  }

  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['sda', Validators.required],
      alias: ['dsa', Validators.required],
      status: false,
      courseCategoryID: [null, Validators.required],
      file: ['', Validators.required],
      price: 0,
      priceMain: 0,
      description: ['sad', Validators.required],
      descriptionMain: ['sấdsa', Validators.required]
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.AddForm.get('file').setValue(this.file);
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

    addLessonForm() {
      this.LessonForms.push(this.fb.group({
          ID: [0],
          Name: ['', Validators.required],
          CourseId: 1
      }));
    }

    recordSubmit(fg: FormGroup) {
      if (fg.value.ID == 0) {
        console.log('them');
        fg.value.ID = 1;
        console.log(this.LessonForms.value);
        this.addLessonForm();
        // this.lessonService.addLesson(fg.value).subscribe(
        //   (res: any) => {
        //     fg.patchValue({ ID: res.id });
        //     this.showNotification('insert');
        //     this.addLessonForm();
        //     this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
        //       this.lessons = rs;
        //     });
        //   });
      } else {
        this.update.value.Name = fg.value.Name;
        console.log('abc');
        console.log(this.LessonForms.value);
        // this.lessonService.UpdateLesson(fg.value.ID , this.update.value).subscribe(
        //   (res: any) => {
        //     this.showNotification('update');
        //     this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
        //       this.lessons = rs;
        //     });
        //   });
      }
    }
    createCourse() {
    const formData = new FormData();
    this.AddForm.controls['alias'].setValue(this.commonService.getSeoTitle(this.AddForm.get('name').value));
    formData.append('file', this.AddForm.get('file').value);
    formData.append('name', this.AddForm.get('name').value);
    formData.append('status', this.AddForm.get('status').value);
    formData.append('alias', this.AddForm.get('alias').value);
    formData.append('price', this.AddForm.get('price').value);
    formData.append('priceMain', this.AddForm.get('priceMain').value);
    formData.append('descriptionMain', this.AddForm.get('descriptionMain').value);
    formData.append('description', this.AddForm.get('description').value);
    formData.append('courseCategoryID', this.AddForm.get('courseCategoryID').value);
    // this.Course = Object.assign({}, this.AddForm.value);
    // console.log(this.Course);
    this.courseService.addCourse(formData).subscribe((res: any) => {
      this.pnotifyService.success('Khoá học đã được tạo');
      this.router.navigate(['/course/add/lesson/', res.id]);
    }, error => {
      this.pnotifyService.error('Khoá học chưa được tạo');
    });
    }

}
