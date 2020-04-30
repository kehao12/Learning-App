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
export class ItemService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) { }
getItems(): Observable<Item[]> {
  return this.http.get<Item[]>(this.baseUrl + 'item/', httpOptions );
  }

  getItem(id): Observable<Item> {
    return this.http.get<Item>(this.baseUrl + 'item/' + id, httpOptions);
    }

  getItemOfLesson(id): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl + 'item/getItemOfLesson/' + id, httpOptions);
  }

  addItem(model: any) {
    return this.http.post(this.baseUrl + 'item/', model, httpOptions);
  }

    UpdateItem(id, item: Item) {
      return this.http.put(this.baseUrl + 'item/' + id, item , httpOptions);
    }

    deleteItem(id: number) {
      return this.http.delete(this.baseUrl + 'item/' + id, httpOptions);
    }
}
