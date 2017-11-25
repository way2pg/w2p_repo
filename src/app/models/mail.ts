export class MailModel{
  to:string='';
  cc:string='';
  subject:string='';
  body:string='';
  bcc:string='';

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
