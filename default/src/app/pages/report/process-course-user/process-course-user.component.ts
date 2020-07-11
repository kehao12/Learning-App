import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../../../../app/_services/lesson.service';
import { RolesService } from '../../../../app/_services/roles.service';

@Component({
  selector: 'app-process-course-user',
  templateUrl: './process-course-user.component.html',
  styleUrls: ['./process-course-user.component.scss']
})
export class ProcessCourseUserComponent implements OnInit {
  idCourse: any;
  idUser: any;
  lesson: any[];
  item: any[];
  course: any;
  constructor(private courseService: CourseService, private route: ActivatedRoute,
    private lessonService: LessonService, private roleService: RolesService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCourse = Number.parseInt(params['idCourse']);
    });
    this.route.params.subscribe(params => {
      this.idUser = Number.parseInt(params['idUser']);
    });

    this.lessonService.getLessonByCourse(this.idCourse).subscribe(rs => {
      this.lesson = rs;
      this.courseService.getProcessUserCourse(this.idCourse, this.idUser).subscribe(res => {
        this.item = res;
         this.lesson.forEach(ele => {
        for (let i = 0; i < ele.items.length; i++) {
          let isMatch = false;
          for (let j = 0; j < this.item.length; j++) {
            console.log(ele.items[i].id);
            console.log(this.item[j].id);
            if (ele.items[i].id === this.item[j].id) {
              console.log('true' + ele.items[i].id);
              isMatch = true;
              ele.items[i].checked = 'Hoàn thành';
              ele.items[i].createAt = this.item[j].createAt;
              ele.items[i].timeAt = this.item[j].timeAt;
              break;
            }
          }
          if (!isMatch) {
            console.log('false' + ele.items[i].id);
            ele.items[i].checked = 'Chưa hoàn thành';
          }
        }
      });
      });
     console.log(this.lesson);

    });


  }

}
