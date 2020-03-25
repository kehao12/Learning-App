import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from '../../../../app/_services/user.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../app/_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../app/_services/auth.service';
import { Pagination, PaginatedResult } from '../../../../app/_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  registerForm: FormGroup;
  user: User = JSON.parse(localStorage.getItem('user'));
  users: User[];
  modalRef: BsModalRef;
  bsConfig: Partial<BsDatepickerConfig>;
  pagination: Pagination;
  userParams: any = {};
  genderList = [{value: 'male', display: 'Nam'}, {value: 'female', display: 'Nữ'}];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService,
    private fb: FormBuilder, private authService: AuthService ) {}

  ngOnInit() {
    this.createRegisterForm();
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.gender = 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  itemCreated() {
    this.userService.getUsers().subscribe();
 }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
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
      });
    }
  }

  resetFilters() {
    this.userParams.gender = 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }
}
