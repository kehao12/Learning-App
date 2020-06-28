import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVenue(month) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetVenue/' + month);
  }

  getVenueOfToday(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/GetVenueToday/' + day + '/' + month + '/' + year);
  }
  countCourseOfToday(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/CountCourse/' + day + '/' + month + '/' + year);
  }
  countOrderOfToday(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/CountOrder/' + day + '/' + month + '/' + year);
  }

  // Thong ke don hang
  Top5CourseOrder(month) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseOrder/' + month );
  }

  Top5CourseOrderDay(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseOrderDay/' + day + '/' + month + '/' + year );
  }

  Top5CourseOrderYear(year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseOrderYear/' + year );
  }
  Top5CourseOrderRange(daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseOrderRange/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }

  // Thong ke doanh thu
  Top5CourseVenueDay(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseVenueDay/' + day + '/' + month + '/' + year);
  }
  Top5CourseVenue(month) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseVenue/' + month );
  }
  Top5CourseVenueYear(year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseVenueYear/' + year );
  }
  Top5CourseVenueRange(daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseVenueRange/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }


  // Thong ke review
  Top5CourseReviewDay(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseReviewDay/' + day + '/' + month + '/' + year);
  }
  Top5CourseReview(daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseReview/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }
  Top5CourseReviewMonth(month) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseReviewMonth/' + month );
  }
  Top5CourseReviewYear(year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseReviewYear/' + year );
  }

  // Thong ke rating
  Top5CourseRatingDay(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRatingDay/' + day + '/' + month + '/' + year);
  }
  Top5CourseRating(daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRating/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }
  Top5CourseRatingMonth(month) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRatingMonth/' + month );
  }
  Top5CourseRatingYear(year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRatingYear/' + year );
  }

  // Thong ke dang ky moi
  Top5CourseRegisterDay(day, month, year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRegisterDay/' + day + '/' + month + '/' + year);
  }
  Top5CourseRegister(daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRegister/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }
  Top5CourseRegisterMonth(month) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRegisterMonth/' + month );
  }
  Top5CourseRegisterYear(year) {
    return this.http.get(this.baseUrl + 'statistic/Top5CourseRegisterYear/' + year );
  }

}
