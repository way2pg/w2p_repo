import {Component, OnInit, AfterViewInit, Input, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {SearchService} from "../../services/search/search.service";
import {environment} from "../../../environments/environment.prod";
import {Comments} from "../../models/comments";
import {CommonService} from "../../services/common/common.service";
import {PGOwnerService} from "../../services/pgowner/pgowner.service";
import {CommentService} from "../../services/common/comments";
import {PGDetails} from "../../models/pgowner/pgdetails";
const elasticlunr = require("elasticlunr");
const Fuse = require("fuse.js")

declare var $:any;


const _ = require('lodash');
const moment = require('moment');
declare var PNotify:any;
const slimScroll = require("jquery-slimscroll")
var index;

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit, AfterViewInit,OnDestroy {
  @Input() pgdetails:PGDetails[];
  isDataAvailable:boolean = true;
  imageURL:string = environment.IMAGE_URL;
  @Input() roomAvailableFor:any;
  @Input() sharingType:any;
  @Input() search_data:any = null;
  min = 0;
  max = 25000;

  selectedRow:Number;
  setClickedRow:Function;

  foodIncluded = null;
  wifi = null;
  ac = null;
  laundray = null;
  tv = null;
  lift = null;
  gyser = null;
  attachedToilet = null;
  roomCleaning = null;
  wardenFacility = null;

  pgcomments:Comments[] = []
  comment:string;
  comments = new Comments({});
  data;
  fuse;
  query = "";

  constructor(private router:Router,
              private route:ActivatedRoute,
              private $common:CommonService,
              private $owner:PGOwnerService,
              private _searchService:SearchService,
              private $comments:CommentService) {

  }

  ngOnInit() {
    if (this.route.snapshot.params['search_data']) {
      this.search_data = this.route.snapshot.params['search_data'];
    } else {
      this.search_data = this._searchService.search_data;
    }
    this.get()
  }

  public get() {
    var self = this;
    this.$owner.search({
      query: {
        search: true
      }
    }).then(pgdata => {
      console.log(pgdata.length)
      $(".datatable-basic").DataTable().destroy();
      this.pgdetails = this.data = pgdata;
      this.setImages();
      setTimeout(()=> {
        this.activateDataTable()
      }, 50)

      var keys = []
      _.mapKeys(self.flatten(self.data[0]), function (value, key) {
        if (!_.hasIn(keys, key)) {
          keys.push(key)
        }
      })

      _.forEach(self.data, function (object, i) {
        _.forEach(object.rooms, function (rooms, j) {
          _.mapKeys(rooms, function (value, key) {
            if (_.isBoolean(value)) {
              if (_.isEqual(key, "single") || _.isEqual(key, "double") || _.isEqual(key, "triple") || _.isEqual(key, "four")) {
                self.data[i].rooms[j][key] = key;
              } else {
                self.data[i].rooms[j][key] = key.substring(1, key.length);
              }
            }
          })
        })
      })

      var options = {
        shouldSort: true,
        caseSensitive: true,
        matchAllTokens: true,
        findAllMatches: true,
        tokenize: true,
        threshold: 0.6,
        keys: keys
      };
      this.fuse = new Fuse(pgdata, options);

      if (!_.isNull(this.search_data)) {
        this.pgdetails = this.fuse.search(this.search_data)
        this.setImages()
        setTimeout(()=> {
          this.activateDataTable()
        }, 50)
      }

    })

  }

  show(event) {
    if (!_.isEmpty(this.search_data)) {
      $(".datatable-basic").DataTable().destroy();
      this.pgdetails = this.fuse.search(this.search_data)
      this.setImages()
      setTimeout(() => {
        this.activateDataTable()
      }, 20)
    } else {
      $(".datatable-basic").DataTable().destroy();
      this.pgdetails = this.data;
      this.setImages()
      setTimeout(() => {
        this.activateDataTable()
      }, 20)
    }
  }


  ngAfterViewChecked() {
    $(".pre-slider").owlCarousel({
      navigation: true, // Show next and prev buttons
      pagination: false,
      slideSpeed: 300,
      loop: true,
      paginationSpeed: 400,
      singleItem: true,
      navigationText: [
        "<i class='icon-arrow-left32'></i>",
        "<i class='icon-arrow-right32'></i>"
      ],
      autoPlay: true,
      autoplayHoverPause: true,
      stopOnHover: true
    });
  }

  ngAfterViewInit() {
    var self = this;
    $(".styled, .multiselect-container input").uniform({
      radioClass: 'choice'
    });

    // Range slider
    $(".ui-slider-range").slider({
      range: true,
      min: 0,
      max: 25000,
      values: [0, 25000],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);

      },
      stop: function (event, ui) {
        self.min = ui.values[0];
        self.max = ui.values[1];
        self.leftSearch();
      }
    });
    $("#amount").val("$" + $("#ui-slider-range").slider("values", 0) +
      " - $" + $("#ui-slider-range").slider("values", 1));

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  search() {
    this.selectedRow = undefined;
    if (_.isEqual(_.lowerCase(this.search_data), "gents") || _.isEqual(_.lowerCase(this.search_data), "boys") || _.isEqual(_.lowerCase(this.search_data), "boy")) {
      this.search_data = "Male"
    } else if (_.isEqual(_.lowerCase(this.search_data), "ladies") || _.isEqual(_.lowerCase(this.search_data), "girls") || _.isEqual(_.lowerCase(this.search_data), "girl")) {
      this.search_data = "Female"
    }

    this.$owner.find({
      query: {
        $populate: ['comments.user'],
        $search: this.search_data
      }
    }).then(response => {
      console.log(response)
      $(".datatable-basic").DataTable().destroy();
      this.pgdetails = response;
      _.each(this.pgdetails, function (pgdetails) {
        let images = []
        _.each(pgdetails.rooms, function (room) {
          _.each(room.simages, function (simages) {
            images.push(simages)
          })
          _.each(room.dimages, function (dimages) {
            images.push(dimages)
          })
          _.each(room.timages, function (timages) {
            images.push(timages)
          })
          _.each(room.fimages, function (fimages) {
            images.push(fimages)
          })
        })
        pgdetails.images = images;
      })

      setTimeout(() => {
        this.activateDataTable()
      }, 50)
    })

    /*this.$common.socket().service("/api/search").find({
     query: {
     "$text": {
     "$search": this.search_data
     }
     }
     }).then(response => {
     console.log(response)

     })*/

  }


  leftSearch() {
    this.pgdetails = this.data;
    let self = this;
    $(".datatable-basic").DataTable().destroy();
    this.query = "";
    if (!_.isUndefined(this.roomAvailableFor)) {
      this.query += "" + this.roomAvailableFor
      this.pgdetails = _.filter(this.data, function (o:PGDetails) {
        return _.isEqual(o.roomAvailableFor, self.roomAvailableFor)
      });
    }

    if (!_.isUndefined(this.sharingType)) {
      let rooms = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (_.isEqual(room[self.sharingType], self.sharingType)) {
            b = true;
          }
        })
        if (b) {
          rooms.push(pgdetails)
        }
      })

      this.pgdetails = rooms;
    }


    if (this.foodIncluded) {
      this.pgdetails = _.filter(this.pgdetails, function (o:PGDetails) {
        return _.isEqual(o.foodIncluded, "Yes")
      });
      console.log("Food Included - " + this.pgdetails.length)
    }

    if (this.wifi) {
      let wifi = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.swifi || room.dwifi || room.twifi || room.fwifi) {
            b = true;
          }
        })
        if (b) {
          wifi.push(pgdetails)
        }
      })
      this.pgdetails = wifi;
      console.log("Wifi - " + this.pgdetails.length)
    }

    if (this.ac) {
      let ac = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sAC || room.dAC || room.tAC || room.fAC) {
            b = true;
          }
        })
        if (b) {
          ac.push(pgdetails)
        }
      })
      this.pgdetails = ac;
      console.log("AC - " + this.pgdetails.length)
    }

    if (this.laundray) {
      let laundray = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sLaundray || room.dLaundray || room.tLaundray || room.fLaundray) {
            b = true;
          }
        })
        if (b) {
          laundray.push(pgdetails)
        }
      })
      this.pgdetails = laundray;
      console.log("Laundary - " + this.pgdetails.length)
    }

    if (this.tv) {
      let tv = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sTV || room.dTV || room.tTV || room.fTV) {
            b = true;
          }
        })
        if (b) {
          tv.push(pgdetails)
        }
      })
      this.pgdetails = tv;
      console.log("TV - " + this.pgdetails.length)
    }

    if (this.lift) {
      let lift = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sLift || room.dLift || room.tLift || room.fLift) {
            b = true;
          }
        })
        if (b) {
          lift.push(pgdetails)
        }
      })
      this.pgdetails = lift;
      console.log("Lift - " + this.pgdetails.length)
    }

    if (this.gyser) {
      let gyser = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sGyser || room.dGyser || room.tGyser || room.fGyser) {
            b = true;
          }
        })
        if (b) {
          gyser.push(pgdetails)
        }
      })
      this.pgdetails = gyser;
      console.log("Gyser - " + this.pgdetails.length)
    }


    if (this.attachedToilet) {
      let attachedToilet = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sAttachedToilet || room.dAttachedToilet || room.tAttachedToilet || room.fAttachedToilet) {
            b = true;
          }
        })
        if (b) {
          attachedToilet.push(pgdetails)
        }
      })
      this.pgdetails = attachedToilet;
      console.log("Attached Toilet - " + this.pgdetails.length)
    }

    if (this.roomCleaning) {
      let roomCleaning = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sRoomCleaning || room.dRoomCleaning || room.tRoomCleaning || room.fRoomCleaning) {
            b = true;
          }
        })
        if (b) {
          roomCleaning.push(pgdetails)
        }
      })
      this.pgdetails = roomCleaning;
      console.log("Room Cleaning - " + this.pgdetails.length)
    }

    if (this.wardenFacility) {
      let wardenFacility = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (room.sWardenFacility || room.dWardenFacility || room.tWardenFacility || room.fWardenFacility) {
            b = true;
          }
        })
        if (b) {
          wardenFacility.push(pgdetails)
        }
      })
      this.pgdetails = wardenFacility;
      console.log("Warden Facility - " + this.pgdetails.length)
    }

    if (this.min != null && this.max != null) {
      let rent = []
      _.forEach(this.pgdetails, function (pgdetails) {
        let b = false;
        _.forEach(pgdetails.rooms, function (room) {
          if (_.gte(room.sExpectedRentWithFood, self.min) && _.lte(room.sExpectedRentWithFood, self.max) ||
            _.gte(room.dExpectedRentWithFood, self.min) && _.lte(room.dExpectedRentWithFood, self.max) ||
            _.gte(room.tExpectedRentWithFood, self.min) && _.lte(room.tExpectedRentWithFood, self.max) ||
            _.gte(room.fExpectedRentWithFood, self.min) && _.lte(room.fExpectedRentWithFood, self.max)) {
            b = true;
          }
        })
        if (b) {
          rent.push(pgdetails)
        }
      })
      this.pgdetails = rent;
      console.log("Rent - " + this.pgdetails.length)
    }


    this.setImages()

    $(".datatable-basic").DataTable().destroy();
    setTimeout(()=> {
      this.activateDataTable()
    }, 50)
    this.query = "";

  }

  setImages() {
    _.each(this.pgdetails, function (pgdetails) {
      let images = []
      _.each(pgdetails.rooms, function (room) {
        _.each(room.simages, function (simages) {
          images.push(simages)
        })
        _.each(room.dimages, function (dimages) {
          images.push(dimages)
        })
        _.each(room.timages, function (timages) {
          images.push(timages)
        })
        _.each(room.fimages, function (fimages) {
          images.push(fimages)
        })
      })
      pgdetails.images = images;
    })
    console.log(this.pgdetails)
  }

  private activateDataTable() {
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-scroll"t><"datatable-footer"p>',
      language: {
        search: '<span class="animated fadeInRight">Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      }
    });

    $('.datatable-basic').DataTable({
      "destroy": true,
      "ordering": false,
      "pageLength": 8,
    });

    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });
  }

  mComments(pg, index) {
    $('#content-group-' + index).slimScroll({
      destroy: true
    });
    this.selectedRow = index;
    this.$comments.find({
      query: {
        pgid: pg._id
      }
    }).then(response => {
      console.log(response)
      this.pgcomments = response;
      setTimeout(() => {
        $('#content-group-' + index).slimScroll({
          height: '450px',
          start: 'bottom',
        });
        $('#content-group-' + index).animate({scrollTop: $('#content-group-' + index).prop('scrollHeight')}, 1000);
      }, 50)
    })
  }

  post_comment(pg, index) {
    debugger;
    this.comments.pgid = pg._id;
    this.comments.user = this.user()._id;
    console.log(this.comments)
    this.$comments.create(this.comments).then(response => {
      this.success("Your comment posted successfully");
      this.pgdetails[index].comments.push(response);
      this.comments = new Comments({})
      this.pgcomments.push(response)
      setTimeout(() => {
        $('#content-group').slimScroll({
          height: '450px',
          start: 'bottom',
        });
        $('#content-group').animate({scrollTop: $('#content-group').prop('scrollHeight')}, 1000);
      }, 50)
    });
  }

  user() {
    return JSON.parse(localStorage.getItem("user"));
  }

  fromNow(createdAt) {
    return moment(createdAt).fromNow()
  }

  success(message) {
    new PNotify({
      title: 'Success!!',
      text: message,
      addclass: 'alert bg-success alert-styled-left',
    });
  }

  warning(message) {
    new PNotify({
      title: 'Warning!!',
      text: message,
      addclass: 'alert bg-danger alert-styled-left'
    });
  }

  isLoggedIn() {
    return this.$common.isLoggedIn();
  }

  ngOnDestroy() {
    $(".datatable-basic").DataTable().destroy();
  }

  flatten(data) {
    var result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + "[" + i + "]");
        if (l == 0)
          result[prop] = [];
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop)
          result[prop] = {};
      }
    }

    recurse(data, "");
    return result;
  }
}

