import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../app/_models/user';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { CustomValidateService } from '../../../../app/_services/custom-validate.service';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.scss']
})
export class TeacherModalComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  @ViewChild('itemCreateMdl', { static: false}) itemCreateMdl: ElementRef;
  registerForm: FormGroup;
  user: User;
  GenderControl: any = [{value: 'male', display: 'Nam'}, {value: 'female', display: 'Nữ'}];
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder,
    private modalService: BsModalService, private bsModalRef: BsModalRef,
    private customValidator: CustomValidateService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  showModal() {
    this.bsModalRef = this.modalService.show(this.itemCreateMdl, {backdrop: 'static', keyboard: false, class: 'modal-lg'});
 }
 createRegisterForm() {
  this.registerForm = this.fb.group({
        gender: ['male', Validators.required],
    username: ['', [Validators.required, Validators.minLength(4),
    Validators.maxLength(20),
    this.customValidator.validateUserName.bind(this.customValidator)]],
    knownAs: ['', Validators.required],
    dateOfBirth: ['11/11/1997', [Validators.required]],
    introduction: ['', Validators.required],
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
      Validators.maxLength(30)], this.customValidator.validateEmail.bind(this.customValidator)],
    position: 2
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
      this.alertify.success('Đăng ký thành công');
    });
}
}
