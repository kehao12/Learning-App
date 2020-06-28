import { Component, OnInit } from '@angular/core';
import { User } from '../../../../app/_models/user';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { RolesService } from '../../../../app/_services/roles.service';
import { RolesModalComponent } from '../roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  bsModalRef: BsModalRef;
  roleAll: any[];
  roleTempt: any[];

  constructor(private roleService: RolesService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.roleService.getRoles().subscribe(rs => {
      this.roleAll = rs;
    });
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    // const availableRoles: any[] = [
    //   {name: 'Quản trị viên', value: 'Admin'},
    //   {name: 'Giảng viên', value: 'Moderator'},
    //   {name: 'Học viên', value: 'Member'},
    //   {name: 'VIP', value: 'VIP'},
    // ];

    this.roleService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;

    }, error => {
      console.log(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };

    this.bsModalRef = this.modalService.show(RolesModalComponent, {class: 'modal-lg', initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.roleService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
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
