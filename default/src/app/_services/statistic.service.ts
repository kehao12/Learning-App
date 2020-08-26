import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVenue(id, month) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetVenue/' + id + '/' + month);
  }
  getVenueYear(id, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetVenueYear/' + id + '/' + year);
  }
  getVenueDay(id, day, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetVenueDay/' + id + '/' + day + '/' + month + '/' + year);
  }
  GetVenueRange(id, daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetVenueRange/' + id + '/' + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }
  getCountOrderMonth(month, year) {
    return this.http.get(this.baseUrl + 'statistic/CountOrderMonth/' + month + '/' + year);
  }
  CountStudentMonth(month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/CountStudentMonth/' + month + '/' + year);
  }
  CountTeacherMonth(month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/CountTeacherMonth/' + month + '/' + year);
  }
  CountAdminMonth(month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/CountAdminMonth/' + month + '/' + year);
  }
  TimeStudyYear(id, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/TimeStudyYear/' + id + '/' + year);
  }
  TimeStudyDay(id, day, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/TimeStudyDay/' + id + '/' + day + '/' + month + '/' + year);
  }
  TimeStudyMonth(id, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/TimeStudyMonth/' + id + '/' + month + '/' + year);
  }
  StudentRegisterByCourseYear(id, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/StudentRegisterByCourseYear/' + id + '/' + year);
  }
  StudentRegisterByCourseDay(id, day, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/StudentRegisterByCourseDay/' + id + '/' + day + '/' + month + '/' + year);
  }
  StudentRegisterByCourseMonth(id, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/StudentRegisterByCourseMonth/' + id + '/' + month + '/' + year);
  }
  StudentRegisterByCourseRange(id, daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get<[]>(this.baseUrl + 'statistic/StudentRegisterByCourseRange/' + id + '/' + daystart + '/'
    + monthstart + '/' + yearstart + '/' + dayend + '/' + monthend + '/' + yearend);
  }
  ListStudentRegisterByCourseYear(id, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/ListStudentRegisterByCourseYear/' + id + '/' + year);
  }
  ListStudentRegisterByCourseDay(id, day, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/ListStudentRegisterByCourseDay/' + id + '/' + day + '/' + month + '/' + year);
  }
  ListStudentRegisterByCourseMonth(id, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/ListStudentRegisterByCourseMonth/' + id + '/' + month + '/' + year);
  }
  ListStudentRegisterByCourseRange(id, daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get<[]>(this.baseUrl + 'statistic/ListStudentRegisterByCourseRange/' + id + '/' + daystart + '/'
    + monthstart + '/' + yearstart + '/' + dayend + '/' + monthend + '/' + yearend);
  }
  GetStatisticOVenueMonth(month, year) {
    return this.http.get(this.baseUrl + 'statistic/GetStatisticOVenueMonth/' + month + '/' + year);
  }
  CountRegisterCourseOfMonth(month, year) {
    return this.http.get(this.baseUrl + 'statistic/CountRegisterCourseOfMonth/' + month + '/' + year);
  }
  GetStatisticVeneu() {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneu/');
  }
  GetStatisticVeneuYear(id, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneuYear/' + id + '/' + year);
  }
  GetStatisticVeneuDay(id, day, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneuDay/' + id + '/' + day + '/' + month + '/' + year);
  }
  GetStatisticVeneuMonth(id, month, year) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneuMonth/' + id + '/' + month + '/' + year);
  }
  GetStatisticVeneuRange(id, daystart, monthstart, yearstart, dayend, monthend, yearend) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneuRange/' + id + '/'
    + daystart + '/' + monthstart + '/' + yearstart + '/'
    + dayend + '/' + monthend + '/' + yearend);
  }
  GetStatisticVeneuCourse(id) {
    return this.http.get<[]>(this.baseUrl + 'statistic/GetStatisticVeneuCourse/' + id);
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

  countUser(month) {
    return this.http.get<[]>(this.baseUrl + 'statistic/CountUser/' + month);
  }
  sendMail(model: any) {
    return this.http.post(this.baseUrl + 'statistic/SendMail', model);
  }
}
