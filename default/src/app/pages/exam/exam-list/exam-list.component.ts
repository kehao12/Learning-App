import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../../../app/_services/exam.service';
import { FileService } from '../../../../app/_services/file.service';
import { PNotifyService } from '../../../../app/_services/pnotify.service';
import { AlertifyService } from '../../../../app/_services/alertify.service';

@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  exams: any[];
  files: any[];
  constructor(private examService: ExamService, private fileService: FileService,
    private pnotify: PNotifyService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.examService.getExams().subscribe(rs => this.exams = rs);
    this.fileService.getFiles().subscribe(rs => this.files = rs);
  }

  ExistExam(id) {
    let a = false;
      this.files.forEach(ele => {
        if (ele.testId == id) {
          a = true;
        }
      });
    return a;
  }

  deleteExam(ex) {
    this.alertify.confirm('Bạn có muốn xoá đề thi ' + ex.name + ' ?' , () => {
      this.examService.deleteExam(ex.id).subscribe(() => {
        this.examService.getExams().subscribe(res => this.exams = res);
        // this.redirectTo('course-category');
        this.pnotify.success('Đề thi được xóa thành công');
      }, error => {
        this.pnotify.error('Lỗi hệ thống');
      });
    });
  }
}
