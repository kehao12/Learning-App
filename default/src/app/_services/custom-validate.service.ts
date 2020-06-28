import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class CustomValidateService {

  constructor(private http: HttpClient, private api: ApiService) { }

  validateUserName(control: AbstractControl) {
    return this.checkUserName(control.value).pipe(
      map(res => {
        return res ? null : { userExist: true };
      })
    );
  }
  checkUserName(name: string): Observable<boolean> {
    console.log(name);
    return this.http.get(this.api.url.users).pipe(
      map((userList: User[]) =>
      userList.filter(u => u.username.toLowerCase() === name.toLowerCase())
      ),
      map(c => !c.length)
    );
  }
}
