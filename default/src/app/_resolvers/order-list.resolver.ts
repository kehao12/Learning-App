import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../_models/course';
import { CourseService } from '../_services/course.service';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';

@Injectable()
export class OrderListResolver implements Resolve<Order[]> {


    constructor(private oderService: OrderService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Order[]> {
        return this.oderService.getOrders().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dasboard']);
                return of(null);
            })
        );
    }
}
