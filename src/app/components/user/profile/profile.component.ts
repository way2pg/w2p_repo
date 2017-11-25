import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from "../../../models/profile";
import {UserService} from "../../../services/user/user.service";
import {environment} from "../../../../environments/environment.prod";
import {CommonService} from "../../../services/common/common.service";
import {TenantService} from "../../../services/pgowner/tenant.service";
import {UploadService} from "../../../services/upload/upload.service";
import {CountryService} from "../../../services/common/countries.service";
import {StateService} from "../../../services/common/states.service";
import {CitiService} from "../../../services/common/cities.service";

var _ = require('lodash');
declare var $:any;
declare var PNotify:any;

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {
  @Input() user:User;
  error:any;
  @Input() uploadedImages:any = [];
  IMAGE_URL:string = environment.IMAGE_URL;
  app;

  @Input() current_user:User;
  disabled = "";
  _countries;
  _states;
  _cities;

  constructor(private uploadService:UploadService,
              private route:ActivatedRoute,
              private router:Router,
              private $tenant:TenantService,
              private $user:UserService,
              private $common:CommonService,
              private $countries:CountryService,
              private $states:StateService,
              private $cities:CitiService) {
    this.app = this.$common.socket();
    this.user = this.$common.user();

  }

  ngOnInit() {
    console.log(this.route.snapshot.params['id'])
    this.current_user = this.$common.user();

    this.route.params.subscribe(params => {
      const term = params['id'];

      if (params['disabled']) {
        this.disabled = params['disabled'];
      }
      if (params['id']) {
        this.$user.get(params['id']).then(user => {
          if (!(_.isUndefined(user) && _.isNull(user))) {
            this.user = user;
          }
        }).catch(error => {
          this.$common.error(error)
        });
      }
    });

    this.plugins()
    this.countries();
    if (!_.isNull(this.user.country)) {
      this.states(this.user.country._id)
    }

    if (!_.isNull(this.user.state)) {
      this.cities(this.user.state._id)
    }


  }

  plugins() {
    let self = this;
    $('.ui.selection.dropdown').dropdown();

    $('.ui.dropdown')
      .dropdown({
        allowAdditions: true
      })
    ;

    $('.ui.checkbox').checkbox();
    $('.circular.image').dimmer({
      on: 'hover'
    });

    this.uploadedImages = [];


    // Single picker
    $('.dob').daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      locale: {
        format: 'MM/DD/YYYY'
      }
    }, function (start, end) {
      self.user.dob = start.format('MM-DD-YYYY');
    });

  }

  ngAfterViewInit() {
    // Basic options
    let self = this;
    this.uploadImages()

    this.setDropDowns();


    //Getting Keyvalues for ID Proofs.
    this.$tenant.find({
      query: {
        tenant: this.user._id
      }
    }).then(response => {
      if (!_.isEmpty(response)) {
        this.uploadedImages = response[0].uploadedImages;
      }
    }).catch(error => {
      this.$common.error(error)
    });

    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        onSuccess: function () {
          self.save();
          return false; // false is required if you do don't want to let it submit
        },

      });
  }


  uploadImages() {
    let self = this;
    var $pupload = this.uploadService.uploadImage("pupload", "Profile image", $);
    var $cupload = this.uploadService.uploadImage("cupload", "Cover image", $)
    $pupload
      .on("filebatchselected", function (event, files) {
        if (!_.isEqual(files.length, 0)) {
          $pupload.fileinput("upload");
        } else {
          new PNotify({
            title: 'Warning!!',
            text: 'Please upload valid image',
            addclass: 'alert bg-danger alert-styled-left',
            type: 'error'
          });
        }
      })
      .on('fileuploaded', function (event, data) {
        new PNotify({
          title: 'Success!!',
          text: 'File Uploaded Successfully',
          addclass: 'alert bg-success alert-styled-left',
        });
        self.user['profileImg'] = "api/image/download/" + data.response.fileid;

      });

    $cupload
      .on("filebatchselected", function (event, files) {
        if (!_.isEqual(files.length, 0)) {
          $cupload.fileinput("upload");
        } else {
          new PNotify({
            title: 'Warning!!',
            text: 'Please upload valid image',
            addclass: 'alert bg-danger alert-styled-left',
            type: 'error'
          });
        }
      })
      .on('fileuploaded', function (event, data) {
        new PNotify({
          title: 'Success!!',
          text: 'File Uploaded Successfully',
          addclass: 'alert bg-success alert-styled-left',
        });
        self.user['coverImg'] = "api/image/download/" + data.response.fileid;
      });
  }

  save() {
    this.user.gender = $(".profile_gender").dropdown("get value");
    this.user.maritalStatus = $(".maritalStatus").dropdown("get value");
    this.$user.patch(this.user._id, this.user).then(user => {
      debugger;
      if (!_.isEmpty(user)) {
        this.$common.send(user);
        this.$common.socket().settings.storage['user'] = JSON.stringify(user);
        this.$common.notify().success("Profile details updated successfully");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  goBack() {
    window.history.back();
  }

  setDropDowns() {
    $(".profile_gender").dropdown("set selected", this.user.gender);
    $(".maritalStatus").dropdown("set selected", this.user.maritalStatus);
  }

  ngOnDestroy() {

  }

  //Showing Images in popup
  showImage(imageURL) {
    $.magnificPopup.open({
      items: {
        src: imageURL
      },
      type: 'image'
    });
  }


  check() {
    if (!_.isEqual(this.current_user.role, "superadmin") && !_.isEqual(this.current_user._id, this.user._id)) {
      this.disabled = "disabled";
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

      self.user.country = _.find(self._countries, function (object) {
        return _.isEqual(object.name, "India");
      });
      if (!_.isUndefined(self.user.country._id)) {
        self.states(self.user.country._id)
      }
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
              self.user.state = _.find(self._states, function (object) {
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
              self.user.city = _.find(self._cities, function (object) {
                return _.isEqual(object._id, val);
              });
            }
          })
        ;
      }, 5)
    })
  }
}


let validationRules = {
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
        type: 'regExp[/^[0-9]{10}$/]',
        prompt: 'Please enter a 10 digits mobile number in format XXXXXXXXXX'
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
      },
      {
        type: 'regExp[/^[0-9]{1,6}$/]',
        prompt: 'Please enter a mobile number in format XXXXXX'
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

