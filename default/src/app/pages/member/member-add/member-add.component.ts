import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { User } from '../../../../app/_models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit {
  @Output() itemCreated = new EventEmitter<any>();
  registerForm: FormGroup;
  user: User;
  GenderControl: any = [{value: 'male', display: 'Nam'}, {value: 'female', display: 'Nữ'}];
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig =  Object.assign({}, { containerClass: 'theme-red' });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      username: ['abcabc', Validators.required],
      knownAs: ['abc', Validators.required],
      dateOfBirth: ['11/11/1997', Validators.required],
      city: ['abcas', Validators.required],
      country: ['sadsad', Validators.required],
      password: ['123456', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['123456', Validators.required],
      lastname: ['sadsd', Validators.required],
      firstname: ['sadsad', Validators.required],
      address: ['sdadsa', Validators.required],
      phone: ['01234567890', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email: ['sadsadsa@gmail.com', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    console.log('av');
      console.log(this.registerForm.value);
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Đăng ký thành công');
      }, error => {
        this.alertify.success('Đăng ký thành công');
      });
  }
}
