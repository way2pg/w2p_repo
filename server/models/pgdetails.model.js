module.exports = function (app) {
  const mongoose = app.get('mongooseClient');
  const Schema = mongoose.Schema;
  const pgdetails = new mongoose.Schema({
    pgname: {
      type: String,
      required: false
    },
    pgowner: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    locality: {
      type: String,
      required: false
    },
    street: {
      type: String,
      required: false
    },
    landmark: {
      type: String,
      required: false
    },
    pincode: {
      type: Number,
      required: false
    },
    roomAvailableFor: {
      type: String,
      required: false
    },
    preferredGuests: {
      type: String,
      required: false
    },
    foodIncluded: {
      type: String,
      required: false
    },
    availableFrom: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    pRNoSmoke: {
      type: Boolean,
      required: false
    },
    pRNoDrinking: {
      type: Boolean,
      required: false
    },
    pRNoGuardiansStay: {
      type: Boolean,
      required: false
    },
    pRNoGirlsEntry: {
      type: Boolean,
      required: false
    },
    pRNoGentsEntry: {
      type: Boolean,
      required: false
    },
    pRNoNonVeg: {
      type: Boolean,
      required: false
    },
    apartmentName: {
      type: String,
      required: false
    },
    rooms: [
      {
        roomid: {
          type: String,
          required: false
        },
        roomType: {
          type: String,
          required: false
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
        simages: {
          type: Array,
          required: false
        },
        dimages: {
          type: Array,
          required: false
        },
        timages: {
          type: Array,
          required: false
        },
        fimages: {
          type: Array,
          required: false
        },
        sAvailableRooms: {
          type: Number,
          required: false
        },
        sAvailableVacancies: {
          type: Number,
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
          type: Number,
          required: false
        },
        sExpectedRentWithFood: {
          type: Number,
          required: false
        },
        sExpectedRentWithoutFood: {
          type: Number,
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
          type: Number,
          required: false
        },
        dAvailableVacancies: {
          type: Number,
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
          type: Number,
          required: false
        },
        dExpectedRentWithFood: {
          type: Number,
          required: false
        },
        dExpectedRentWithoutFood: {
          type: Number,
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
          type: Number,
          required: false
        },
        tAvailableVacancies: {
          type: Number,
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
          type: Number,
          required: false
        },
        tExpectedRentWithFood: {
          type: Number,
          required: false
        },
        tExpectedRentWithoutFood: {
          type: Number,
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
          type: Number,
          required: false
        },
        fAvailableVacancies: {
          type: Number,
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
          type: Number,
          required: false
        },
        fExpectedRentWithFood: {
          type: Number,
          required: false
        },
        fExpectedRentWithoutFood: {
          type: Number,
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
        }
      }
    ],
    views: {type: Number},
    likes: {type: Number},
    dislikes: {type: Number},
    /*comments: {type: Number},*/

    place_name: {
      type: String,
      required: false
    },
    place_id: {
      type: String,
      required: false
    },
    tenants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'tenant'
      }
    ],
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  });

  return mongoose.model('pgdetails', pgdetails);
};
