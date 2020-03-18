import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CourseCategory } from '../_models/coursecategory';
import { CourseService } from '../_services/course.service';
import { Course } from '../_models/course';

@Injectable()
export class CourseDetailResolver implements Resolve<Course> {
    constructor(private courseService: CourseService, private router: Router,
        private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Course> {
        return this.courseService.getCourse(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Fail Retrieving Data');
                this.router.navigate(['/course']);
                return of(null);
            })
        );
    }
}
