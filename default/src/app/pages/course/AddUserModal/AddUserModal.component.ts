import { Component, OnInit, Output, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { BsDatepickerConfig, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { state } from '@angular/animations';
import { CommonService } from '../../../../app/_services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { UserService } from '../../../../app/_services/user.service';
import { User } from '../../../../app/_models/user';
import { CourseService } from '../../../../app/_services/course.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './AddUserModal.component.html',
  styleUrls: ['./AddUserModal.component.scss']
})
export class AddUserModalComponent implements OnInit {
  @Input() course;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  bsConfig: Partial<BsDatepickerConfig>;
  form: FormGroup;
  students: User[];
  constructor(private router: Router
    , private alertify: AlertifyService, private fb: FormBuilder,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService, private userService: UserService,
    private courseService: CourseService) { }

  ngOnInit() {
    this.form = this.fb.group({
      userId: this.fb.array([], [Validators.required]),
      courseId: this.course.id,
    });
    this.userService.GetStudentNotRegister(this.course.id).subscribe(rs => {
      this.students = rs;
    });

  }
  refesh() {
    this.userService.GetStudentNotRegister(this.course.id).subscribe(rs => {
      this.students = rs;
    });
  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl);
 }

 onCheckboxChange(e) {
  const checkArray: FormArray = this.form.get('userId') as FormArray;
  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i = 0;
    checkArray.controls.forEach((item: FormControl) => {
      if (item.value === e.target.value) {
        checkArray.removeAt(i);
        return;
      }
      i++;
    });
  }
}

submitForm() {
  console.log(this.form.value);
      this.courseService.addCourseUser(Object.assign({}, this.form.value)).subscribe(res => {
        this.bsModalRef.hide();
        this.itemCreated.emit();
        this.refesh();
        this.pnotifyService.success('Bạn vừa thêm học viên vào khoá học ' + ' thành công');  
        this.form.reset();
      }, error => {
        this.pnotifyService.error('Học viên chưa được thêm vào khoá học');
      });
}

}
