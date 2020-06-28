import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../../../app/_models/user';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent implements OnInit {

  @Output() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];
  result: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    const groups = new Set(this.roles.map(item => item.group));
    this.result = [];

    groups.forEach(g => this.result.push({
    name: g,
    values: this.roles.filter(i => i.group === g),
  }
  ));
  }

  CheckAllOptions() {
    if (this.roles.every(val => val.checked === true)) {
      this.roles.forEach(val => { val.checked = false; });
    } else {
      this.roles.forEach(val => { val.checked = true; });
    }
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
