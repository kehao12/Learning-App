import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseCategory } from '../_models/coursecategory';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCourseCategories(): Observable<CourseCategory[]> {
  return this.http.get<CourseCategory[]>(this.baseUrl + 'coursecategories/', httpOptions );
  }

  getCourseCategory(id): Observable<CourseCategory> {
    return this.http.get<CourseCategory>(this.baseUrl + 'coursecategories/' + id, httpOptions);
    }

  addCourseCate(model: any) {
      return this.http.post(this.baseUrl + 'coursecategories/', model, httpOptions);
    }

    UpdateCourseCate(id, courseCategory: CourseCategory) {
      return this.http.put(this.baseUrl + 'coursecategories/' + id, courseCategory , httpOptions);
    }
}
