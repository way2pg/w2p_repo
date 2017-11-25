import {Directive, Input} from '@angular/core';
declare var $:any;

@Directive({selector: '[owl]'})
export class OwlDirective {

  @Input('owl')
  set activate(isactivate:boolean) {
    if (isactivate) this.activateOwl();
  }

  private activateOwl() {
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

    $("#home-slider").owlCarousel({
      navigation: true, // Show next and prev buttons
      pagination: true,
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

    $("#home-gallery-items").owlCarousel({
      navigation: true, // Show next and prev buttons
      pagination: false,
      slideSpeed: 300,
      loop: true,
      paginationSpeed: 400,
      singleItem: true,
      stopOnHover: true,
      navigationText: [
        "<i class='icon-arrow-left32'></i>",
        "<i class='icon-arrow-right32'></i>"
      ]
    });

    (function BodHt() {
      $('.slider-item,.banner-popup,#home-gallery-items iframe').height($(window).height() - 40);
    })();
  }
}
