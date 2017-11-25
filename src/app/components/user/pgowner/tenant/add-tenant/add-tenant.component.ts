import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TenantModel} from "../../../../../models/pgowner/tenant";
import {TenantService} from "../../../../../services/pgowner/tenant.service";
import {UploadService} from "../../../../../services/upload/upload.service";
import {PGDetails} from "../../../../../models/pgowner/pgdetails";
import {ImagesService} from "../../../../../services/images/images.service";
import {environment} from "../../../../../../environments/environment.prod";
import {CommonService} from "../../../../../services/common/common.service";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {ConfigService} from "../../../../../services/config/config.service";
import {UserService} from "../../../../../services/user/user.service";
import {CountryService} from "../../../../../services/common/countries.service";
import {StateService} from "../../../../../services/common/states.service";
import {CitiService} from "../../../../../services/common/cities.service";
const _ = require('lodash');
const bytes = require('bytes');
const moment = require('moment')

declare var $:any;
@Component({
  selector: 'pg-owner',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})

export class AddTenantComponent implements OnInit, AfterViewInit {
  @Input() tenantModel:TenantModel = new TenantModel({});
  error:any;
  @Input() uploadType:string;
  @Input() disabled:string = "";
  imageURL:string = environment.IMAGE_URL;

  @Input() IMAGE_URL = environment.IMAGE_URL;
  photo:any = "/assets/images/demo/users/face1.jpg";

  @Input() pgdetails:PGDetails[];
  idproof_list:any = {};
  _id;
  index;
  @Input() file_type = environment.image_upload_file_types;
  pgnameList:any = [];
  idproofs:any = null;
  packageList:any = null;
  roomTypes:any = null;
  disable_fileupload:any = true;
  loading:any;

