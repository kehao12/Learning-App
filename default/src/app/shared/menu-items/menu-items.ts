import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  role?: string[];
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  role?: string[];
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Quản trị',
    main: [
      {
        state: 'dashboard',
        short_label: 'D',
        name: 'Trang tổng quan',
        role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList', 'ViewMyCourse',
        'ViewReportRevenueCourse',
        'ViewReportStudentCourse', 'ViewReportProcessCourse',
        'CreatOrder', 'DeleteOrder', 'EditStatusOrder', 'ViewOrderList', 'ViewMyOrder', 'CreateCode',
        'EidtCode', 'AddAdmin', 'EditAdmin', 'ViewAdmin'],
        type: 'link',
        icon: 'ti-home'
      },
      // {
      //   state: 'role',
      //   short_label: 'D',
      //   name: 'Phân quyền',
      //   type: 'link',
      //   role: ['AddAdmin', 'EditAdmin', 'ViewAdmin'],
      //   icon: 'ti-settings',
      // },
      // {
      //   state: 'code',
      //   short_label: 'D',
      //   name: 'Mã kích hoạt',
      //   type: 'link',
      //   role: ['CreateCode', 'EidtCode'],
      //   icon: 'ti-gift',
      // },
      {
        state: 'member',
        short_label: 'B',
        name: 'Người dùng',
        type: 'sub',
        icon: 'ti-user',
        role: ['AddStudent', 'DeleteStudent', 'ViewStudentList',
        'ViewStudent', 'AddTeacher', 'DeleteTeacher', 'ViewTeacherList', 'ViewTeacher',
        'AddAdmin', 'EditAdmin', 'ViewAdmin'],
        children: [
          {
            state: 'student',
            name: 'Học viên',
            type: 'link',
            role: ['AddStudent', 'DeleteStudent', 'ViewStudentList', 'ViewStudent'],
          },
          {
            state: 'teacher',
            name: 'Giảng viên',
            type: 'link',
            role: ['AddTeacher', 'DeleteTeacher', 'ViewTeacherList', 'ViewTeacher'],
          },
          {
            state: 'admin',
            name: 'Quản trị',
            type: 'link',
            role: ['AddAdmin', 'EditAdmin', 'ViewAdmin'],
          },
        ]
      },
    ],
  },
  {
    label: 'Đào tạo',
    main: [
      {
        state: 'question-exam',
        short_label: 'D',
        name: 'Câu hỏi & đề thi',
        type: 'sub',
        role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList', 'ViewMyCourse'],
        icon: 'ti-folder',
        children: [
          {
            state: 'question',
            name: 'Ngân hàng câu hỏi',
            type: 'link',
            role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList'],
          },
          {
            state: 'exam',
            name: 'Ngân hàng đề thi',
            type: 'link',
            role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList', 'ViewMyCourse'],
          },
        ]
      },
      {
        state: 'course-category',
        short_label: 'D',
        name: 'Danh mục khoá học',
        type: 'link',
        role: ['CreateCategory', 'EditCategory', 'DeleteCategory'],
        icon: 'ti-folder'
      },
      {
        state: 'course',
        short_label: 'B',
        name: 'Khoá học',
        role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList', 'ViewMyCourse'],
        type: 'sub',
        icon: 'ti-book',
        children: [
          {
            state: 'list',
            name: 'Khoá học',
            type: 'link',
            role: ['CreateCourse', 'EditCourse', 'DeleteCourse', 'ViewCourse', 'ViewCourseList'],
          },
          {
            state: 'my-course',
            name: 'Khoá học của tôi',
            type: 'link',
            role: ['ViewMyCourse', 'CreateCourse', 'EditCourse', 'DeleteCourse'],
          },
        ]
      },
      {
        state: 'order',
        short_label: 'D',
        name: 'Giao dịch',
        type: 'sub',
        role: ['CreatOrder', 'DeleteOrder', 'EditStatusOrder', 'ViewOrderList', 'ViewMyOrder', 'CreateCode',
        'EidtCode'],
        icon: 'ti-shopping-cart',
        children: [
          {
            state: 'list',
            name: 'Lịch sử',
            type: 'link',
            role: ['CreatOrder', 'DeleteOrder', 'EditStatusOrder', 'ViewOrderList', 'ViewMyOrder', 'CreateCode',
            'EidtCode'],
          },
          // {
          //   state: 'code-active',
          //   name: 'Mã kích hoạt',
          //   type: 'link',
          //   role: ['AddAdmin', 'EditAdmin', 'ViewAdmin'],
          // },
        ]
      },
      {
        state: 'report',
        short_label: 'D',
        name: 'Báo cáo',
        type: 'sub',
        role: [  'ViewReportRevenueCourse',
        'ViewReportStudentCourse', 'ViewReportProcessCourse'],
        icon: 'ti-stats-up',
        children: [
          {
            state: 'order',
            name: 'Báo cáo khóa học',
            type: 'link',
            role: ['ViewReportRevenueCourse', 'ViewReportStudentCourse'],
          },
          {
            state: 'student',
            name: 'Báo cáo học viên',
            type: 'link',
            role: ['ViewReportStudentCourse'],
          },
          {
            state: 'venue',
            name: 'Báo cáo doanh thu',
            type: 'link',
            role: ['ViewReportRevenueCourse'],
          },
          {
            state: 'process',
            name: 'Báo cáo tiến độ học tập',
            type: 'link',
            role: ['ViewReportProcessCourse'],
          },
        ]
      },
    ]
  },

  // {
  //   label: 'Map And Extra Pages ',
  //   main: [
  //     {
  //       state: 'authentication',
  //       short_label: 'A',
  //       name: 'Authentication',
  //       type: 'sub',
  //       icon: 'ti-id-badge',
  //       children: [
  //         {
  //           state: 'login',
  //           type: 'link',
  //           name: 'Login',
  //           target: true
  //         }, {
  //           state: 'registration',
  //           type: 'link',
  //           name: 'Registration',
  //           target: true
  //         }
  //       ]
  //     },
  //     {
  //       state: 'user',
  //       short_label: 'U',
  //       name: 'User Profile',
  //       type: 'link',
  //       icon: 'ti-user'
  //     }
  //   ]
  // },
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
