import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../_models/course';
import { map } from 'rxjs/operators';

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

  getMyCourses(userName): Observable<Course[]> {
    return this.getCourses().pipe(map(items =>
      items.filter((item: Course) => {
        if(item.createdBy === userName) {
           return item;
        }
      })
    ));
    }

  getCourse(id): Observable<Course> {
    return this.http.get<Course>(this.baseUrl + 'courses/' + id, httpOptions);
    }

    addCourse(model: any) {
      return this.http.post(this.baseUrl + 'courses/', model, httpOptions).pipe(
        map(res => res )
      );
    }

    addLesson(config: {}) {
      return this.http.post(this.baseUrl + 'courses/AddLesson/', config, httpOptions).pipe(
        map(res => res )
      );
    }

    addCourseUser(model) {
      return this.http.post(this.baseUrl + 'courses/AddUserCourseMutiple/', model);
    }


    UpdateCourse(id, model: any) {
      return this.http.put(this.baseUrl + 'courses/' + id, model , httpOptions);
    }

    deleteCourse(id: number) {
      return this.http.delete(this.baseUrl + 'courses/' + id, httpOptions);
    }


}
