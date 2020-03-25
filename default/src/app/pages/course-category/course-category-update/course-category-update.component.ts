import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Input } from '@angular/core';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { NgForm } from '@angular/forms';
import { CommonService } from '../../../../app/_services/common.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-course-category-update',
  templateUrl: './course-category-update.component.html',
  styleUrls: ['./course-category-update.component.scss']
})
export class CourseCategoryUpdateComponent implements OnInit {
  @Input() courseCategory;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  @ViewChild('editForm',  { static: true }) editForm: NgForm;
  courseCate: CourseCategory;
  listcourseCate: CourseCategory[];
  constructor(private CourseCateService: CourseCategoryService, private router: Router, private route: ActivatedRoute
    , private alertify: AlertifyService, private commonService: CommonService,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.courseCate = this.courseCategory;
    this.CourseCateService.getCourseCategories().subscribe(data => this.listcourseCate = data);
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl);
 }
  updateCourseCate(ID) {
    this.CourseCateService.UpdateCourseCate(ID, this.courseCate).subscribe(next => {
      this.bsModalRef.hide();
      this.itemCreated.emit();
      this.pnotifyService.success('Bạn vừa thêm danh mục ' + ' thành công');
      this.editForm.reset(this.courseCate);
    }, error => {
      this.pnotifyService.error('Danh mục đã tồn tại');
    });
  }

  GetSeoTitle(input) {
    this.courseCate.Alias = this.commonService.getSeoTitle(input);
    console.log(input);
    console.log(this.courseCate.Alias);
  }
}
