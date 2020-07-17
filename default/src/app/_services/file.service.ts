import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Files } from '../_models/file';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getFiles(): Observable<Files[]> {
  return this.http.get<Files[]>(this.baseUrl + 'file/', httpOptions );
  }
  addFile(model: any) {
    return this.http.post(this.baseUrl + 'file/', model, httpOptions);
  }
  addFileExam(model: any) {
    return this.http.post(this.baseUrl + 'file/AddExam/', model, httpOptions);
  }
  UpdateLesson(id, model: any) {
    return this.http.put(this.baseUrl + 'file/' + id, model , httpOptions);
  }
}
