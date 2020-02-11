import { Component, OnInit, TemplateRef } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-member-lists',
  templateUrl: './member-lists.component.html',
  styleUrls: ['./member-lists.component.css']
})
export class MemberListsComponent implements OnInit {
  users: User[];
  model: any = {};
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: BsModalService, private authService: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.users = data['users'].result;
    });
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
    }, error => {
      this.alertify.error(error);
    });
  }

}
