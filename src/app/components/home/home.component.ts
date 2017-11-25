import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {SearchService} from "../../services/search/search.service";

declare var $:any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit, AfterViewInit {

  @Input() search_data:any;

  constructor(private router:Router,
              private searchService:SearchService) {

  }

  ngOnInit() {

    
    let currentUrl = this.router.url;
    console.log(currentUrl)
  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {
    var self = this;
    $(".owl-carousel").owlCarousel({
      center: true,
      items: 1,
      pagination: false,
      slideSpeed: 300,
      loop: true,
      paginationSpeed: 400,
      singleItem: true,
      stopOnHover: true,
      autoplay: true,
      autoplayHoverPause: true
    });

    // Fixed width. Single select
    $('.gender-select').select2({
      minimumResultsForSearch: Infinity,
      width: 250
    });

    $('.ui.dropdown')
      .dropdown()
    ;

    $('.ui.form')
      .form({
        fields: validationRules,
        inline: true,
        on: 'blur',
        onSuccess: function () {
          self.search();
          return false; // false is required if you do don't want to let it submit
        },
      });
  }

  search() {
    console.log("Search Value is => " + this.search_data);
    this.searchService.search_data = this.search_data;
    this.router.navigateByUrl("/search");
  }
}

let validationRules = {}
