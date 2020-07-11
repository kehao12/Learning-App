import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../app/_services/lesson.service';
import { Lesson } from '../../../../app/_models/lesson';
import { CourseService } from '../../../../app/_services/course.service';
import { Course } from '../../../../app/_models/course';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { RolesService } from '../../../../app/_services/roles.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Hoàn thành', 'Chưa hoàn thành'];
  public pieChartData: SingleDataSet = [2, 1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  form: FormGroup;
  constructor(private route: ActivatedRoute, private lessonService: LessonService,
    private courseService: CourseService, private userService: UserService, 
    private roleService: RolesService, private fb: FormBuilder ) { }
  id: number;
  isCollapsed = false;
  lessons: Lesson[];
  countlesson: number;
  users: User[];
  course: Course;
  students: User[];
  listStudent: any[];
  listStudentExist: any[];
  usercourse: User[];
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });

    this.userService.getUsersCourse(this.id).subscribe(rs => this.usercourse = rs );

    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });


    this.route.data.subscribe(data => {
      this.course = data['course'];
    });

    this.userService.getUserAll().subscribe(rs => this.users = rs);
    this.lessonService.countLesson(this.id).subscribe(rs => this.countlesson = rs);


  }

  itemCreated() {
    this.courseService.getCourse(this.id).subscribe(rs => this.course = rs);
    this.lessonService.getLessonByCourse(this.id).subscribe(rs => {
      this.lessons = rs;
    });

  }




}
