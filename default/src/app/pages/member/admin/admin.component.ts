import { Component, OnInit } from '@angular/core';
import { User } from '../../../../app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../app/_services/user.service';
import { RolesService } from '../../../../app/_services/roles.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';
import { PNotifyService } from '../../../../app/_services/pnotify.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  roleAll: any[];
  roleTempt: any[];
  searchText;
  constructor( private route: ActivatedRoute, private userService: UserService,
    private roleService: RolesService,
    private modalService: BsModalService, private pnotifyService: PNotifyService) { }


  ngOnInit() {
    this.roleService.getRoles().subscribe(rs => {
      this.roleAll = rs;
    });
    this.userService.getAdmin().subscribe(rs => this.users = rs);
  }

  itemCreated() {
    this.userService.getAdmin().subscribe(rs => this.users = rs);
 }


editRolesModal(user) {
  console.log(user.user);
  const initialState = {
    user: user.user,
    roles: this.getRolesArray(user)
  };
  this.bsModalRef = this.modalService.show(RolesModalComponent, {class: 'modal-lg', initialState});
  this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
    const rolesToUpdate = {
      roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
    };
    if (rolesToUpdate) {
      console.log(user.user);
      this.roleService.updateUserRoles(user.user, rolesToUpdate).subscribe(() => {
        user.roles = [...rolesToUpdate.roleNames];
        this.pnotifyService.success('Cập nhật thành công');
      }, error => {
        console.log(error);
      });
    }
  });
}

private getRolesArray(user) {
  const roles = [];
  const userRoles = user.roles;

  const availableRoles: any[] = this.roleAll;
  console.log(availableRoles);
  console.log('abc');
  console.log(userRoles);


  // console.log('abc:');
  // console.log(availableRoles);
  for (let i = 0; i < availableRoles.length; i++) {
    let isMatch = false;
    for (let j = 0; j < userRoles.length; j++) {
      if (availableRoles[i].name === userRoles[j]) {
        isMatch = true;
        availableRoles[i].checked = true;
        roles.push(availableRoles[i]);
        break;
      }
    }
    if (!isMatch) {

      availableRoles[i].checked = false;
      roles.push(availableRoles[i]);
    }
  }
  return roles;
}

}
