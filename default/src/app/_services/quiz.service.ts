import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable()
export class QuizService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(this.baseUrl + 'values/', httpOptions);
  }

  getAll() {

  }

}
