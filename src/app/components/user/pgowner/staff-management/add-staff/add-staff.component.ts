import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {StaffModel} from "../../../../../models/pgowner/staff";
import {StaffService} from "../../../../../services/pgowner/staff.service";
import {UploadService} from "../../../../../services/upload/upload.service";
import {CommonService} from "../../../../../services/common/common.service";
import {UserService} from "../../../../../services/user/user.service";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
var _ = require('lodash');

declare var $:any;

@Component({
  selector: 'pg-owner',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})

export class AddStaffComponent implements OnInit {
  @Input() staff:StaffModel = new StaffModel({});
  error:any;
  @Input() disabled:string = "";
  imageURL:string = "http://localhost:4300/api/image/getImage/";
  @Input() profileImage:string = '../../../../assets/img/elliot.jpg';
  loading:any;
  pgnameList:any = [];

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $staff:StaffService,
              private $common:CommonService,
              private uploadService:UploadService,
              private $pgowner:PGOwnerService,
              private $user:UserService) {

  }

  ngOnInit() {
    if (_.isNull(this.staff._id)) {
      this.staff.staffmember.password = "12345";
    }
    this.activatedRoute.params.forEach((params:Params) => {
      let id = params['id'];
      if (id) {
        this.$staff.get(id).then(staff => {
          if (staff)
            this.profileImage = _.isEqual(staff.staffmember.profileImg.split('/')[0], "assets")
              ? staff.staffmember.profileImg
              : this.imageURL + staff.staffmember.profileImg;
          this.staff = staff;
          this.setDropdowns();
        }).catch(error => {
          this.$common.error(error)
        });
      }
      if (params['view']) {
        this.disabled = params['view'];
      }
    });

    this.getpgList();
    $('.ui.selection.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.profile').dimmer({
      on: 'hover'
    });
  }

  getpgList() {
    let self = this;
    //Getting PG List for DropDown.
    let options = !(_.isEqual(this.$common.user().role, "admin") || _.isEqual(this.$common.user().role, "superadmin")) ? {
      createdBy: this.$common.user()._id,
      $select: ['_id', 'pgname']
    } : {};
    this.$pgowner.find({
      query: options
    }).then(pgnames => {
      console.log(pgnames)
      if (!_.isEmpty(pgnames)) {
        self.pgnameList = pgnames;
        self.setDropdowns();
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  save() {
    debugger;
    this.getDropdowns();
    if (_.isNull(this.staff._id)) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    debugger;
    this.$user.create(this.staff.staffmember).then(staffmember => {
      debugger;
      if (!_.isNull(staffmember)) {
        this.staff.staffmember = staffmember;
        this.$staff.create(this.staff).then(response => {
          debugger;
          if (!_.isNull(response)) {
            this.staff = new StaffModel({});
            this.router.navigateByUrl('/user/staff');
            this.$common.notify().success("Staff Member created successfully.");
          }
        }).catch(error => {
          if (!_.isNull(staffmember._id)) {
            //this.$user.remove(staffmember._id,{})
          }
          console.log(error)
          this.staff = new StaffModel({});
          this.$common.notify().warning("Error occurred, Please try again");
        })
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  update() {
    debugger;
    this.$user.patch(this.staff.staffmember._id, this.staff.staffmember).then(staffmember => {
      if (!_.isNull(staffmember)) {
        this.staff.staffmember = staffmember;
        this.$staff.patch(this.staff._id, this.staff).then(response => {
          if (!_.isNull(response)) {
            this.staff = new StaffModel({});
            this.router.navigateByUrl('/user/staff');
            this.$common.notify().success("Staff Member created successfully.");
          }
        }).catch(error => {
          console.log(error)
          this.staff = new StaffModel({});
          this.$common.notify().warning("Error occurred, Please try again");
        })
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }

  goBack() {
    this.router.navigateByUrl('/user/staff');
  }

  getDropdowns() {
    this.staff.staffrole = $(".role").dropdown("get text");
    this.staff.staffmember.gender = $(".gender").dropdown("get text");
    this.staff.pgdetails = $(".pgnames").dropdown("get value");
    this.staff.staffmember.role = "pgstaff";
  }

  setDropdowns() {
    $(".role").dropdown("set selected", this.staff.staffrole);
    $(".gender").dropdown("set selected", this.staff.staffmember.gender);
    setTimeout(()=> {
      $(".pgnames").dropdown("set selected", this.staff.pgdetails["pgname"]);
    }, 100);

  }

  ngAfterViewInit() {
    let self = this;
    $('.joiningDate').pickadate();
    $('.dob').pickadate();

    var $profile = this.uploadService.uploadImage("pupload", "Profile image", $);
    $profile
      .on("filebatchselected", function (event, file) {
        debugger;
        self.uploadService.validate(self, $profile, file);
      })
      .on('fileuploaded', function (event, data) {
        self.profileImage = self.imageURL + data.response.fileid;
      });

    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        on: 'blur',
        onSuccess: function () {
          self.save();
          return false; // false is required if you do don't want to let it submit
        },

      });
  }

  submit() {
    $(".save-button").click()
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
  role: {
    identifier: 'role',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select role'
      }
    ]
  }
}
