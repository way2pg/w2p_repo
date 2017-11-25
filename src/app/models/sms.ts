export class SMSModel{
 mobile:string='';
 body:string='';

  constructor(values:Object={}){
    Object.assign(this,values);
  }
}
