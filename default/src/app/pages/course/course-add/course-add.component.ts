import { Component, OnInit, EventEmitter, Input, Inject, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Course } from '../../../../app/_models/course';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategory } from '../../../../app/_models/coursecategory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { CourseCategoryService } from '../../../../app/_services/courseCategory.service';
import { Lesson } from '../../../../app/_models/lesson';
import { Lesson1 } from '../../../../app/_models/CLesson';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit, OnDestroy {
  public editorValue = '';
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;

  AddForm: FormGroup;
  uploader: FileUploader;
  Course: Course;
  file: File;
  courseCate: CourseCategory[];
  lesson = new Lesson1;
  dataarray = [];
  previewUrl: any = null;
  sub: any;
  constructor(private fb: FormBuilder, private courseService: CourseService, private CourseCateService: CourseCategoryService,
    private alertify: AlertifyService,  private modalService: BsModalService, private bsModalRef: BsModalRef,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.sub = this.CourseCateService.getCourseCategories().subscribe(data => this.courseCate = data);
    this.createAddForm();
  }

  // get formArr() {
  //   return this.AddForm.get('itemRows') as FormArray;
  // }

  // initItemRow() {
  //   return this.fb.group({
  //     ID: [''],
  //     Name: [''],
  //     CourseId: [''],
  //   });
  // }

  // addNewRow() {
  //   this.formArr.push(this.initItemRow());
  // }

  // deleteRow(index: number) {
  //   this.formArr.removeAt(index);
  // }


  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['abc', Validators.required],
      alias: ['abc', Validators.required],
      status: true,
      courseCategoryID: null,
      file: '',
      price: 0,
      description: 'sada'
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.sub.unsubscribe();

  }
  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, { class: 'modal-lg'});
    this.createAddForm();
 }
  AddCourse() {
    const formData = new FormData();
    formData.append('file', this.AddForm.get('file').value);
    formData.append('name', this.AddForm.get('name').value);
    formData.append('status', this.AddForm.get('status').value);
    formData.append('alias', this.AddForm.get('alias').value);
    formData.append('price', this.AddForm.get('price').value);
    formData.append('description', this.AddForm.get('description').value);
    formData.append('courseCategoryID', this.AddForm.get('courseCategoryID').value);
    // this.Course = Object.assign({}, this.AddForm.value);
    // console.log(this.Course);
    this.courseService.addCourse(formData).subscribe(res => {
      this.bsModalRef.hide();
      this.itemCreated.emit();
      this.pnotifyService.success('Bạn vừa thêm danh mục ' + name + ' thành công');
    }, error => {
      this.pnotifyService.error('Danh mục đã tồn tại');
    });
  }
  // changeListener($event): void {
  //   this.postFile($event.target);
  // }
  // postFile(inputValue: any): void {
  //   this.AddForm = this.fb.group({
  //     name: ['abca', Validators.required],
  //     status: true,
  //     courseCategoryID: 37,
  //     file: inputValue.files[0]
  //   });
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.AddForm.get('file').setValue(this.file);
      this.preview();
    }
  }
    preview() {
      // Show preview
      const mimeType = this.file.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (_event) => {
        this.previewUrl = reader.result;
      };
    }
}
