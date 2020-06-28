import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../app/_models/user';
import { UserService } from '../../../../app/_services/user.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  users: User[];
  modalRef: BsModalRef;
  title = 'angulardatatables';
  dtOptions: DataTables.Settings = {};
  constructor( private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.users = data['students'].result;
    //   console.log(this.users);
    // });
    this.userService.getStudent().subscribe(rs => this.users = rs);

  }

  itemCreated() {
    this.userService.getStudent().subscribe(rs => this.users = rs);
 }


}
