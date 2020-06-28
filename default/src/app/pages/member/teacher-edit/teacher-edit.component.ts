import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../app/_models/user';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CustomValidateService } from '../../../../app/_services/custom-validate.service';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Photo } from '../../../../app/_models/photo';
import { UserService } from '../../../../app/_services/user.service';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-teacher-edit',
  templateUrl: './teacher-edit.component.html',
  styleUrls: ['./teacher-edit.component.scss']
})
export class TeacherEditComponent implements OnInit {

  @Input() user;
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemUpdateMdl', { static: false}) itemUpdateMdl: ElementRef;
  @ViewChild('editForm',  { static: true }) editForm: NgForm;
  previewUrl: any;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  file: File;
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private customValidator: CustomValidateService,
    private userService: UserService,
    private pnotifyService: PNotifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemUpdateMdl, {backdrop: 'static', keyboard: false, class: 'modal-lg'});
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.user.id + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.previewUrl = photo.url;
      }
    };
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      // this.AddForm.get('file').setValue(this.file);
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

    updateUser(ID) {
      this.userService.updateUser(ID, this.user ).subscribe(next => {
        this.bsModalRef.hide();
        this.itemCreated.emit();
        this.pnotifyService.success('Bạn vừa sửa  ' + ' thành công');
      }, error => {
        // this.pnotifyService.error('Danh mục đã tồn tại');
      });
    }

}

