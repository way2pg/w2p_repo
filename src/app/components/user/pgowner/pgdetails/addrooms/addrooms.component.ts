import {
  Component,
  Input,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Params
} from '@angular/router';
import {Room} from "../../../../../models/pgowner/room";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {UploadService} from "../../../../../services/upload/upload.service";
import {environment} from "../../../../../../environments/environment.prod";
import {ImagesService} from "../../../../../services/images/images.service";
import {CommonService} from "../../../../../services/common/common.service";
import {PGDetails} from "../../../../../models/pgowner/pgdetails";

var _ = require('lodash');
const bytes = require('bytes');
declare var $:any;

@Component({
  selector: 'pg-owner',
  templateUrl: './addrooms.component.html',
  styleUrls: ['./addrooms.component.css']
})

export class AddRoomsComponent implements OnInit, AfterViewInit {

  @Input() room;
  @Input() sharingTypes:boolean = true;
  @Input() single:boolean = true;
  @Input() double:boolean = true;
  @Input() triple:boolean = true;
  @Input() four:boolean = true;

  file_type:any = environment.image_upload_file_types;
  imageURL:string = environment.IMAGE_URL;
  pgid:string;
  error:any;
  _id;
  loading:any;
  disabled = "";
  pg:PGDetails;

  constructor(private $pgowner:PGOwnerService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private uploadService:UploadService,
              private $image:ImagesService,
              private $common:CommonService) {

  }



  ngOnInit() {
    this.room = new Room({});
    var self = this;
    this.activatedRoute.params.forEach((params:Params) => {
      this.pgid = params['pgId'];
      let roomId = params['roomId'];
      if (!_.isEmpty(roomId)) {
        this.$pgowner.find({
          query: {
            _id: this.pgid,
            "rooms.roomid": roomId
          }
        }).then(response => {
          this.pg=response;
          if (!_.isEmpty(response)) {
            console.log(response)
            this.room = _.find(response[0].rooms, function (o) {
              return _.isEqual(o.roomid, roomId)
            });
            this.setTabActive();
          }

        }).catch(error => {
          this.$common.error(error)
        });
      }
    });

    $('.ui.selection.dropdown').dropdown();

    $('.circular.image').dimmer({
      on: 'hover'
    });
    $(".checkbox").checkbox();
  }

