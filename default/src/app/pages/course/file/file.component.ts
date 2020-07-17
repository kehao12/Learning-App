import { Component, OnInit, TemplateRef, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  @ViewChild('itemCreateMdl1', { static: false}) itemCreateMdl1: ElementRef;
  @ViewChild('itemCreateMdl2', { static: false}) itemCreateMdl2: ElementRef;
  listcourse: Course[];
  Item: Item;
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
  id: number;
  lesson: Lesson;
  exams: any[];
  constructor(private courseService: CourseService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router, private modalService: BsModalService,
    private pnotifyService: PNotifyService, private fb: FormBuilder, private itemService: ItemService,
    private fileService: FileService, private bsModalRef: BsModalRef, private lessonService: LessonService,
    private examService: ExamService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
    });
    this.examService.getExams().subscribe(rs => this.exams = rs);
    this.courseService.getCourses().subscribe(rs => this.listcourse = rs);
    this.initializeUploader();
    this.createAddForm();
    this.lessonService.getLesson(this.id).subscribe(rs => this.lesson = rs);
    this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
    this.updatefile = this.fb.group({
      itemId: null
    });
  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, { class: 'modal-lg'});
    this.createAddForm();
 }
 showModal1() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl1, { class: 'modal-lg'});
  this.createAddForm();
}
showModal2() {
  this.bsModalRef = this.modalService.show(this.itemCreateMdl2, { class: 'modal-lg'});

}
  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['abc', Validators.required],
      description: '',
      lessonId: this.id,
      fileId: 0,
      testId: null
    });
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
        console.log(this.idFile);
        this.pnotifyService.success('Đăng tải thành công!');
      }
    };
  }
  submit() {
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
      this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
      this.bsModalRef.hide();
      this.pnotifyService.success('Thêm thành công!');
    });
  }

  submit1() {
    console.log(this.AddForm.value);
    this.Item = Object.assign({}, this.AddForm.value);
    this.fileService.addFileExam(this.Item).subscribe((res: any) => {
      this.idItem = res.id;
      this.itemService.getItemOfLesson(this.id).subscribe(rs => this.items = rs);
      this.bsModalRef.hide();
      this.pnotifyService.success('Thêm thành công!');
    });
  }


}
