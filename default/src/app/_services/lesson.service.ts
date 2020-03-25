import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Lesson } from '../_models/lesson';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getlessons(): Observable<Lesson[]> {
  return this.http.get<Lesson[]>(this.baseUrl + 'lessons/', httpOptions );
  }

  getLesson(id): Observable<Lesson> {
    return this.http.get<Lesson>(this.baseUrl + 'lessons/' + id, httpOptions);
    }

  getLessonByCourse(id): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.baseUrl + 'lessons/getLessonByCourse/' + id, httpOptions);
  }

  addLesson(model: any) {
      return this.http.post(this.baseUrl + 'lessons/', model, httpOptions);
    }

    UpdateLesson(id, lesson: Lesson) {
      return this.http.put(this.baseUrl + 'lessons/' + id, lesson , httpOptions);
    }

    deleteLesson(id: number) {
      return this.http.delete(this.baseUrl + 'lessons/' + id, httpOptions);
    }
}
