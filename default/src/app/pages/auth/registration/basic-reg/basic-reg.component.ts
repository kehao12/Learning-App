import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../../app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../../app/_services/alertify.service';
import { User } from '../../../../../app/_models/user';
import { BsDatepickerConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {
  registerForm: FormGroup;
  user: User;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Đăng ký thành công');
      }, error => {
        this.alertify.error('Tài khoản đã tồn tại');
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      });
    }
  }

  cancel() {
    this.router.navigate(['/authentication/login']);
  }

}