  _countries;
  _states;
  _cities;


  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $user:UserService,
              private $tenant:TenantService,
              private $common:CommonService,
              private $pgowner:PGOwnerService,
              private $upload:UploadService,
              private _image:ImagesService,
              private $config:ConfigService,
              private $countries:CountryService,
              private $states:StateService,
              private $cities:CitiService) {

  }

  ngOnInit() {
    var self = this;
    if (_.isNull(this.tenantModel._id)) {
      this.tenantModel.tenant.password = "12345";
    }
    $('.daterange-single').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: 1,
      min: true,
      format: 'yyyy-mm-dd',
      onClose: function () {
        if (_.isEqual(this.$node.context.name, "joinedDate")) {
          self.tenantModel.joinedDate = this.get();
        } else {
          self.tenantModel.joinedDate = this.get();
        }
      }
    });
    $('.daterange-single').val(moment().format("YYYY-MM-DD")).pickadate()
    self.tenantModel.joinedDate = moment().format("YYYY-MM-DD");

    $('.daterange-dob').pickadate({
      labelMonthNext: 'Go to the next month',
      labelMonthPrev: 'Go to the previous month',
      labelMonthSelect: 'Pick a month from the dropdown',
      labelYearSelect: 'Pick a year from the dropdown',
      selectMonths: true,
      selectYears: 50,
      max: true,
      format: 'yyyy-mm-dd',
      onClose: function () {
        if (_.isEqual(this.$node.context.name, "dob")) {
          self.tenantModel.tenant.dob = this.get();
        } else {
          self.tenantModel.tenant.dob = this.get();
        }
      }
    });

    this.activatedRoute.params.forEach((params:Params) => {
      let id = params['id'];

      if (id) {
        this.$tenant.get(id).then(tenant => {
          this.tenantModel = tenant;
          this.setDropDowns();
        }).catch(error => {
          this.$common.error(error)
        });
      }
      if (params['view']) {
        this.disabled = params['view'];
      }
    });

    //Getting Keyvalues for ID Proofs.
    this.$config.find({
      query: {
        type: "idproofs"
      }
    }).then(response => {
      self.idproofs = response;
    }).catch(error => {
      this.$common.error(error)
    });

    //Getting PG List for DropDown.
    let options = !(_.isEqual(this.$common.user().role, "admin") || _.isEqual(this.$common.user().role, "superadmin")) ? {
      createdBy: this.$common.user()._id,
      $select: ['_id', 'pgname']
    } : {};

    this.$pgowner.find({
      query: options
    }).then(pgnames => {
      if (!_.isEmpty(pgnames)) {
        self.pgnameList = pgnames;
        self.setDropDowns();
      }
    }).catch(error => {
      this.$common.error(error)
    });


    //Initilizing Dropdown and Dimmer
    $('.ui.selection.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.profile').dimmer({
      on: 'hover'
    });


    $('.pgnames').dropdown(
      {
        onChange(value, text, $choice){
          self.setValues(value);
        },
      }
    );

    this.countries();

  }

  setValues(id) {
    let self = this;
    $(".joinedPackage").dropdown('restore defaults');
    $(".roomtype").dropdown('restore defaults');

    this.$pgowner.get(id).then(response => {
      self.packageList = [];
      self.roomTypes = [];
      _.each(response.rooms, function (room) {
        if (!_.has(self.packageList, room.roomType)) {
          self.packageList.push(room.roomType)
        }
        if (room.single && !_.has(self.roomTypes, "Single")) {
          self.roomTypes.push("Single")
        }
        if (room.double && !_.has(self.roomTypes, "Double")) {
          self.roomTypes.push("Double")
        }
        if (room.triple && !_.has(self.roomTypes, "Triple")) {
          self.roomTypes.push("Triple")
        }
        if (room.four && !_.has(self.roomTypes, "Four")) {
          self.roomTypes.push("Four")
        }
      });
      setTimeout(()=> {
        $(".joinedPackage").dropdown("set selected", this.tenantModel.joinedPackage);
        $(".roomtype").dropdown("set selected", this.tenantModel.roomtype);
        $('.ui.dropdown').dropdown('refresh');
      }, 50);

    }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {
    debugger;
    this.getDropDowns();
    if (_.isNull(this.tenantModel._id)) {
      this.$user.create(this.tenantModel.tenant).then(tenant => {
        if (!_.isEmpty(tenant)) {
          this.tenantModel.tenant = tenant;
          this.$tenant.create(this.tenantModel).then(response => {
            this.router.navigateByUrl('/user/tenants');
            this.$common.notify().success("Tenant added successfully");
          }).catch(error => {
            this.$common.notify().warning("Error occurred, Please try again.");
          });
        }
      }).catch(error => {
        this.$common.error(error)
      });
    } else {

      this.$user.patch(this.tenantModel.tenant._id, this.tenantModel.tenant).then(tenant => {
        if (!_.isEmpty(tenant)) {
          this.tenantModel.tenant = tenant;
          this.$tenant.patch(this.tenantModel._id, this.tenantModel).then(response => {
            this.router.navigateByUrl('/user/tenants');
            this.$common.notify().success("Tenant details updated successfully");
          }).catch(error => {
            this.$common.notify().warning("Error occurred, Please try again.");
          });
        }
      }).catch(error => {
        this.$common.error(error)
      });
    }
  }

  goBack() {
    this.router.navigateByUrl('/user/tenants');
  }

  getDropDowns() {
    this.tenantModel.idproofs = $(".idproofs").dropdown("get text");
    this.tenantModel.tenant.gender = $(".tenant_gender").dropdown("get text");
    this.tenantModel.tenant.maritalStatus = $(".maritalStatus").dropdown("get text");
    this.tenantModel.tenant.maritalStatus = $(".maritalStatus").dropdown("get text");
    this.tenantModel.roomtype = $(".roomtype").dropdown("get text");
    this.tenantModel.joinedPackage = $(".joinedPackage").dropdown("get text");
    //  this.tenantModel.joinedDate = $('.joiningDate').pickadate().pickadate('picker').get();
//    this.tenantModel.tenant.dob = $('.dob').pickadate().pickadate('picker').get();
    this.tenantModel.pgdetails = $(".pgnames").dropdown("get value");
    this.tenantModel.idproofs = $(".idproofs").dropdown("get value");
    this.tenantModel.tenant.role = "tenant";
  }

  setDropDowns() {
    console.log(this.tenantModel)
    setTimeout(()=> {
      $(".tenant_gender").dropdown("set selected", this.tenantModel.tenant.gender);
      $(".maritalStatus").dropdown("set selected", this.tenantModel.tenant.maritalStatus);
      if(!_.isUndefined(this.tenantModel.pgdetails)){
        $(".pgnames").dropdown("set selected", this.tenantModel.pgdetails["pgname"]);
      }
      $(".joinedPackage").dropdown("set selected", this.tenantModel.joinedPackage);
      $(".roomtype").dropdown("set selected", this.tenantModel.roomtype);
      $(".idproofs").dropdown("set selected", this.tenantModel.idproofs);
      $('.ui.dropdown').dropdown('refresh');
    }, 1000);
  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    var self = this;
    $('.joiningDate').pickadate();

    $('.dob').pickadate({});

    $('.idproofs').dropdown(
      {
        onAdd: function (addedValue, addedText, $addedChoice) {
          self.idproof_list[addedValue] = addedText;
          self.disable_fileupload = false;
        },
        onLabelRemove: function (value) {
          if (_.some(self.tenantModel.uploadedImages, {"proofid": value})) {
            this.$common.notify().warning("Please delete uploaded id proofs");
            return false;
          }
        }
      }
    );

    var $profile = this.$upload.uploadImage("pupload", "Profile image", $);
    $profile
      .on("filebatchselected", function (event, file) {
        self.$upload.validate(self, $profile, file);
      })
      .on('fileuploaded', function (event, data) {
        self.tenantModel.tenant.profileImg = "api/image/download/" + data.response.fileid;
      });

    var $input = this.$upload.uploadImage("file-input-ajax", "Upload Proofs", $);

    $input.on("filebatchselected", function (event, file) {
      self.$upload.validate(self, $input, file);
    })
      .on('fileuploaded', function (event, data) {
        if (!_.isUndefined(self.tenantModel)) {
          var files = {};
          _.each(data.files, file=> {
            files["name"] = self.idproof_list[$(".idproofs").dropdown("get value")[self.tenantModel.uploadedImages.length]];
            files["proofid"] = $(".idproofs").dropdown("get value")[self.tenantModel.uploadedImages.length];
            files["size"] = bytes(file.size, {unitSeparator: ' '});
            files["type"] = file.type;
            files["number"] = "";
          })
          files["deleteId"] = data.response.initialPreviewConfig[0].key;
          files["fileid"] = "api/image/download/" + data.response.fileid;
          self.tenantModel.uploadedImages.push(files);

          self.$common.notify().success("File Uploaded Successfully, Please update id proof number");
        }

      })
      .on('filebatchuploadcomplete', function (event, files, extra) {
        self.loading = "";
        if ($(".idproofs").dropdown("get value").length == self.tenantModel.uploadedImages.length) {
          self.disable_fileupload = true;
        }
      });

    $('.ui.form')
      .form({
        on: 'blur',
        fields: validationRules,
        inline: true,
        onSuccess: function () {
          self.save();
          return false; // false is required if you do don't want to let it submit
        },

      });
  }

  showBrowse() {
    $('#fileupload').trigger('click');
  }

  onDelete(_id, i) {
    this._id = _id;
    this.index = i;
  }

  delete() {
    $("#modal_info_close").click();
    event.stopPropagation();
    this._image
      .delete(this._id)
      .then(response => {
        _.remove(this.tenantModel.uploadedImages, {deleteId: this._id});
        $("#" + this._id).find("td").remove();
        this.$common.notify().success("Deleted Successfully!!");
        if ($(".idproofs").dropdown("get value").length > this.tenantModel.uploadedImages.length) {
          this.disable_fileupload = false;
        }
        this._id = null;
      })
      .catch(error => {
        this.$common.error(error)
      });


  }

  showImage(imageURL) {
    $.magnificPopup.open({
      items: {
        src: imageURL
      },
      type: 'image'
    });
  }

  getImage(photo_url) {
    if (_.includes(photo_url, "assets/images/demo") || _.isNull(photo_url)) {
      return this.IMAGE_URL + this.photo;
    } else {
      return this.IMAGE_URL + photo_url;
    }
  }


  countries() {
    let self = this;
    this.$countries.find({}).then(response => {
      this._countries = response;
      setTimeout(() => {
        $('.ui.dropdown.country')
          .dropdown({
            allowAdditions: true,
            forceSelection: false,
            onChange: function (val) {
              $('.state').dropdown('restore defaults');
              self.states(101)
            }
          })
        ;
      }, 5)

      self.tenantModel.tenant.country = _.find(self._countries, function (object) {
        return _.isEqual(object.name, "India");
      });
      self.states(self.tenantModel.tenant.country._id)
    })
  }

  states(country) {
    debugger;
    let self = this;
    this.$states.find({
      query: {
        "country": country
      }
    }).then(response => {
      this._states = response;
      setTimeout(() => {
        $('.ui.dropdown.state')
          .dropdown({
            allowAdditions: true,
            forceSelection: false,
            onChange: function (val) {
              $('.city').dropdown('restore defaults');
              $('.city').dropdown('clear');
              self.cities(val)
              self.tenantModel.tenant.state = _.find(self._states, function (object) {
                return _.isEqual(object._id, val);
              });
            }
          })
        ;
      }, 5)
    })
  }

  cities(city) {
    debugger;
    let self = this;
    this.$cities.find({
      query: {
        "state": city
      }
    }).then(response => {
      this._cities = response;
      setTimeout(() => {
        $('.ui.dropdown.city')
          .dropdown({
            allowAdditions: true,
            forceSelection: false,
            onChange: function (val) {
              self.tenantModel.tenant.city = _.find(self._cities, function (object) {
                return _.isEqual(object._id, val);
              });
            }
          })
        ;
      }, 5)
    })
  }

  submit(){
    console.log("Submit Button")
    $(".save").click();
  }

}

let validationRules = {
  idnumber: {
    identifier: 'idnumber',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter ID number'
      }
    ]
  },
  joinedPackage: {
    identifier: 'joinedPackage',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select joined package'
      }
    ]
  },
  roomtype: {
    identifier: 'roomtype',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select room type'
      }
    ]
  },
  paidAmount: {
    identifier: 'paidAmount',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter paid amount'
      },
      {
        type: 'number',
        prompt: 'Please enter valid amount'
      }
    ]
  }
  ,
  advanceAmount: {
    identifier: 'advanceAmount',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter advance amount'
      },
      {
        type: 'number',
        prompt: 'Please enter valid amount'
      }
    ]
  },
  idproofs: {
    identifier: 'idproofs',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select id proofs'
      }
    ]
  },
  pgnames: {
    identifier: 'pgnames',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select pg name'
      }
    ]
  },
  firstName: {
    identifier: 'firstName',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter your first name'
      }
    ]
  },
  displayName: {
    identifier: 'displayName',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter your display name'
      }
    ]
  },
  email: {
    identifier: 'email',
    rules: [
      {
        type: 'email',
        prompt: 'Please enter a valid e-mail'
      }
    ]
  },
  mobile: {
    identifier: 'mobile',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter valid mobile number'
      },
      {
        type: 'regExp[/^[+0-9 -]{10,14}$/]',
        prompt: 'Please enter a mobile number in format +XX-XXXXXXXXXX'
      }
    ]
  },
  gender: {
    identifier: 'gender',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select gender'
      }
    ]
  },
  city: {
    identifier: 'city',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter city'
      }
    ]
  },
  state: {
    identifier: 'state',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter state'
      }
    ]
  },
  country: {
    identifier: 'country',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter country'
      }
    ]
  },
  postalCode: {
    identifier: 'postalCode',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter postal code'
      },
      {
        type: 'number',
        prompt: 'Please enter valid postal code'
      }
    ]
  },
  addressLineOne: {
    identifier: 'addressLineOne',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter address'
      }
    ]
  }
}
