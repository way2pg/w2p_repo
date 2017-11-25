import {Injectable} from '@angular/core';
var _ = require('underscore');
declare var PNotify:any;

@Injectable()
export class NotifyService {


  constructor() {
    
  }

  success(message){
    new PNotify({
      title: 'Success!!',
      text: message,
      addclass: 'alert bg-success alert-styled-left',
    });
  }
  warning(message){
    new PNotify({
      title: 'Warning!!',
      text: message,
      addclass: 'alert bg-danger alert-styled-left'
    });
  }
}
