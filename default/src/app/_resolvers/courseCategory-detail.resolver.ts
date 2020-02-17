import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CourseCategory } from '../_models/coursecategory';
import { CourseCategoryService } from '../_services/courseCategory.service';

@Injectable()
export class CourseCategoryDetailResolver implements Resolve<CourseCategory> {
    constructor(private courseCateService: CourseCategoryService, private router: Router,
        private alertify: AlertifyService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<CourseCategory> {
        return this.courseCateService.getCourseCategory(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Fail Retrieving Data');
                this.router.navigate(['/course-category']);
                return of(null);
            })
        );
    }
}
