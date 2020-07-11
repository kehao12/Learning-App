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
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.scss']
})
export class ProfileStudentComponent implements OnInit {
  @Input() user;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  course: Course[] = [];
  constructor(private fb: FormBuilder, private courseService: CourseService, private CourseCateService: CourseCategoryService,
    private alertify: AlertifyService,  private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService, private route: Router) { }

  ngOnInit() {
    console.log(this.user);
    this.user.userCourses.forEach(element => {
      this.courseService.getCourse(element.courseId).subscribe(res => {
          this.course.push(res);
        });
    });
    console.log(this.course);
  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, { class: 'modal-lg'});

 }
 navigate(courseId) {
  this.route.navigate(['/report/process/', courseId, this.user.id]);
  this.bsModalRef.hide();
 }

}
