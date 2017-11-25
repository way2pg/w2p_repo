export class FoodModel{
  _id:string=null;
  week:number=null;
  year:number=null;
  pgowner:{};
  foodMenu:FoodMenu=new FoodMenu({});

  constructor(values : Object={}){
    Object.assign(this,values);
  }
}

export class FoodMenu{
  dayOneName:string='';
  dayOneDate:string='';
  dayOneBreakfast:string='';
  dayOneLunch:string='';
  dayOneDinner:string='';
  dayOneSpecial:string='';

  dayTwoName:string='';
  dayTwoDate:string='';
  dayTwoBreakfast:string='';
  dayTwoLunch:string='';
  dayTwoDinner:string='';
  dayTwoSpecial:string='';

  dayThreeName:string='';
  dayThreeDate:string='';
  dayThreeBreakfast:string='';
  dayThreeLunch:string='';
  dayThreeDinner:string='';
  dayThreeSpecial:string='';

  dayFourName:string='';
  dayFourDate:string='';
  dayFourBreakfast:string='';
  dayFourLunch:string='';
  dayFourDinner:string='';
  dayFourSpecial:string='';

  dayFiveName:string='';
  dayFiveDate:string='';
  dayFiveBreakfast:string='';
  dayFiveLunch:string='';
  dayFiveDinner:string='';
  dayFiveSpecial:string='';

  daySixName:string='';
  daySixDate:string='';
  daySixBreakfast:string='';
  daySixLunch:string='';
  daySixDinner:string='';
  daySixSpecial:string='';

  daySevenName:string='';
  daySevenDate:string='';
  daySevenBreakfast:string='';
  daySevenLunch:string='';
  daySevenDinner:string='';
  daySevenSpecial:string='';


  /*monBreakfast:string='';
  monLunch:string='';
  monDinner:string='';
  monTodaySpecial:string='';
  tueBreakfast:string='';
  tueLunch:string='';
  tueDinner:string='';
  tueTodaySpecial:string='';
  thurBreakfast:string='';
  thurLunch:string='';
  thurDinner:string='';
  thurTodaySpecial:string='';
  friBreakfast:string='';
  friLunch:string='';
  friDinner:string='';
  friTodaySpecial:string='';
  satBreakfast:string='';
  satLunch:string='';
  satDinner:string='';
  satTodaySpecial:string='';
  sunBreakfast:string='';
  sunLunch:string='';
  sunDinner:string='';
  sunTodaySpecial:string='';*/

  constructor(values : Object={}){
    Object.assign(this,values);
  }
}
