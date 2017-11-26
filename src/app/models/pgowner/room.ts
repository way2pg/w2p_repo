export class Room {
  _id:string;
  roomid:string = null;
  roomType: string='';
  single:boolean;
  double:boolean;
  triple:boolean;
  four:boolean;

  simages=[];
  dimages=[];
  timages=[];
  fimages=[];

  sAvailableRooms:number;
  sAvailableVacancies:number;
  sCheckInTime:string='';
  sParking:string='';
  sLaundray:string='';
  sWardenFacility:string='';
  sExpectedDeposit:number;
  sExpectedRentWithFood:number;
  sExpectedRentWithoutFood:number;
  scheckOutTime:string='';
  sRoomCleaning:string='';
  sCupboard:boolean;
  sTV:string;
  sAttachedToilet:boolean;
  sCommonTV:boolean;
  sMess:boolean;
  sLift:boolean;
  sGyser:boolean;
  sAC:boolean;
  sBedding:boolean;
  sRefrigerator:boolean;
  sWifi:boolean;
  sCookingAllowed:boolean;
  sPowerBackup:boolean;

  dAvailableRooms:number;
  dAvailableVacancies:number;
  dCheckInTime:string='';
  dParking:string='';
  dLaundray:string='';
  dWardenFacility:string='';
  dExpectedDeposit:number;
  dExpectedRentWithFood:number;
  dExpectedRentWithoutFood:number;
  dcheckOutTime:string='';
  dRoomCleaning:string='';
  dCupboard:boolean;
  dTV:boolean;
  dAttachedToilet:boolean;
  dCommonTV:boolean;
  dMess:boolean;
  dLift:boolean;
  dGyser:boolean;
  dAC:boolean;
  dBedding:boolean;
  dRefrigerator:boolean;
  dWifi:boolean;
  dCookingAllowed:boolean;
  dPowerBackup:boolean;

  tAvailableRooms:number;
  tAvailableVacancies:number;
  tCheckInTime:string='';
  tParking:string='';
  tLaundray:string='';
  tWardenFacility:string='';
  tExpectedDeposit:number;
  tExpectedRentWithFood:number;
  tExpectedRentWithoutFood:number;
  tcheckOutTime:string='';
  tRoomCleaning:string='';
  tCupboard:boolean;
  tTV:boolean;
  tAttachedToilet:boolean;
  tCommonTV:boolean;
  tMess:boolean;
  tLift:boolean;
  tGyser:boolean;
  tAC:boolean;
  tBedding:boolean;
  tRefrigerator:boolean;
  tWifi:boolean;
  tCookingAllowed:boolean;
  tPowerBackup:boolean;

  fAvailableRooms:number;
  fAvailableVacancies:number;
  fCheckInTime:string='';
  fParking:string='';
  fLaundray:string='';
  fWardenFacility:string='';
  fExpectedDeposit:number;
  fExpectedRentWithFood:number;
  fExpectedRentWithoutFood:number;
  fcheckOutTime:string='';
  fRoomCleaning:string='';
  fCupboard:boolean;
  fTV:boolean;
  fAttachedToilet:boolean;
  fCommonTV:boolean;
  fMess:boolean;
  fLift:boolean;
  fGyser:boolean;
  fAC:boolean;
  fBedding:boolean;
  fRefrigerator:boolean;
  fWifi:boolean;
  fCookingAllowed:boolean;
  fPowerBackup:boolean;


  constructor(values:Object={}){
    Object.assign(this,values);
  }
}