  ngAfterViewInit() {
    debugger;
    let self = this;

    var $single = this.uploadService.uploadImage("single-sharing", "Upload Images", $);
    var $double = this.uploadService.uploadImage("double-sharing", "Upload Images", $);
    var $triple = this.uploadService.uploadImage("triple-sharing", "Upload Images", $);
    var $four = this.uploadService.uploadImage("four-sharing", "Upload Images", $);

    $single
      .on("filebatchselected", function (event, file) {
        self.validate_file(self, file, $single);
      }).on('fileuploaded', function (event, data) {

      let files = {};
      _.each(data.files, file=> {
        files["name"] = file.name;
        files["size"] = bytes(file.size, {unitSeparator: ' '});
        files["type"] = file.type;
      })
      files["deleteId"] = data.response.initialPreviewConfig[0].key;
      files["fileid"] = "api/image/download/" + data.response.fileid;
      self.room.simages.push(files);
      self.$common.success("File Uploaded Successfully");
    });


    $double
      .on("filebatchselected", function (event, file) {
        self.validate_file(self, file, $double);
      })
      .on('fileuploaded', function (event, data) {
        let files = {};
        _.each(data.files, file=> {
          files["name"] = file.name;
          files["size"] = bytes(file.size, {unitSeparator: ' '});
          files["type"] = file.type;
        })
        files["deleteId"] = data.response.initialPreviewConfig[0].key;
        files["fileid"] = "api/image/download/" + data.response.fileid;
        self.room.dimages.push(files);
        self.$common.success("File Uploaded Successfully");
      });


    $triple
      .on("filebatchselected", function (event, file) {
        self.validate_file(self, file, $triple);
      })
      .on('fileuploaded', function (event, data) {
        let files = {};
        _.each(data.files, file=> {
          files["name"] = file.name;
          files["size"] = bytes(file.size, {unitSeparator: ' '});
          files["type"] = file.type;
        })
        files["deleteId"] = data.response.initialPreviewConfig[0].key;
        files["fileid"] = "api/image/download/" + data.response.fileid;
        self.room.timages.push(files);
        self.$common.success("File Uploaded Successfully");
      });


    $four
      .on("filebatchselected", function (event, file) {
        self.validate_file(self, file, $four);
      })
      .on('fileuploaded', function (event, data) {
        let files = {};
        _.each(data.files, file=> {
          files["name"] = file.name;
          files["size"] = bytes(file.size, {unitSeparator: ' '});
          files["type"] = file.type;
        })
        files["deleteId"] = data.response.initialPreviewConfig[0].key;
        files["fileid"] = "api/image/download/" + data.response.fileid;
        self.room.fimages.push(files);
        self.$common.success("File Uploaded Successfully");
      });

    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        on: 'blur',
        onSuccess: function () {
          if (!self.validate()) {
            self.saveRoom();
          }
          return false; // false is required if you do don't want to let it submit
        },

      });
  }

  submit(){
    console.log(this.room)
   // $(".save").click();
  }

  goBack() {
    this.router.navigateByUrl('/user/addpg/' + this.pgid);
  }

  saveRoom() {
    this.room.roomType = $(".roomType").dropdown("get value");
    this.$pgowner.saveRoom(this.room, this.pgid).then(response => {
      if (!_.isUndefined(response)) {
        this.router.navigateByUrl('/user/addpg/' + response._id);
        this.$common.success("Data saved successfully!!");
      }
    }).catch(error => {
      this.$common.error(error)
    });
  }


  setTabActive() {
    this.single = !this.room.single;
    this.double = !this.room.double;
    this.triple = !this.room.triple;
    this.four = !this.room.four;

    $(".roomType").dropdown("set selected", this.room.roomType);
  }

  validate_file(self, file, $input) {
    if (!_.isEqual(file.length, 0)) {
      if (!(Number(5242880) > file[0].size)) {
        self.$common.warning('Maximum upload file size is allowed 5 MB');
      } else if (_.isEqual(_.indexOf(self.file_type, file[0].type), -1)) {
        self.$common.warning("Allowed File Extensions ['jpg', 'gif', 'png', 'jpeg'], Please upload valid file");
      } else {
        $input.fileinput("upload");
      }
    } else {
      self.$common.warning("Allowed File Extensions ['jpg', 'gif', 'png', 'jpeg'], Please upload valid file");
    }

  }

  delete() {
    var self = this;
    $("#modal_info_close").click();
    event.stopPropagation();
    this.$image
      .delete(this._id.split("-")[0])
      .then(response => {
        _.remove(this.room[this._id.split("-")[2]], {deleteId: this._id.split("-")[0]});
        this.$common.success("Deleted Successfully!!");
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

  onDelete(_id, i, type) {
    this._id = _id + "-" + i + "-" + type;
  }

  beforeUpload(cssClass) {
    $('.' + cssClass).trigger('click');
  }

  validate() {
    if (_.toNumber($("#sAvailableVacancies").val()) > _.toNumber($("#sAvailableRooms").val())) {
      $(".ui.form").form('add prompt', 'sAvailableVacancies', 'Available Vacancies should be less than the Available Rooms');
      return true;
    }
    if (_.toNumber($("#dAvailableVacancies").val()) > _.toNumber($("#dAvailableRooms").val())) {
      $(".ui.form").form('add prompt', 'dAvailableVacancies', 'Available Vacancies should be less than the Available Rooms');
      return true;
    }
    if (_.toNumber($("#tAvailableVacancies").val()) > _.toNumber($("#tAvailableRooms").val())) {
      $(".ui.form").form('add prompt', 'tAvailableVacancies', 'Available Vacancies should be less than the Available Rooms');
      return true;
    }
    if (_.toNumber($("#fAvailableVacancies").val()) > _.toNumber($("#fsAvailableRooms").val())) {
      $(".ui.form").form('add prompt', 'fAvailableVacancies', 'Available Vacancies should be less than the Available Rooms');
      return true;
    }
    return false;
  }

}
let validationRules = {
  sAvailableRooms: {
    identifier: 'sAvailableRooms',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  dAvailableRooms: {
    identifier: 'dAvailableRooms',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  tAvailableRooms: {
    identifier: 'tAvailableRooms',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  fAvailableRooms: {
    identifier: 'fAvailableRooms',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  sAvailableVacancies: {
    identifier: 'sAvailableVacancies',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  dAvailableVacancies: {
    identifier: 'dAvailableVacancies',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  tAvailableVacancies: {
    identifier: 'tAvailableVacancies',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  fAvailableVacancies: {
    identifier: 'fAvailableVacancies',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  sExpectedDeposit: {
    identifier: 'sExpectedDeposit',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  dExpectedDeposit: {
    identifier: 'dExpectedDeposit',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  tExpectedDeposit: {
    identifier: 'tExpectedDeposit',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  fExpectedDeposit: {
    identifier: 'fExpectedDeposit',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  sExpectedRentWithFood: {
    identifier: 'sExpectedRentWithFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  dExpectedRentWithFood: {
    identifier: 'dExpectedRentWithFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  tExpectedRentWithFood: {
    identifier: 'tExpectedRentWithFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  fExpectedRentWithFood: {
    identifier: 'fExpectedRentWithFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  sExpectedRentWithoutFood: {
    identifier: 'sExpectedRentWithoutFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  dExpectedRentWithoutFood: {
    identifier: 'dExpectedRentWithoutFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  tExpectedRentWithoutFood: {
    identifier: 'tExpectedRentWithoutFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },
  fExpectedRentWithoutFood: {
    identifier: 'fExpectedRentWithoutFood',
    rules: [
      {
        type: 'number',
        prompt: 'Please enter valid number'
      }
    ]
  },


};
