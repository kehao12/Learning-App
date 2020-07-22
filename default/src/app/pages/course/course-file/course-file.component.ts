import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LessonService } from '../../../../app/_services/lesson.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ItemService } from '../../../../app/_services/item.service';

import { AlertifyService } from '../../../../app/_services/alertify.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';

@Component({
  selector: 'app-course-file',
  templateUrl: './course-file.component.html',
  styleUrls: ['./course-file.component.scss']
})
export class CourseFileComponent implements OnInit {
  lessons: any;
  id: any;
  update: FormGroup;
  mode = 0;
  course: any;
  LessonForms: FormArray = this.fb.array([]);
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  @ViewChild('itemCreateMdl1', { static: false}) itemCreateMdl1: ElementRef;
  @ViewChild('itemCreateMdl2', { static: false}) itemCreateMdl2: ElementRef;
  constructor(private lessonService: LessonService,
    private route: ActivatedRoute, private modalService: BsModalService,
    private bsModalRef: BsModalRef, private itemService: ItemService,
    private pnotifyService: PNotifyService, private alertify: AlertifyService,
    private fb: FormBuilder, private courseService: CourseService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
      this.courseService.getCourse(this.id).subscribe(rs => this.course = rs);
    });
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
      console.log(this.lessons);
    });
    this.addLessonForm('target');
        this.update = this.fb.group({
          Name: ['', Validators.required],
          CourseId: this.id
        });
  }
  editLesson(lesson) {
    this.mode = lesson.id;

  }
  submitEditLesson(lesson) {
    this.lessonService.UpdateLesson(lesson.id , lesson).subscribe(
      (res: any) => {
        this.pnotifyService.success('Đã sửa chương ' + ' thành công');
        this.mode = 0;
    this.itemCreated(0);
      });
  }
  resetLesson(lesson) {
    this.mode = 0;
    this.itemCreated(0);
  }
  addLessonForm(el) {
    if (this.LessonForms.length == 0) {
      this.LessonForms.push(this.fb.group({
        ID: [0],
        Name: ['', Validators.required],
        CourseId: [this.id]
    }));
    }
    console.log(el);
    document.getElementById('target').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});

    // el.scrollIntoView();
  }
  changeStatus() {
    console.log('sad');
   const course = {
     status: 1
   };

    console.log(course);
    this.courseService.UpdateStatus(this.id, course).subscribe(next => {
      this.pnotifyService.success('Khoá học đã được xuất bản ' + ' thành công');
      this.router.navigate(['/course/list']);
    }, error => {
      this.pnotifyService.error('Xảy ra lỗi');
    });
  }

  onDelete(id, i) {
    if (id === 0) {
      this.LessonForms.removeAt(i);
    } else {
        this.lessonService.deleteLesson(id).subscribe(() => {
          // this.redirectTo('course-category');
          this.LessonForms.removeAt(i);
          // this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
        }, error => {
          // this.pnotifyService.error('Danh mục chưa được xoá');
        });
    }
  }
  deleteLesson(lesson) {
    this.lessonService.deleteLesson(lesson.id).subscribe(() => {
      // this.redirectTo('course-category');
      this.itemCreated(0);
      this.pnotifyService.success('Bạn vừa xoá ' + ' thành công');
    }, error => {
      this.itemCreated(0);
      this.pnotifyService.error('Danh mục chưa được xoá');
    });
  }
  recordSubmit(fg: FormGroup, i) {
    if (fg.value.ID === 0) {
      this.lessonService.addLesson(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ ID: res.id });
          // this.showNotification('insert');
          this.pnotifyService.success('Đã thêm chương ' + ' thành công');
          this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
            this.lessons = rs;
          });
          this.LessonForms.removeAt(i);
          this.addLessonForm('target');
        }, error => {
          this.pnotifyService.error('Xảy ra lỗi');
        });
    } else {
      this.update.value.Name = fg.value.Name;
      this.lessonService.UpdateLesson(fg.value.ID , this.update.value).subscribe(
        (res: any) => {
          // this.showNotification('update');
          this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
            this.lessons = rs;
          });
        });
    }
  }

  itemCreated($event) {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
      console.log(this.lessons);
    });
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, { class: 'modal-lg'});

 }
 showModal1() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl1, { class: 'modal-lg'});
}
showModal2() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl2, { class: 'modal-lg'});
}

deleteChapter(item) {
  this.alertify.confirm('Bạn có muốn xoá đề thi ' + item.name + ' ?' , () => {
    this.itemService.deleteItem(item.id).subscribe(() => {
      this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
        this.lessons = rs;
      });
      // this.redirectTo('course-category');
      this.pnotifyService.success('Bài học được xóa thành công');
    }, error => {
      this.pnotifyService.error('Lỗi hệ thống');
    });
  });
}

blockChapter(item) {
  item.status = 1;
  this.itemService.UpdateItem(item.id, item).subscribe(() => {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    // this.redirectTo('course-category');
    this.pnotifyService.success('Bài học đã đóng xuất bản');
  }, error => {
    this.pnotifyService.error('Lỗi hệ thống');
  });
}
openChapter(item) {
  item.status = 0;
  this.itemService.UpdateItem(item.id, item).subscribe(() => {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    // this.redirectTo('course-category');
    this.pnotifyService.success('Bài học đã mở xuất bản');
  }, error => {
    this.pnotifyService.error('Lỗi hệ thống');
  });
}

previewChapter(item) {
  item.preview = 1;
  this.itemService.UpdateItem(item.id, item).subscribe(() => {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    // this.redirectTo('course-category');
    this.pnotifyService.success('Bài học được mở xem trước');
  }, error => {
    this.pnotifyService.error('Lỗi hệ thống');
  });
}

OffpreviewChapter(item) {
  item.preview = 0;
  this.itemService.UpdateItem(item.id, item).subscribe(() => {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    // this.redirectTo('course-category');
    this.pnotifyService.success('Bài học đã đóng xem trước ');
  }, error => {
    this.pnotifyService.error('Lỗi hệ thống');
  });
}

}
