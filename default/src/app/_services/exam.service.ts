import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../_models/item';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class ExamService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getQuestions() {
  return this.http.get<[]>(this.baseUrl + 'exam/', httpOptions );
  }

  getQuestion(id) {
    return this.http.get(this.baseUrl + 'exam/' + id, httpOptions);
    }

  // getItemOfLesson(id): Observable<Item[]> {
  //   return this.http.get<Item[]>(this.baseUrl + 'item/getItemOfLesson/' + id, httpOptions);
  // }
  getExam(id) {
    return this.http.get(this.baseUrl + 'exam/getExam/' + id, httpOptions);
  }

  getExams() {
    return this.http.get<[]>(this.baseUrl + 'exam/getExams/', httpOptions);
  }

  addQuestion(model: any) {
    return this.http.post(this.baseUrl + 'exam/', model, httpOptions);
  }

  addExam(model: any) {
    return this.http.post(this.baseUrl + 'exam/CreateExam/', model, httpOptions);
  }

    UpdateQuestion(id, model) {
      return this.http.put(this.baseUrl + 'exam/' + id, model , httpOptions);
    }

    UpdateExam(id, model) {
      return this.http.put(this.baseUrl + 'exam/UpdateExam/' + id, model , httpOptions);
    }

    deleteExam(id: number) {
      return this.http.delete(this.baseUrl + 'exam/' + id, httpOptions);
    }
}
