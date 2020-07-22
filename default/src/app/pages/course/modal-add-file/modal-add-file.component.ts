import { Component, OnInit, TemplateRef, Input, OnDestroy, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Course } from '../../../../app/_models/course';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { CourseAddComponent } from '../course-add/course-add.component';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { ItemService } from '../../../../app/_services/item.service';
import { Files } from '../../../../app/_models/file';
import { FileService } from '../../../../app/_services/file.service';
import { Item } from '../../../../app/_models/item';
import { LessonService } from '../../../../app/_services/lesson.service';
import { LessonListComponent } from '../../lesson/lesson-list/lesson-list.component';
import { Lesson } from '../../../../app/_models/lesson';
import { ExamService } from '../../../../app/_services/exam.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-modal-add-file',
  templateUrl: './modal-add-file.component.html',
  styleUrls: ['./modal-add-file.component.scss']
})
export class ModalAddFileComponent implements OnInit {
  @Input() lessons;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  @ViewChild('itemCreateMdl2', { static: false}) itemCreateMdl2: ElementRef;
  @ViewChild('itemCreateMdl1', { static: false}) itemCreateMdl1: ElementRef;
  AddForm: FormGroup;
  uploader: FileUploader;
  uploader1: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  idItem: number;
  file: Files;
  idFile: number;
  fileUpdate: Files;
  updatefile: FormGroup;
  items: Item[];
  lesson: Lesson;
  exams: any[];
  Item: any;
  lessonId: any;
  i: any;
  url: any;


  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService, private fb: FormBuilder, private itemService: ItemService,
    private fileService: FileService, private bsModalRef: BsModalRef, private lessonService: LessonService,
    private examService: ExamService,  private dom: DomSanitizer
    ) { }

  ngOnInit() {
    this.examService.getExams().subscribe(rs => this.exams = rs);
    this.initializeUploader();
    // this.lessonService.getLessonByCourse(this.id).subscribe(rs => this.lessons = rs);
    // console.log(this.lessons);
    this.createAddForm();

  }
  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lessonId: [null , Validators.required],
      fileId: 0,
      testId: null,
    });
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, {class: 'modal-lg'});
 }

 showModal1() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl2, {class: 'modal-lg'});
}
showModal2() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl1, {class: 'modal-lg'});
}
 fileOverBase(e: any): void {
  this.hasBaseDropZoneOver = e;
}

initializeUploader() {
  this.uploader1 = new FileUploader({
    url: this.baseUrl + 'file/AddFile',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['image', 'pdf'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 100 * 1024 * 1024
  });
  this.uploader1.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      const res: Files = JSON.parse(response);
      this.idFile = res.id;
      this.url = this.dom.bypassSecurityTrustResourceUrl(res.url);
      console.log(this.idFile);
      console.log(this.url);
      this.pnotifyService.success('Đăng tải thành công!');
    }
  };

  this.uploader = new FileUploader({
    url: this.baseUrl + 'file/',
    authToken: 'Bearer ' + localStorage.getItem('token'),
    isHTML5: true,
    allowedFileType: ['video'],
    removeAfterUpload: true,
    autoUpload: false,
    maxFileSize: 100 * 1024 * 1024
  });
  this.uploader.onProgressItem = (progress: any) => {
    console.log(progress['progress']);
  };
  this.uploader.onSuccessItem = (item, response, status, headers) => {
    if (response) {
      const res: Files = JSON.parse(response);
      this.idFile = res.id;
      this.url = res.url;
      console.log(this.idFile);
      this.pnotifyService.success('Đăng tải thành công!');
    }
  };
}

AddItem() {
  console.log(this.idFile);
  this.AddForm.controls['fileId'].setValue(this.idFile);
  this.Item = Object.assign({}, this.AddForm.value);
  this.itemService.addItem(this.Item).subscribe((res: any) => {
    this.idItem = res.id;
    this.itemCreated.emit();
    this.bsModalRef.hide();
    this.createAddForm();
    this.url = null;
    this.pnotifyService.success('Thêm thành công!');
  });
}

submit1() {
  console.log(this.AddForm.value);
  this.Item = Object.assign({}, this.AddForm.value);
  this.fileService.addFileExam(this.Item).subscribe((res: any) => {
    this.idItem = res.id;
    this.itemCreated.emit();
    this.bsModalRef.hide();
    this.createAddForm();
    this.pnotifyService.success('Thêm thành công!');
  });
}
}
