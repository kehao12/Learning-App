import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = 'http://localhost:5000/api/';
  url = {
    users: `${this.baseUrl}users/GetUserAll`,

  };

}
