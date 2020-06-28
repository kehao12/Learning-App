import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Code } from '../_models/code';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CodeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCodes(): Observable<Code[]> {
    return this.http.get<Code[]>(this.baseUrl + 'code/', httpOptions);
  }

  getCode(id): Observable<Code> {
    return this.http.get<Code>(this.baseUrl + 'code/' + id , httpOptions);
  }
  sentCode(model: any) {
    return this.http.post(this.baseUrl + 'code/ActiveCode', model, httpOptions);
  }
  generateCode(model: any) {
    return this.http.post(this.baseUrl + 'code/', model, httpOptions);
  }

}
