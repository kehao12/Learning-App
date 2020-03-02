import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Course } from '../../../../app/_models/course';
import { CourseCategory } from '../../../../app/_models/coursecategory';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  listCourseCate: CourseCategory[];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  @Input() dialogClass: string;
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  public visible = false;
  public visibleAnimate = false;
  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courses = data['Courses'];
    });
    this.route.data.subscribe(data => {
      this.listCourseCate = data['listCourseCate'];
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 15,
      orderCellsTop: true,
      processing: true,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.20/i18n/Vietnamese.json'
      }
    };

  }

  refeshList() {
    this.courseService.getCourses().subscribe(data => this.courses = data);
    console.log(this.courses);
  }



  deleteCourse(id, input) {

  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
