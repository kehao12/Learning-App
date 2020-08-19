import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
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

@Component({
  selector: 'app-student-modal',
  templateUrl: './student-modal.component.html',
  styleUrls: ['./student-modal.component.scss']
})
export class StudentModalComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  registerForm: FormGroup;
  user: User;
  GenderControl: any = [{value: 'male', display: 'Nam'}, {value: 'female', display: 'Nữ'}];
  bsConfig: Partial<BsDatepickerConfig>;
  dateNow: Date;
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private customValidator: CustomValidateService) { }

  ngOnInit() {
    this.dateNow = new Date;
    // this.dateNow = this.dateNow.setFullYear(2012, 1, 1);
    this.createRegisterForm();

  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: true,
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
      }
    };
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, {backdrop: 'static', keyboard: false, class: 'modal-lg'});
  }
 createRegisterForm() {
  this.registerForm = this.fb.group({
    gender: ['male', Validators.required],
    username: ['user123', Validators.required, 
    this.customValidator.validateUserName.bind(this.customValidator), Validators.minLength(4),
     Validators.maxLength(20)],
    knownAs: ['user123', Validators.required],
    dateOfBirth: ['11/11/1997', [Validators.required]],
    city: ['HCM', Validators.required],
    country: ['VIET NAM', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
    lastname: ['LÊ',  [Validators.required, Validators.minLength(2),
    Validators.maxLength(20)]],
    firstname: ['KẾ HÀO', [Validators.required,  Validators.minLength(4),
      Validators.maxLength(30)]],
    address: ['12/43 Hoà bình, Quận 11', Validators.required],
    phone: ['01234567890', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['user123@gmail.com', [Validators.required, Validators.email, Validators.minLength(4),
      Validators.maxLength(30)]],
    position: 1
  }, {validator: this.passwordMatchValidator});
}

passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
}

register() {
  console.log('av');
    console.log(this.registerForm.value);
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.registerTable(this.user).subscribe(() => {
      this.alertify.success('Đăng ký thành công');
      this.itemCreated.emit();
      this.bsModalRef.hide();
    }, error => {
      this.alertify.error('Xảy ra lỗi');
    });
}
}
