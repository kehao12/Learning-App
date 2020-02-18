import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
  return this.http.get<Course[]>(this.baseUrl + 'courses/', httpOptions );
  }

  getCourse(id): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + 'courses/' + id, httpOptions);
    }

  addCourse(model: any) {
      return this.http.post(this.baseUrl + 'courses/', model, httpOptions);
    }

}
