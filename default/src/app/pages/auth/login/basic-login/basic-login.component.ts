import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../_services/auth.service';
import { AlertifyService } from '../../../../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
  }

  login() {
    this.authService.login(this.model).subscribe( next => {
      this.alertify.success('Đăng nhập thành công');
    }, error => {
      this.alertify.error('Tài khoản hoặc mật khẩu không đúng.');
    }, () => { this.router.navigate(['/dashboard']);
    });

  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.success('Đăng xuất thành công');
    this.router.navigate(['login']);
  }
}
