import {User} from "../profile";
import {Room} from "./room";
export class PGDetails {
  _id;
  pgowner:User;
  pgname:string;
  city:string;
  locality:string;
  street:string = '';
  landmark:string = '';
  state:string = "";
  country:string = "";
  pincode:number = null;
  roomAvailableFor:string = '';
  preferredGuests:string = '';
  foodIncluded:string = '';
  availableFrom:string = '';
  description:string = '';
  pRNoSmoke:boolean = false;
  pRNoDrinking:boolean = false;
  pRNoGuardiansStay:boolean = false;
  pRNoGirlsEntry:boolean = false;
  pRNoNonVeg:boolean = false;
  pRNoGentsEntry:boolean = false;
  apartmentName:string = '';
  currentUser:string = '';
  createdBy:User;
  updatedBy:User;
  rooms:Room[];
  views:Number;
  comments = [];
  place_name = null;
  place_id = null;

  constructor(values:Object = {}) {
    Object.assign(this, values)
  }
}


