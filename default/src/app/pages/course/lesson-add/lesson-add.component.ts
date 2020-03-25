import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../app/_models/course';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../app/_services/lesson.service';
import { Lesson } from '../../../../app/_models/lesson';

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
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private lessonService: LessonService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
    console.log(this.id);
    this.addLessonForm();
    this.update = this.fb.group({
      Name: [''],
      CourseId: [this.id]
    });
  }

  addLessonForm() {
    this.LessonForms.push(this.fb.group({
        ID: [0],
        Name: ['', Validators.required],
        CourseId: [this.id]
    }));
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.ID === 0) {
      this.lessonService.addLesson(fg.value).subscribe(
        (res: any) => {
          fg.patchValue({ ID: res.id });
          this.showNotification('insert');
          this.addLessonForm();
        });
    } else {
      this.update.value.Name = fg.value.Name;
      this.lessonService.UpdateLesson(fg.value.ID , this.update.value).subscribe(
        (res: any) => {
          this.showNotification('update');
        });
    }
  }

  showNotification(category) {
    switch (category) {
      case 'insert':
        this.notification = { class: 'text-success', message: 'saved!' };
        break;
      case 'update':
        this.notification = { class: 'text-primary', message: 'updated!' };
        break;
      case 'delete':
        this.notification = { class: 'text-danger', message: 'deleted!' };
        break;

      default:
        break;
    }
    setTimeout(() => {
      this.notification = null;
    }, 3000);
  }
}

