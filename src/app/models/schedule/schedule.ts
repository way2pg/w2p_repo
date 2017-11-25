export class Schedule {
  _id:string;
  scheduletype:string = '';
  scheduledate:string = '';
  scheduletime:string = '';
  repeats:string = '';
  monthly:{}={};
  yearly:{}={};
  daily:string="";
  weekly:{}={};
  ends:string='';
  endsafter:number=null;
  endson:string='';

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

class Monthly {
  moption:boolean = false;
  monthly_option1_repeats_1:string = '';
  monthly_option1_repeats_2:string = '';
  monthly_option2_repeats_1:string = '';
  monthly_option2_repeats_2:string = '';
  monthly_option2_repeats_3:string = '';

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

class Yearly {
  yoption:boolean = false;
  yearly_option1_repeats_1:string = '';
  yearly_option1_repeats_2:string = '';
  yearly_option2_repeats_1:string = '';
  yearly_option2_repeats_2:string = '';
  yearly_option2_repeats_3:string = '';

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

class Daily {
  daily_repeats:string = '';

  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

class Weekly {
  weekly_repeats:string = '';
  sun:boolean = false;
  mon:boolean = false;
  tue:boolean = false;
  wed:boolean = false;
  thu:boolean = false;
  fri:boolean = false;
  sat:boolean = false;


  constructor(values:Object = {}) {
    Object.assign(this, values);
  }
}

