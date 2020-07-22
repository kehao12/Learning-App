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
import { LessonService } from '../../../../app/_services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-lesson-add',
  templateUrl: './course-lesson-add.component.html',
  styleUrls: ['./course-lesson-add.component.scss']
})
export class CourseLessonAddComponent implements OnInit {

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
  id: any;
  constructor(private fb: FormBuilder, private courseService: CourseService, private CourseCateService: CourseCategoryService,
    private alertify: AlertifyService,  private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService, private lessonService: LessonService, 
    private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
      this.mode = 'course';
        // this.courseService.getCourse()
        this.route.params.subscribe(params => {
          this.id = Number.parseInt(params['id']);
        });
        this.addLessonForm();
        this.update = this.fb.group({
          Name: ['', Validators.required],
          CourseId: this.id
        });
        console.log(this.LessonForms);
    }

  addLessonForm() {
    this.LessonForms.push(this.fb.group({
        ID: [0],
        Name: ['', Validators.required],
        CourseId: [this.id]
    }));
  }

  onDelete(id, i) {
    if (id === 0) {
      this.LessonForms.removeAt(i);
    } else {
        this.lessonService.deleteLesson(id).subscribe(() => {
          // this.redirectTo('course-category');
          this.LessonForms.removeAt(i);
          this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
        }, error => {
          this.pnotifyService.error('Danh mục chưa được xoá');
        });
    }
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.ID === 0) {
      this.lessonService.addLesson(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ ID: res.id });
          // this.showNotification('insert');
          this.addLessonForm();
          // this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
          //   this.lessons = rs;
          // });
        });
    } else {
      this.update.value.Name = fg.value.Name;
      this.lessonService.UpdateLesson(fg.value.ID , this.update.value).subscribe(
        (res: any) => {
          // this.showNotification('update');
          // this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
          //   this.lessons = rs;
          // });
        });
    }
  }
  createCourse() {
    this.router.navigate(['/course/add/lesson/chapter/', this.id]);
  }
}
