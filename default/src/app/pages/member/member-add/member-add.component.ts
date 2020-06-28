import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { User } from '../../../../app/_models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { UserService } from '../../../../app/_services/user.service';

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
    private alertify: AlertifyService, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createRegisterForm();
    this.bsConfig =  Object.assign({}, { containerClass: 'theme-red' });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male', Validators.required],
      username: ['user123', Validators.required],
      knownAs: ['user123', Validators.required],
      dateOfBirth: ['11/11/1997', Validators.required],
      city: ['HCM', Validators.required],
      country: ['VIET NAM', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      lastname: ['KẾ HÀO', Validators.required],
      firstname: ['LÊ', Validators.required],
      address: ['12/43 Hoà bình, Quận 11', Validators.required],
      phone: ['01234567890', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      email: ['user123@gmail.com', Validators.required]
    }, {validator: this.passwordMatchValidator,
        checkUserName: this.checkUserName});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }
  checkUserName(g: FormGroup) {
    let users: User[];
    this.userService.getUserAll().subscribe(rs => {
      users = rs;
      users.forEach(user => {
        return g.get('username').value === user.username ? {'check': true } : null;
      });
    });

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
