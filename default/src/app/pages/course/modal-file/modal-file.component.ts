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
  selector: 'app-modal-file',
  templateUrl: './modal-file.component.html',
  styleUrls: ['./modal-file.component.scss']
})
export class ModalFileComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  @Input() item;
  @Input() lessons;
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  @ViewChild('itemUpdateMdl1', { static: false}) itemUpdateMdl1: ElementRef;
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
  exam: any;

  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService, private fb: FormBuilder, private itemService: ItemService,
    private fileService: FileService, private bsModalRef: BsModalRef, private lessonService: LessonService,
    private examService: ExamService, private dom: DomSanitizer
    ) { }

  ngOnInit() {
    if (this.item.files.typeId == 3) {
      this.examService.getExams().subscribe(rs => {
        this.exams = rs;
        this.exams.forEach(element => {
          this.i = this.i + 1;
          if (element.id == this.item.files.testId) {
            this.exam = element.id;
          }
        });
      });
    }
    
    this.initializeUploader();
    // this.lessonService.getLessonByCourse(this.id).subscribe(rs => this.lessons = rs);
    // console.log(this.lessons);
    console.log(this.item);
    this.lessons.forEach(element => {
      this.i = this.i + 1;
      if (element.id == this.item.lessonId) {
        this.lessonId = element.id;
      }
    });
    if (this.item.files.typeId == 2) {
      this.url = this.dom.bypassSecurityTrustResourceUrl(this.item.files.url);
    }
    // this.lessonId = this.item.lessonId;
  }
  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['', Validators.required],
      description: '',
      lessonId: 17,
      fileId: 0,
      testId: null,
      lesssonId: null
    });
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl, {class: 'modal-lg'});
 }
 showModal1() {
  this.bsModalRef = this.modalService.show(this.itemUpdateMdl1, {class: 'modal-lg'});
}
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader1 = new FileUploader({
      url: this.baseUrl + 'file/AddFile',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['pdf', 'ppt', 'pptx'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader1.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Files = JSON.parse(response);
        this.idFile = res.id;
        console.log(this.idFile);
        this.url = this.dom.bypassSecurityTrustResourceUrl(res.url);
        if (this.item) {
          this.item.files.url = res.url;
          this.item.fileId = res.id;
        }
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
        if (this.item) {
          this.item.files.url = res.url;
          this.item.fileId = res.id;
        }
        console.log(this.idFile);
        this.pnotifyService.success('Đăng tải thành công!');
      }
    };
  }
  submit() {
    this.item.lessonId = this.lessonId;
    if (this.item.files.typeId == 3) {
      this.item.files.testId = this.exam;
    }
    this.itemService.UpdateItem(this.item.id, this.item).subscribe((res: any) => {
      // this.fileService.UpdateLesson(this.idFile, this.fileUpdate).subscribe(
      //   rsult => {
      //     this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
      //   }
      // );
      // this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
      this.itemCreated.emit();
      this.bsModalRef.hide();
      this.pnotifyService.success('Sửa thành công!');
    });
  }
  AddItem() {
    console.log(this.idFile);
    this.AddForm.controls['fileId'].setValue(this.idFile);
    this.Item = Object.assign({}, this.AddForm.value);
    this.itemService.addItem(this.Item).subscribe((res: any) => {
      this.idItem = res.id;
      // this.updatefile.controls['itemId'].setValue(this.idItem);
      // this.fileUpdate = Object.assign({}, this.updatefile.value);
      // console.log(this.idItem);
      // this.fileService.UpdateLesson(this.idFile, this.fileUpdate).subscribe(
      //   rsult => {
      //     this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
      //   }
      // );
      this.bsModalRef.hide();
      this.pnotifyService.success('Thêm thành công!');
    });
  }

  // submit1() {
  //   console.log(this.AddForm.value);
  //   this.Item = Object.assign({}, this.AddForm.value);
  //   this.fileService.addFileExam(this.Item).subscribe((res: any) => {
  //     this.idItem = res.id;
  //     this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
  //     this.bsModalRef.hide();
  //     this.pnotifyService.success('Thêm thành công!');
  //   });
  }



