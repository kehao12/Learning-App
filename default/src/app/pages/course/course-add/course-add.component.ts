import { Component, OnInit, EventEmitter, Input, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Course } from '../../../../app/_models/course';
import { CourseService } from '../../../../app/_services/course.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CourseCategory } from '../../../../app/_models/coursecategory';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  @Input() listCourseCate: CourseCategory[];
  AddForm: FormGroup;
  uploader: FileUploader;
  Course: Course;
  file: File;

  previewUrl: any = null;
  constructor(private fb: FormBuilder, private courseService: CourseService,
    private alertify: AlertifyService) { }

  ngOnInit() {

    this.createAddForm();
  }
  createAddForm() {
    this.AddForm = this.fb.group({
      name: ['abca', Validators.required],
      alias: ['', Validators.required],
      status: true,
      courseCategoryID: 37,
      file: '',
      price: null,


    });
  }

  AddCourse() {
    const formData = new FormData();
    formData.append('file', this.AddForm.get('file').value);
    formData.append('name', this.AddForm.get('name').value);
    formData.append('status', this.AddForm.get('status').value);
    formData.append('courseCategoryID', this.AddForm.get('courseCategoryID').value);
    // this.Course = Object.assign({}, this.AddForm.value);
    // console.log(this.Course);
    this.courseService.addCourse(formData).subscribe(() => {
      this.alertify.success('Thêm thành công');
    }, error => {
      console.log(error);
      this.alertify.error(error);
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
