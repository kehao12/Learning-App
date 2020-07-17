import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'order/', httpOptions);
  }

  getOrder(id): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'order/' + id , httpOptions);
  }


  addOrder(model: any) {
      return this.http.post(this.baseUrl + 'order/', model , httpOptions);
    }

  addOrderDetail(courseId: {}) {
    return this.http.post(this.baseUrl + 'order/OrderDetail/', courseId, httpOptions);
  }

  UpdateOrder(id, model) {
    return this.http.put(this.baseUrl + 'order/' + id, model , httpOptions);
  }
  sendMail(model: any) {
    return this.http.post(this.baseUrl + 'order/SendMail', model , httpOptions);
  }



}
