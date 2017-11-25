import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FoodModel} from "../../../../models/pgowner/food";
import {FoodService} from "../../../../services/pgowner/food.service";
import {CommonService} from "../../../../services/common/common.service";


declare var $:any;
var _ = require('lodash');
const moment = require("moment")

@Component({
  selector: 'pg-owner',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})

export class FoodComponent implements OnInit {


  @Input() foodModel:FoodModel = new FoodModel({});
  @Input() isDataAvailable:boolean = false;

  food:any;
  _id:any = null;
  error:any;
  @Input() data = null;
  pageLength = 5;
  
  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private $common:CommonService,
              private $foodService:FoodService) {

  }

  ngOnInit() {
    let self = this;
    self.dataTable();

    this.$foodService.find({}).then(response => {
      $(".food_menu").DataTable().destroy();
      if (!_.isEmpty(response)) {
        this.isDataAvailable = true;
        this.foodModel = response;
      }
      setTimeout(()=>this.dataTable(), 50);
    }).catch(error => {
      this.$common.error(error)
    });

  }

  delete(event:any) {
    $("#modal_info_close").click();
    event.stopPropagation();
    this.$foodService
      .remove(this.food._id, {})
      .then(response => {
        if (response) {
          debugger;
          this.$common.notify().success("Successfully Deleted!!");
          this.foodModel = response.data;
          $(".food_menu").DataTable().row($("#" + this.food._id)).remove().draw();
          this.food = null;
        }
      })
      .catch(error => {
        this.$common.error(error)
      });
  }

  onDelete(food:any) {
    debugger;
    this.food = food;
  }

  goBack() {
    window.history.back();
  }

  checkData() {
    return this.isDataAvailable;
  }

  showFoodMenu() {
    this.router.navigateByUrl('/user/food/add');
  }

  getDateRange(week_number) {
    let week_range = moment().week(week_number).startOf('isoWeek').format("MM-DD-YYYY")
      + " - " + moment().week(week_number).endOf('isoWeek').format("MM-DD-YYYY")
    return week_range;
  }

  show() {
    return !_.startsWith(this.router.url, '/reports');
  }
  dataTable() {
    let self = this;
    $.extend($.fn.dataTable.defaults, {
      autoWidth: false,
      dom: '<"datatable-header"fBl><"datatable-scroll-wrap"t><"datatable-footer"ip>',
      language: {
        search: '<span>Filter:</span> _INPUT_',
        lengthMenu: '<span>Show:</span> _MENU_',
        paginate: {'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;'}
      },
      buttons: [
        {
          extend: 'colvis',
          text: '<i class="icon-three-bars"></i> <span class="caret"></span>',
          className: 'btn bg-blue btn-icon',
          collectionLayout: 'fixed four-column',
          postfixButtons: ['colvisRestore']
        }
      ]
    });
    // External table additions
    // ------------------------------
    console.log(self.pageLength)
    $('.food_menu').DataTable({
      "pageLength": self.pageLength,
      columnDefs: [

      ]
    });

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Type to filter...');

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
      minimumResultsForSearch: Infinity,
      width: 'auto'
    });
  }
}
