module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const rooms = new mongoose.Schema(
  {
    pgownerId: {
      type: String,
      required: false
    },
    roomType: {
      type: String,
      required: false
    },
    simages:{
      type:Object,
      required:false
    },
    dimages:{
      type:Object,
      required:false
    },
    timages:{
      type:Object,
      required:false
    },
    fimages:{
      type:Object,
      required:false
    },
    single: {
      type: Boolean,
      required: false
    },
    double: {
      type: Boolean,
      required: false
    },
    triple: {
      type: Boolean,
      required: false
    },
    four: {
      type: Boolean,
      required: false
    },

    sAvailableRooms: {
      type: String,
      required: false
    },
    sAvailableVacancies: {
      type: String,
      required: false
    },
    sCheckInTime: {
      type: String,
      required: false
    },
    sParking: {
      type: String,
      required: false
    },
    sLaundray: {
      type: String,
      required: false
    },
    sWardenFacility: {
      type: String,
      required: false
    },
    sExpectedDeposit: {
      type: String,
      required: false
    },
    sExpectedRentWithFood: {
      type: String,
      required: false
    },
    sExpectedRentWithoutFood: {
      type: String,
      required: false
    },
    scheckOutTime: {
      type: String,
      required: false
    },
    sRoomCleaning: {
      type: String,
      required: false
    },
    sCupboard: {
      type: Boolean,
      required: false
    },
    sTV: {
      type: Boolean,
      required: false
    },
    sAttachedToilet: {
      type: Boolean,
      required: false
    },
    sCommonTV: {
      type: Boolean,
      required: false
    },
    sMess: {
      type: Boolean,
      required: false
    },
    sLift: {
      type: Boolean,
      required: false
    },
    sGyser: {
      type: Boolean,
      required: false
    },
    sAC: {
      type: Boolean,
      required: false
    },
    sBedding: {
      type: Boolean,
      required: false
    },
    sRefrigerator: {
      type: Boolean,
      required: false
    },
    sWifi: {
      type: Boolean,
      required: false
    },
    sCookingAllowed: {
      type: Boolean,
      required: false
    },
    sPowerBackup: {
      type: Boolean,
      required: false
    },
    dAvailableRooms: {
      type: String,
      required: false
    },
    dAvailableVacancies: {
      type: String,
      required: false
    },
    dCheckInTime: {
      type: String,
      required: false
    },
    dParking: {
      type: String,
      required: false
    },
    dLaundray: {
      type: String,
      required: false
    },
    dWardenFacility: {
      type: String,
      required: false
    },
    dExpectedDeposit: {
      type: String,
      required: false
    },
    dExpectedRentWithFood: {
      type: String,
      required: false
    },
    dExpectedRentWithoutFood: {
      type: String,
      required: false
    },
    dcheckOutTime: {
      type: String,
      required: false
    },
    dRoomCleaning: {
      type: String,
      required: false
    },
    dCupboard: {
      type: Boolean,
      required: false
    },
    dTV: {
      type: Boolean,
      required: false
    },
    dAttachedToilet: {
      type: Boolean,
      required: false
    },
    dCommonTV: {
      type: Boolean,
      required: false
    },
    dMess: {
      type: Boolean,
      required: false
    },
    dLift: {
      type: Boolean,
      required: false
    },
    dGyser: {
      type: Boolean,
      required: false
    },
    dAC: {
      type: Boolean,
      required: false
    },
    dBedding: {
      type: Boolean,
      required: false
    },
    dRefrigerator: {
      type: Boolean,
      required: false
    },
    dWifi: {
      type: Boolean,
      required: false
    },
    dCookingAllowed: {
      type: Boolean,
      required: false
    },
    dPowerBackup: {
      type: Boolean,
      required: false
    },
    tAvailableRooms: {
      type: String,
      required: false
    },
    tAvailableVacancies: {
      type: String,
      required: false
    },
    tCheckInTime: {
      type: String,
      required: false
    },
    tParking: {
      type: String,
      required: false
    },
    tLaundray: {
      type: String,
      required: false
    },
    tWardenFacility: {
      type: String,
      required: false
    },
    tExpectedDeposit: {
      type: String,
      required: false
    },
    tExpectedRentWithFood: {
      type: String,
      required: false
    },
    tExpectedRentWithoutFood: {
      type: String,
      required: false
    },
    tcheckOutTime: {
      type: String,
      required: false
    },
    tRoomCleaning: {
      type: String,
      required: false
    },
    tCupboard: {
      type: Boolean,
      required: false
    },
    tTV: {
      type: Boolean,
      required: false
    },
    tAttachedToilet: {
      type: Boolean,
      required: false
    },
    tCommonTV: {
      type: Boolean,
      required: false
    },
    tMess: {
      type: Boolean,
      required: false
    },
    tLift: {
      type: Boolean,
      required: false
    },
    tGyser: {
      type: Boolean,
      required: false
    },
    tAC: {
      type: Boolean,
      required: false
    },
    tBedding: {
      type: Boolean,
      required: false
    },
    tRefrigerator: {
      type: Boolean,
      required: false
    },
    tWifi: {
      type: Boolean,
      required: false
    },
    tCookingAllowed: {
      type: Boolean,
      required: false
    },
    tPowerBackup: {
      type: Boolean,
      required: false
    },

    fAvailableRooms: {
      type: String,
      required: false
    },
    fAvailableVacancies: {
      type: String,
      required: false
    },
    fCheckInTime: {
      type: String,
      required: false
    },
    fParking: {
      type: String,
      required: false
    },
    fLaundray: {
      type: String,
      required: false
    },
    fWardenFacility: {
      type: String,
      required: false
    },
    fExpectedDeposit: {
      type: String,
      required: false
    },
    fExpectedRentWithFood: {
      type: String,
      required: false
    },
    fExpectedRentWithoutFood: {
      type: String,
      required: false
    },
    fcheckOutTime: {
      type: String,
      required: false
    },
    fRoomCleaning: {
      type: String,
      required: false
    },
    fCupboard: {
      type: Boolean,
      required: false
    },
    fTV: {
      type: Boolean,
      required: false
    },
    fAttachedToilet: {
      type: Boolean,
      required: false
    },
    fCommonTV: {
      type: Boolean,
      required: false
    },
    fMess: {
      type: Boolean,
      required: false
    },
    fLift: {
      type: Boolean,
      required: false
    },
    fGyser: {
      type: Boolean,
      required: false
    },
    fAC: {
      type: Boolean,
      required: false
    },
    fBedding: {
      type: Boolean,
      required: false
    },
    fRefrigerator: {
      type: Boolean,
      required: false
    },
    fWifi: {
      type: Boolean,
      required: false
    },
    fCookingAllowed: {
      type: Boolean,
      required: false
    },
    fPowerBackup: {
      type: Boolean,
      required: false
    },
    pgDetails: {
      type: Schema.Types.ObjectId,
      ref: 'PGDetails'
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }
  );

  return mongoose.model('rooms', rooms);
};
