import { Component, OnInit, TemplateRef } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Course } from '../../../../app/_models/course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  modalRef: BsModalRef;
  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.courses = data['Courses'];
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

    console.log(this.courses);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static', });
  }

  deleteCourse(id, input) {

  }

}
