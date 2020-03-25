import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';

@Injectable({
  providedIn: 'root'
})
export class PNotifyService {

constructor() { }
getPNotify() {
  // tslint:disable-next-line:no-unused-expression
  PNotifyButtons; // Initiate the module. Important!
  return PNotify;
}
success(input: string) {
  const opts = {
    title: 'Thành công',
    text: input,
    type: 'success',
    stack: {
      'dir1': 'down',
      'dir2': 'left',
      'firstpos1': 25,
      'firstpos2': 25,
      'push': 'top'
    }
  };
  PNotify.alert(opts);
}

error(input: string) {
  const opts = {
    title: 'Thất bại',
    text: input,
    type: 'error',
    stack: {
      'dir1': 'down',
      'dir2': 'left',
      'firstpos1': 25,
      'firstpos2': 25,
      'push': 'top'
    }
  };
  PNotify.alert(opts);
}

}
