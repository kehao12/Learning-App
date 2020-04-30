import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../app/_services/lesson.service';
import { Lesson } from '../../../../app/_models/lesson';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private lessonService: LessonService, private courseService: CourseService ) { }
  id: number;
  isCollapsed = false;
  lessons: Lesson[];
  countlesson: number;
  course: Course;
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
    this.lessonService.countLesson(this.id).subscribe(rs => this.countlesson = rs);
  }

  itemCreated() {
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });
  }

}
