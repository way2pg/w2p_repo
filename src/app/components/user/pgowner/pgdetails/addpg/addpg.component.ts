import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PGDetails} from "../../../../../models/pgowner/pgdetails";
import {PGOwnerService} from "../../../../../services/pgowner/pgowner.service";
import {CommonService} from "../../../../../services/common/common.service";

var _ = require('lodash');

declare var $:any;
declare var google:any;
declare var PNotify:any;

@Component({
  selector: 'pg-owner',
  templateUrl: './addpg.component.html',
  styleUrls: ['./addpg.component.css']
})

export class AddPGComponent implements OnInit, AfterViewInit {

  @Input() pgdetails:PGDetails;
  isDataAvailable:boolean = true;
  error:any;
  type:any;
  notify:any;
  @Input() spinner = false;
  autocomplete;
  infowindow;
  marker;
  map;
  /*
   geocoder;   */

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $pgowner:PGOwnerService) {
    this.pgdetails = new PGDetails({});
    this.notify = this.$pgowner.notify;
  }

  ngOnInit() {
    this.activate();
    this.activatedRoute.params.forEach((params:Params) => {
      if (params['id']) {
        this.$pgowner.get(params['id']).then(pgdetails => {
          if (!_.isNull(pgdetails)) {
            $(".datatable-rooms").DataTable().destroy();
            this.pgdetails = pgdetails;
            if (!_.isNull(this.pgdetails.place_id) && !_.isUndefined(this.pgdetails.place_id)) {
              this.geocodePlaceId();
            }
            setTimeout(()=>this.activate(), 50);
          }
        }).catch(error => {
          this.$common.error(error)
        });
      }
    });

    $('.ui.selection.dropdown').dropdown();
    $('.ui.checkbox').checkbox();
    $('.circular.image').dimmer({
      on: 'hover'
    });

  }

  ngAfterViewInit():void {
    var self = this;
    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        onSuccess: function () {
          if (_.isEqual(self.type, 'save')) {
            self.save();
          } else {
            self.addrooms();
          }
          return false;
        },
      });
    this.geolocate();
  }

  save() {
    if (_.isUndefined(this.pgdetails._id)) {
      this.$pgowner.create(this.pgdetails).then(response => {
        this.pgdetails = response;
        this.notify.success("PGDetails Saved Successfully!!", "Success");
      }).catch(error => {
        this.$common.error(error)
      });
    } else {
      this.$pgowner.patch(this.pgdetails._id, this.pgdetails).then(response => {
        this.pgdetails = response;
        this.notify.success("PGDetails updated Successfully!!", "Success");
      }).catch(error => {
        this.$common.error(error)
      });

    }

  }

  geolocate() {
    let self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var input = document.getElementById('pac-input');
    this.autocomplete = new google.maps.places.Autocomplete(
      (input),
      {types: ['geocode']});
    this.autocomplete.bindTo('bounds', this.map);
    this.infowindow = new google.maps.InfoWindow();
    this.marker = new google.maps.Marker({
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29)
    });
    google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
      debugger;
      self.infowindow.close();
      self.marker.setVisible(false);
      var place = this.autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
      }
      console.log(place)
      self.pgdetails.locality = null;
      self.pgdetails.landmark = null;
      self.pgdetails.country = null;
      self.pgdetails.state = null;
      self.pgdetails.city = null;
      self.pgdetails.pincode = null;

      _.forEach(place.address_components, (value) => {
        console.log(value);
        if (_.isEqual(value.types[0], "sublocality_level_1")) {
          self.pgdetails.locality = place.name + ", " + value.long_name;
        }
        if (_.isEqual(value.types[0], "sublocality_level_2")) {
          self.pgdetails.landmark = value.long_name;
        }
        if (_.isEqual(value.types[0], "country")) {
          self.pgdetails.country = value.long_name;
        }
        if (_.isEqual(value.types[0], "administrative_area_level_1")) {
          self.pgdetails.state = value.long_name;
        }
        if (_.isEqual(value.types[0], "locality")) {
          self.pgdetails.city = value.long_name;
        }

        if (_.isEqual(value.types[0], "postal_code")) {
          self.pgdetails.pincode = value.long_name;
        }

      });

      // If the place has a geometry, then present it on a map.
      console.log(place.geometry.viewport)
      if (place.geometry.viewport) {
        self.map.fitBounds(place.geometry.viewport);
      } else {
        self.map.setCenter(place.geometry.location);
        self.map.setZoom(17);
      }
      self.marker.setIcon(({
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35)
      }));
      self.marker.setPosition(place.geometry.location);
      self.marker.setVisible(true);
      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }
      self.pgdetails.place_name = place.name;
      self.pgdetails.place_id = place.place_id;

      self.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
      self.infowindow.open(self.map, self.marker);
      $(".ui.segment").click();
    })
  }

  geocodePlaceId() {
    let self = this;
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    var geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow();
    var placeId = this.pgdetails.place_id;
    geocoder.geocode({'placeId': placeId}, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          let place = results[0];
          self.map.setCenter(place.geometry.location);
          self.map.setZoom(17);
          self.marker = new google.maps.Marker({
            map: self.map,
            position: place.geometry.location
          });
          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }
          console.log(place)
          self.infowindow.setContent('<div><strong>' + self.pgdetails.place_name + '</strong><br>' + address);
          self.infowindow.open(self.map, self.marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  addrooms() {
    debugger;
    if (_.isUndefined(this.pgdetails._id)) {
      this.$pgowner.create(this.pgdetails).then(response => {
        if (!_.isEmpty(response)) {
          this.notify.success("PGDetails Saved Successfully!!", "Success");
          this.router.navigate(['/user/addrooms', response._id, '']);
        }
      }).catch(error => {
        console.log(error)
        this.$common.error(error)
      });
    } else {
      this.router.navigate(['/user/addrooms', this.pgdetails._id, '']);
    }
  }

  showRooms(id:any) {
    this.router.navigate(['/user/addrooms', this.pgdetails._id, id]);
  }

  goBack() {
    this.router.navigateByUrl('/user/viewpgs');
  }

  private activate() {

    $.extend($.fn.dataTable.defaults, {
      buttons: []
    });
    $('.datatable-rooms').DataTable({
      bFilter: false,
      bInfo: false,
      paging: false
    });

  }

  submit(){
    $(".save").click()
  }
}

let validationRules = {
  pgname: {
    identifier: 'pgname',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter pg name'
      }
    ]
  },
  city: {
    identifier: 'city',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select city'
      }
    ]
  },
  locality: {
    identifier: 'locality',
    rules: [
      {
        type: 'empty',
        prompt: 'Please select locality'
      }
    ]
  },
  street: {
    identifier: 'street',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter street details'
      }
    ]
  }
  ,
  apartmentName: {
    identifier: 'apartmentName',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter apartment name'
      }
    ]
  }
  ,
  landmark: {
    identifier: 'landmark',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter landmark'
      }
    ]
  }
  ,
  pincode: {
    identifier: 'pincode',
    rules: [
      {
        type: 'empty',
        prompt: 'Please enter pincode'
      },
      {
        type: 'number',
        prompt: 'Please enter valid pincode'
      }
    ]
  }
}
