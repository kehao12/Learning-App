import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../app/_models/course';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../app/_services/lesson.service';
import { Lesson } from '../../../../app/_models/lesson';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-lesson-add',
  templateUrl: './lesson-add.component.html',
  styleUrls: ['./lesson-add.component.css']
})
export class LessonAddComponent implements OnInit {
  course: Course;
  LessonForms: FormArray = this.fb.array([]);
  fg: FormGroup;
  update: FormGroup;
  id: number;
  lessons: Lesson[];
  notification = null;
  name: string;

  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute, private lessonService: LessonService,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private courseService: CourseService, private alertify: AlertifyService,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    this.route.data.subscribe(data => {
      this.course = data['course'];
    });

    console.log(this.id);
    this.addLessonForm();
    this.update = this.fb.group({
      Name: [''],
      CourseId: [this.id]
    });
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, { class: 'modal-lg'});
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
          this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
            this.lessons = rs;
          });
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
          this.showNotification('insert');
          this.addLessonForm();
          this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
            this.lessons = rs;
          });
        });
    } else {
      this.update.value.Name = fg.value.Name;
      this.lessonService.UpdateLesson(fg.value.ID , this.update.value).subscribe(
        (res: any) => {
          this.showNotification('update');
          this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
            this.lessons = rs;
          });
        });
    }
  }
  delLesson(id, name) {
    this.alertify.confirm('Bạn có muốn xoá mục ' + name + ' ?' , () => {
      this.lessonService.deleteLesson(id).subscribe(() => {
        // this.redirectTo('course-category');
        this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
          this.lessons = rs;
        });
        this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
      }, error => {
        this.pnotifyService.error('Danh mục chưa được xoá');
      });
    });
  }

  showNotification(category) {
    switch (category) {
      case 'insert':
        this.pnotifyService.success('Bạn vừa thêm ' + ' thành công');
        break;
      case 'update':
        this.pnotifyService.success('Bạn vừa sửa ' + ' thành công');
        break;
      case 'delete':
        this.pnotifyService.success('Bạn vừa xóa ' + ' thành công');
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}

