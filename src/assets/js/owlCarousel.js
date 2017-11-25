/*
 *  jQuery OwlCarousel v1.3.3
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */
"function" != typeof Object.create && (Object.create = function (e) {
  function t() {
  }

  return t.prototype = e, new t
}),
  function (e, t, n) {
    var i = {
      init: function (t, n) {
        var i = this;
        i.$elem = e(n), i.options = e.extend({}, e.fn.owlCarousel.options, i.$elem.data(), t), i.userOptions = t, i.loadContent()
      },
      loadContent: function () {
        function t(e) {
          var t, n = "";
          if ("function" == typeof i.options.jsonSuccess) i.options.jsonSuccess.apply(this, [e]);
          else {
            for (t in e.owl) e.owl.hasOwnProperty(t) && (n += e.owl[t].item);
            i.$elem.html(n)
          }
          i.logIn()
        }

        var n, i = this;
        "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (n = i.options.jsonPath, e.getJSON(n, t)) : i.logIn()
      },
      logIn: function () {
        var e = this;
        e.$elem.data("owl-originalStyles", e.$elem.attr("style")), e.$elem.data("owl-originalClasses", e.$elem.attr("class")), e.$elem.css({
          opacity: 0
        }), e.orignalItems = e.options.items, e.checkBrowser(), e.wrapperWidth = 0, e.checkVisible = null, e.setVars()
      },
      setVars: function () {
        var e = this;
        return 0 === e.$elem.children().length ? !1 : (e.baseClass(), e.eventTypes(), e.$userItems = e.$elem.children(), e.itemsAmount = e.$userItems.length, e.wrapItems(), e.$owlItems = e.$elem.find(".owl-item"), e.$owlWrapper = e.$elem.find(".owl-wrapper"), e.playDirection = "next", e.prevItem = 0, e.prevArr = [0], e.currentItem = 0, e.customEvents(), void e.onStartup())
      },
      onStartup: function () {
        var e = this;
        e.updateItems(), e.calculateAll(), e.buildControls(), e.updateControls(), e.response(), e.moveEvents(), e.stopOnHover(), e.owlStatus(), e.options.transitionStyle !== !1 && e.transitionTypes(e.options.transitionStyle), e.options.autoPlay === !0 && (e.options.autoPlay = 5e3), e.play(), e.$elem.find(".owl-wrapper").css("display", "block"), e.$elem.is(":visible") ? e.$elem.css("opacity", 1) : e.watchVisibility(), e.onstartup = !1, e.eachMoveUpdate(), "function" == typeof e.options.afterInit && e.options.afterInit.apply(this, [e.$elem])
      },
      eachMoveUpdate: function () {
        var e = this;
        e.options.lazyLoad === !0 && e.lazyLoad(), e.options.autoHeight === !0 && e.autoHeight(), e.onVisibleItems(), "function" == typeof e.options.afterAction && e.options.afterAction.apply(this, [e.$elem])
      },
      updateVars: function () {
        var e = this;
        "function" == typeof e.options.beforeUpdate && e.options.beforeUpdate.apply(this, [e.$elem]), e.watchVisibility(), e.updateItems(), e.calculateAll(), e.updatePosition(), e.updateControls(), e.eachMoveUpdate(), "function" == typeof e.options.afterUpdate && e.options.afterUpdate.apply(this, [e.$elem])
      },
      reload: function () {
        var e = this;
        t.setTimeout(function () {
          e.updateVars()
        }, 0)
      },
      watchVisibility: function () {
        var e = this;
        return e.$elem.is(":visible") !== !1 ? !1 : (e.$elem.css({
          opacity: 0
        }), t.clearInterval(e.autoPlayInterval), t.clearInterval(e.checkVisible), void(e.checkVisible = t.setInterval(function () {
          e.$elem.is(":visible") && (e.reload(), e.$elem.animate({
            opacity: 1
          }, 200), t.clearInterval(e.checkVisible))
        }, 500)))
      },
      wrapItems: function () {
        var e = this;
        e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer" style="overflow: hidden; position: relative; width: 100%;">'), e.wrapperOuter = e.$elem.find(".owl-wrapper-outer"), e.$elem.css("display", "block")
      },
      baseClass: function () {
        var e = this,
          t = e.$elem.hasClass(e.options.baseClass),
          n = e.$elem.hasClass(e.options.theme);
        t || e.$elem.addClass(e.options.baseClass), n || e.$elem.addClass(e.options.theme)
      },
      updateItems: function () {
        var t, n, i = this;
        if (i.options.responsive === !1) return !1;
        if (i.options.singleItem === !0) return i.options.items = i.orignalItems = 1, i.options.itemsCustom = !1, i.options.itemsDesktop = !1, i.options.itemsDesktopSmall = !1, i.options.itemsTablet = !1, i.options.itemsTabletSmall = !1, i.options.itemsMobile = !1, !1;
        if (t = e(i.options.responsiveBaseWidth).width(), t > (i.options.itemsDesktop[0] || i.orignalItems) && (i.options.items = i.orignalItems), i.options.itemsCustom !== !1)
          for (i.options.itemsCustom.sort(function (e, t) {
            return e[0] - t[0]
          }), n = 0; n < i.options.itemsCustom.length; n += 1) i.options.itemsCustom[n][0] <= t && (i.options.items = i.options.itemsCustom[n][1]);
        else t <= i.options.itemsDesktop[0] && i.options.itemsDesktop !== !1 && (i.options.items = i.options.itemsDesktop[1]), t <= i.options.itemsDesktopSmall[0] && i.options.itemsDesktopSmall !== !1 && (i.options.items = i.options.itemsDesktopSmall[1]), t <= i.options.itemsTablet[0] && i.options.itemsTablet !== !1 && (i.options.items = i.options.itemsTablet[1]), t <= i.options.itemsTabletSmall[0] && i.options.itemsTabletSmall !== !1 && (i.options.items = i.options.itemsTabletSmall[1]), t <= i.options.itemsMobile[0] && i.options.itemsMobile !== !1 && (i.options.items = i.options.itemsMobile[1]);
        i.options.items > i.itemsAmount && i.options.itemsScaleUp === !0 && (i.options.items = i.itemsAmount)
      },
      response: function () {
        var n, i, r = this;
        return r.options.responsive !== !0 ? !1 : (i = e(t).width(), r.resizer = function () {
          e(t).width() !== i && (r.options.autoPlay !== !1 && t.clearInterval(r.autoPlayInterval), t.clearTimeout(n), n = t.setTimeout(function () {
            i = e(t).width(), r.updateVars()
          }, r.options.responsiveRefreshRate))
        }, void e(t).resize(r.resizer))
      },
      updatePosition: function () {
        var e = this;
        e.jumpTo(e.currentItem), e.options.autoPlay !== !1 && e.checkAp()
      },
      appendItemsSizes: function () {
        var t = this,
          n = 0,
          i = t.itemsAmount - t.options.items;
        t.$owlItems.each(function (r) {
          var a = e(this);
          a.css({
            width: t.itemWidth
          }).data("owl-item", Number(r)), (r % t.options.items === 0 || r === i) && (r > i || (n += 1)), a.data("owl-roundPages", n)
        })
      },
      appendWrapperSizes: function () {
        var e = this,
          t = e.$owlItems.length * e.itemWidth;
        e.$owlWrapper.css({
          width: 2 * t,
          left: 0
        }), e.appendItemsSizes()
      },
      calculateAll: function () {
        var e = this;
        e.calculateWidth(), e.appendWrapperSizes(), e.loops(), e.max()
      },
      calculateWidth: function () {
        var e = this;
        e.itemWidth = Math.round(e.$elem.width() / e.options.items)
      },
      max: function () {
        var e = this,
          t = -1 * (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth);
        return e.options.items > e.itemsAmount ? (e.maximumItem = 0, t = 0, e.maximumPixels = 0) : (e.maximumItem = e.itemsAmount - e.options.items, e.maximumPixels = t), t
      },
      min: function () {
        return 0
      },
      loops: function () {
        var t, n, i, r = this,
          a = 0,
          o = 0;
        for (r.positionsInArray = [0], r.pagesInArray = [], t = 0; t < r.itemsAmount; t += 1) o += r.itemWidth, r.positionsInArray.push(-o), r.options.scrollPerPage === !0 && (n = e(r.$owlItems[t]), i = n.data("owl-roundPages"), i !== a && (r.pagesInArray[a] = r.positionsInArray[t], a = i))
      },
      buildControls: function () {
        var t = this;
        (t.options.navigation === !0 || t.options.pagination === !0) && (t.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !t.browser.isTouch).appendTo(t.$elem)), t.options.pagination === !0 && t.buildPagination(), t.options.navigation === !0 && t.buildButtons()
      },
      buildButtons: function () {
        var t = this,
          n = e('<div class="owl-buttons"/>');
        t.owlControls.append(n), t.buttonPrev = e("<div/>", {
          "class": "owl-prev",
          html: t.options.navigationText[0] || ""
        }), t.buttonNext = e("<div/>", {
          "class": "owl-next",
          html: t.options.navigationText[1] || ""
        }), n.append(t.buttonPrev).append(t.buttonNext), n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (e) {
          e.preventDefault()
        }), n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (n) {
          n.preventDefault(), e(this).hasClass("owl-next") ? t.next() : t.prev()
        })
      },
      buildPagination: function () {
        var t = this;
        t.paginationWrapper = e('<div class="owl-pagination"/>'), t.owlControls.append(t.paginationWrapper), t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (n) {
          n.preventDefault(), Number(e(this).data("owl-page")) !== t.currentItem && t.goTo(Number(e(this).data("owl-page")), !0)
        })
      },
      updatePagination: function () {
        var t, n, i, r, a, o, s = this;
        if (s.options.pagination === !1) return !1;
        for (s.paginationWrapper.html(""), t = 0, n = s.itemsAmount - s.itemsAmount % s.options.items, r = 0; r < s.itemsAmount; r += 1) r % s.options.items === 0 && (t += 1, n === r && (i = s.itemsAmount - s.options.items), a = e("<div/>", {
          "class": "owl-page"
        }), o = e("<span></span>", {
          text: s.options.paginationNumbers === !0 ? t : "",
          "class": s.options.paginationNumbers === !0 ? "owl-numbers" : ""
        }), a.append(o), a.data("owl-page", n === r ? i : r), a.data("owl-roundPages", t), s.paginationWrapper.append(a));
        s.checkPagination()
      },
      checkPagination: function () {
        var t = this;
        return t.options.pagination === !1 ? !1 : void t.paginationWrapper.find(".owl-page").each(function () {
          e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), e(this).addClass("active"))
        })
      },
      checkNavigation: function () {
        var e = this;
        return e.options.navigation === !1 ? !1 : void(e.options.rewindNav === !1 && (0 === e.currentItem && 0 === e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.addClass("disabled")) : 0 === e.currentItem && 0 !== e.maximumItem ? (e.buttonPrev.addClass("disabled"), e.buttonNext.removeClass("disabled")) : e.currentItem === e.maximumItem ? (e.buttonPrev.removeClass("disabled"), e.buttonNext.addClass("disabled")) : 0 !== e.currentItem && e.currentItem !== e.maximumItem && (e.buttonPrev.removeClass("disabled"), e.buttonNext.removeClass("disabled"))))
      },
      updateControls: function () {
        var e = this;
        e.updatePagination(), e.checkNavigation(), e.owlControls && (e.options.items >= e.itemsAmount ? e.owlControls.hide() : e.owlControls.show())
      },
      destroyControls: function () {
        var e = this;
        e.owlControls && e.owlControls.remove()
      },
      next: function (e) {
        var t = this;
        if (t.isTransition) return !1;
        if (t.currentItem += t.options.scrollPerPage === !0 ? t.options.items : 1, t.currentItem > t.maximumItem + (t.options.scrollPerPage === !0 ? t.options.items - 1 : 0)) {
          if (t.options.rewindNav !== !0) return t.currentItem = t.maximumItem, !1;
          t.currentItem = 0, e = "rewind"
        }
        t.goTo(t.currentItem, e)
      },
      prev: function (e) {
        var t = this;
        if (t.isTransition) return !1;
        if (t.options.scrollPerPage === !0 && t.currentItem > 0 && t.currentItem < t.options.items ? t.currentItem = 0 : t.currentItem -= t.options.scrollPerPage === !0 ? t.options.items : 1, t.currentItem < 0) {
          if (t.options.rewindNav !== !0) return t.currentItem = 0, !1;
          t.currentItem = t.maximumItem, e = "rewind"
        }
        t.goTo(t.currentItem, e)
      },
      goTo: function (e, n, i) {
        var r, a = this;
        return a.isTransition ? !1 : ("function" == typeof a.options.beforeMove && a.options.beforeMove.apply(this, [a.$elem]), e >= a.maximumItem ? e = a.maximumItem : 0 >= e && (e = 0), a.currentItem = a.owl.currentItem = e, a.options.transitionStyle !== !1 && "drag" !== i && 1 === a.options.items && a.browser.support3d === !0 ? (a.swapSpeed(0), a.browser.support3d === !0 ? a.transition3d(a.positionsInArray[e]) : a.css2slide(a.positionsInArray[e], 1), a.afterGo(), a.singleItemTransition(), !1) : (r = a.positionsInArray[e], a.browser.support3d === !0 ? (a.isCss3Finish = !1, n === !0 ? (a.swapSpeed("paginationSpeed"), t.setTimeout(function () {
          a.isCss3Finish = !0
        }, a.options.paginationSpeed)) : "rewind" === n ? (a.swapSpeed(a.options.rewindSpeed), t.setTimeout(function () {
          a.isCss3Finish = !0
        }, a.options.rewindSpeed)) : (a.swapSpeed("slideSpeed"), t.setTimeout(function () {
          a.isCss3Finish = !0
        }, a.options.slideSpeed)), a.transition3d(r)) : n === !0 ? a.css2slide(r, a.options.paginationSpeed) : "rewind" === n ? a.css2slide(r, a.options.rewindSpeed) : a.css2slide(r, a.options.slideSpeed), void a.afterGo()))
      },
      jumpTo: function (e) {
        var t = this;
        "function" == typeof t.options.beforeMove && t.options.beforeMove.apply(this, [t.$elem]), e >= t.maximumItem || -1 === e ? e = t.maximumItem : 0 >= e && (e = 0), t.swapSpeed(0), t.browser.support3d === !0 ? t.transition3d(t.positionsInArray[e]) : t.css2slide(t.positionsInArray[e], 1), t.currentItem = t.owl.currentItem = e, t.afterGo()
      },
      afterGo: function () {
        var e = this;
        e.prevArr.push(e.currentItem), e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2], e.prevArr.shift(0), e.prevItem !== e.currentItem && (e.checkPagination(), e.checkNavigation(), e.eachMoveUpdate(), e.options.autoPlay !== !1 && e.checkAp()), "function" == typeof e.options.afterMove && e.prevItem !== e.currentItem && e.options.afterMove.apply(this, [e.$elem])
      },
      stop: function () {
        var e = this;
        e.apStatus = "stop", t.clearInterval(e.autoPlayInterval)
      },
      checkAp: function () {
        var e = this;
        "stop" !== e.apStatus && e.play()
      },
      play: function () {
        var e = this;
        return e.apStatus = "play", e.options.autoPlay === !1 ? !1 : (t.clearInterval(e.autoPlayInterval), void(e.autoPlayInterval = t.setInterval(function () {
          e.next(!0)
        }, e.options.autoPlay)))
      },
      swapSpeed: function (e) {
        var t = this;
        "slideSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed)) : "paginationSpeed" === e ? t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed)) : "string" != typeof e && t.$owlWrapper.css(t.addCssSpeed(e))
      },
      addCssSpeed: function (e) {
        return {
          "-webkit-transition": "all " + e + "ms ease",
          "-moz-transition": "all " + e + "ms ease",
          "-o-transition": "all " + e + "ms ease",
          transition: "all " + e + "ms ease"
        }
      },
      removeTransition: function () {
        return {
          "-webkit-transition": "",
          "-moz-transition": "",
          "-o-transition": "",
          transition: ""
        }
      },
      doTranslate: function (e) {
        return {
          "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
          transform: "translate3d(" + e + "px, 0px,0px)"
        }
      },
      transition3d: function (e) {
        var t = this;
        t.$owlWrapper.css(t.doTranslate(e))
      },
      css2move: function (e) {
        var t = this;
        t.$owlWrapper.css({
          left: e
        })
      },
      css2slide: function (e, t) {
        var n = this;
        n.isCssFinish = !1, n.$owlWrapper.stop(!0, !0).animate({
          left: e
        }, {
          duration: t || n.options.slideSpeed,
          complete: function () {
            n.isCssFinish = !0
          }
        })
      },
      checkBrowser: function () {
        var e, i, r, a, o = this,
          s = "translate3d(0px, 0px, 0px)",
          l = n.createElement("div");
        l.style.cssText = "  -moz-transform:" + s + "; -ms-transform:" + s + "; -o-transform:" + s + "; -webkit-transform:" + s + "; transform:" + s, e = /translate3d\(0px, 0px, 0px\)/g, i = l.style.cssText.match(e), r = null !== i && 1 === i.length, a = "ontouchstart" in t || t.navigator.msMaxTouchPoints, o.browser = {
          support3d: r,
          isTouch: a
        }
      },
      moveEvents: function () {
        var e = this;
        (e.options.mouseDrag !== !1 || e.options.touchDrag !== !1) && (e.gestures(), e.disabledEvents())
      },
      eventTypes: function () {
        var e = this,
          t = ["s", "e", "x"];
        e.ev_types = {}, e.options.mouseDrag === !0 && e.options.touchDrag === !0 ? t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : e.options.mouseDrag === !1 && e.options.touchDrag === !0 ? t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : e.options.mouseDrag === !0 && e.options.touchDrag === !1 && (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), e.ev_types.start = t[0], e.ev_types.move = t[1], e.ev_types.end = t[2]
      },
      disabledEvents: function () {
        var t = this;
        t.$elem.on("dragstart.owl", function (e) {
          e.preventDefault()
        }), t.$elem.on("mousedown.disableTextSelect", function (t) {
          return e(t.target).is("input, textarea, select, option")
        })
      },
      gestures: function () {
        function i(e) {
          if (void 0 !== e.touches) return {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
          };
          if (void 0 === e.touches) {
            if (void 0 !== e.pageX) return {
              x: e.pageX,
              y: e.pageY
            };
            if (void 0 === e.pageX) return {
              x: e.clientX,
              y: e.clientY
            }
          }
        }

        function r(t) {
          "on" === t ? (e(n).on(l.ev_types.move, o), e(n).on(l.ev_types.end, s)) : "off" === t && (e(n).off(l.ev_types.move), e(n).off(l.ev_types.end))
        }

        function a(n) {
          var a, o = n.originalEvent || n || t.event;
          if (3 === o.which) return !1;
          if (!(l.itemsAmount <= l.options.items)) {
            if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish) return !1;
            if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish) return !1;
            l.options.autoPlay !== !1 && t.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, e(this).css(l.removeTransition()), a = e(this).position(), u.relativePos = a.left, u.offsetX = i(o).x - a.left, u.offsetY = i(o).y - a.top, r("on"), u.sliding = !1, u.targetElement = o.target || o.srcElement
          }
        }

        function o(r) {
          var a, o, s = r.originalEvent || r || t.event;
          l.newPosX = i(s).x - u.offsetX, l.newPosY = i(s).y - u.offsetY, l.newRelativeX = l.newPosX - u.relativePos, "function" == typeof l.options.startDragging && u.dragging !== !0 && 0 !== l.newRelativeX && (u.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== s.preventDefault ? s.preventDefault() : s.returnValue = !1, u.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && u.sliding === !1 && e(n).off("touchmove.owl"), a = function () {
            return l.newRelativeX / 5
          }, o = function () {
            return l.maximumPixels + l.newRelativeX / 5
          }, l.newPosX = Math.max(Math.min(l.newPosX, a()), o()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
        }

        function s(n) {
          var i, a, o, s = n.originalEvent || n || t.event;
          s.target = s.target || s.srcElement, u.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.dragDirection = l.owl.dragDirection = l.newRelativeX < 0 ? "left" : "right", 0 !== l.newRelativeX && (i = l.getNewPosition(), l.goTo(i, !1, "drag"), u.targetElement === s.target && l.browser.isTouch !== !0 && (e(s.target).on("click.disable", function (t) {
            t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault(), e(t.target).off("click.disable")
          }), a = e._data(s.target, "events").click, o = a.pop(), a.splice(0, 0, o))), r("off")
        }

        var l = this,
          u = {
            offsetX: 0,
            offsetY: 0,
            baseElWidth: 0,
            relativePos: 0,
            position: null,
            minSwipe: null,
            maxSwipe: null,
            sliding: null,
            dargging: null,
            targetElement: null
          };
        l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", a)
      },
      getNewPosition: function () {
        var e = this,
          t = e.closestItem();
        return t > e.maximumItem ? (e.currentItem = e.maximumItem, t = e.maximumItem) : e.newPosX >= 0 && (t = 0, e.currentItem = 0), t
      },
      closestItem: function () {
        var t = this,
          n = t.options.scrollPerPage === !0 ? t.pagesInArray : t.positionsInArray,
          i = t.newPosX,
          r = null;
        return e.each(n, function (a, o) {
          i - t.itemWidth / 20 > n[a + 1] && i - t.itemWidth / 20 < o && "left" === t.moveDirection() ? (r = o, t.currentItem = t.options.scrollPerPage === !0 ? e.inArray(r, t.positionsInArray) : a) : i + t.itemWidth / 20 < o && i + t.itemWidth / 20 > (n[a + 1] || n[a] - t.itemWidth) && "right" === t.moveDirection() && (t.options.scrollPerPage === !0 ? (r = n[a + 1] || n[n.length - 1], t.currentItem = e.inArray(r, t.positionsInArray)) : (r = n[a + 1], t.currentItem = a + 1))
        }), t.currentItem
      },
      moveDirection: function () {
        var e, t = this;
        return t.newRelativeX < 0 ? (e = "right", t.playDirection = "next") : (e = "left", t.playDirection = "prev"), e
      },
      customEvents: function () {
        var e = this;
        e.$elem.on("owl.next", function () {
          e.next()
        }), e.$elem.on("owl.prev", function () {
          e.prev()
        }), e.$elem.on("owl.play", function (t, n) {
          e.options.autoPlay = n, e.play(), e.hoverStatus = "play"
        }), e.$elem.on("owl.stop", function () {
          e.stop(), e.hoverStatus = "stop"
        }), e.$elem.on("owl.goTo", function (t, n) {
          e.goTo(n)
        }), e.$elem.on("owl.jumpTo", function (t, n) {
          e.jumpTo(n)
        })
      },
      stopOnHover: function () {
        var e = this;
        e.options.stopOnHover === !0 && e.browser.isTouch !== !0 && e.options.autoPlay !== !1 && (e.$elem.on("mouseover", function () {
          e.stop()
        }), e.$elem.on("mouseout", function () {
          "stop" !== e.hoverStatus && e.play()
        }))
      },
      lazyLoad: function () {
        var t, n, i, r, a, o = this;
        if (o.options.lazyLoad === !1) return !1;
        for (t = 0; t < o.itemsAmount; t += 1) n = e(o.$owlItems[t]), "loaded" !== n.data("owl-loaded") && (i = n.data("owl-item"), r = n.find(".lazyOwl"), "string" == typeof r.data("src") ? (void 0 === n.data("owl-loaded") && (r.hide(), n.addClass("loading").data("owl-loaded", "checked")), a = o.options.lazyFollow === !0 ? i >= o.currentItem : !0, a && i < o.currentItem + o.options.items && r.length && o.lazyPreload(n, r)) : n.data("owl-loaded", "loaded"))
      },
      lazyPreload: function (e, n) {
        function i() {
          e.data("owl-loaded", "loaded").removeClass("loading"), n.removeAttr("data-src"), "fade" === o.options.lazyEffect ? n.fadeIn(400) : n.show(), "function" == typeof o.options.afterLazyLoad && o.options.afterLazyLoad.apply(this, [o.$elem])
        }

        function r() {
          s += 1, o.completeImg(n.get(0)) || a === !0 ? i() : 100 >= s ? t.setTimeout(r, 100) : i()
        }

        var a, o = this,
          s = 0;
        "DIV" === n.prop("tagName") ? (n.css("background-image", "url(" + n.data("src") + ")"), a = !0) : n[0].src = n.data("src"), r()
      },
      autoHeight: function () {
        function n() {
          var n = e(a.$owlItems[a.currentItem]).height();
          a.wrapperOuter.css("height", n + "px"), a.wrapperOuter.hasClass("autoHeight") || t.setTimeout(function () {
            a.wrapperOuter.addClass("autoHeight")
          }, 0)
        }

        function i() {
          r += 1, a.completeImg(o.get(0)) ? n() : 100 >= r ? t.setTimeout(i, 100) : a.wrapperOuter.css("height", "")
        }

        var r, a = this,
          o = e(a.$owlItems[a.currentItem]).find("img");
        void 0 !== o.get(0) ? (r = 0, i()) : n()
      },
      completeImg: function (e) {
        var t;
        return e.complete ? (t = typeof e.naturalWidth, "undefined" !== t && 0 === e.naturalWidth ? !1 : !0) : !1
      },
      onVisibleItems: function () {
        var t, n = this;
        for (n.options.addClassActive === !0 && n.$owlItems.removeClass("active"), n.visibleItems = [], t = n.currentItem; t < n.currentItem + n.options.items; t += 1) n.visibleItems.push(t), n.options.addClassActive === !0 && e(n.$owlItems[t]).addClass("active");
        n.owl.visibleItems = n.visibleItems
      },
      transitionTypes: function (e) {
        var t = this;
        t.outClass = "owl-" + e + "-out", t.inClass = "owl-" + e + "-in"
      },
      singleItemTransition: function () {
        function e(e) {
          return {
            position: "relative",
            left: e + "px"
          }
        }

        var t = this,
          n = t.outClass,
          i = t.inClass,
          r = t.$owlItems.eq(t.currentItem),
          a = t.$owlItems.eq(t.prevItem),
          o = Math.abs(t.positionsInArray[t.currentItem]) + t.positionsInArray[t.prevItem],
          s = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2,
          l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
        t.isTransition = !0, t.$owlWrapper.addClass("owl-origin").css({
          "-webkit-transform-origin": s + "px",
          "-moz-perspective-origin": s + "px",
          "perspective-origin": s + "px"
        }), a.css(e(o, 10)).addClass(n).on(l, function () {
          t.endPrev = !0, a.off(l), t.clearTransStyle(a, n)
        }), r.addClass(i).on(l, function () {
          t.endCurrent = !0, r.off(l), t.clearTransStyle(r, i)
        })
      },
      clearTransStyle: function (e, t) {
        var n = this;
        e.css({
          position: "",
          left: ""
        }).removeClass(t), n.endPrev && n.endCurrent && (n.$owlWrapper.removeClass("owl-origin"), n.endPrev = !1, n.endCurrent = !1, n.isTransition = !1)
      },
      owlStatus: function () {
        var e = this;
        e.owl = {
          userOptions: e.userOptions,
          baseElement: e.$elem,
          userItems: e.$userItems,
          owlItems: e.$owlItems,
          currentItem: e.currentItem,
          prevItem: e.prevItem,
          visibleItems: e.visibleItems,
          isTouch: e.browser.isTouch,
          browser: e.browser,
          dragDirection: e.dragDirection
        }
      },
      clearEvents: function () {
        var i = this;
        i.$elem.off(".owl owl mousedown.disableTextSelect"), e(n).off(".owl owl"), e(t).off("resize", i.resizer)
      },
      unWrap: function () {
        var e = this;
        0 !== e.$elem.children().length && (e.$owlWrapper.unwrap(), e.$userItems.unwrap().unwrap(), e.owlControls && e.owlControls.remove()), e.clearEvents(), e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses"))
      },
      destroy: function () {
        var e = this;
        e.stop(), t.clearInterval(e.checkVisible), e.unWrap(), e.$elem.removeData()
      },
      reinit: function (t) {
        var n = this,
          i = e.extend({}, n.userOptions, t);
        n.unWrap(), n.init(i, n.$elem)
      },
      addItem: function (e, t) {
        var n, i = this;
        return e ? 0 === i.$elem.children().length ? (i.$elem.append(e), i.setVars(), !1) : (i.unWrap(), n = void 0 === t || -1 === t ? -1 : t, n >= i.$userItems.length || -1 === n ? i.$userItems.eq(-1).after(e) : i.$userItems.eq(n).before(e), void i.setVars()) : !1
      },
      removeItem: function (e) {
        var t, n = this;
        return 0 === n.$elem.children().length ? !1 : (t = void 0 === e || -1 === e ? -1 : e, n.unWrap(), n.$userItems.eq(t).remove(), void n.setVars())
      }
    };
    e.fn.owlCarousel = function (t) {
      return this.each(function () {
        if (e(this).data("owl-init") === !0) return !1;
        e(this).data("owl-init", !0);
        var n = Object.create(i);
        n.init(t, this), e.data(this, "owlCarousel", n)
      })
    },
      e.fn.owlCarousel.options = {
      items: 5,
      itemsCustom: !1,
      itemsDesktop: [1199, 4],
      itemsDesktopSmall: [979, 3],
      itemsTablet: [768, 2],
      itemsTabletSmall: !1,
      itemsMobile: [479, 1],
      singleItem: !1,
      itemsScaleUp: !1,
      slideSpeed: 200,
      paginationSpeed: 800,
      rewindSpeed: 1e3,
      autoPlay: !1,
      stopOnHover: !1,
      navigation: !1,
      navigationText: ["prev", "next"],
      rewindNav: !0,
      scrollPerPage: !1,
      pagination: !0,
      paginationNumbers: !1,
      responsive: !0,
      responsiveRefreshRate: 200,
      responsiveBaseWidth: t,
      baseClass: "owl-carousel",
      theme: "owl-theme",
      lazyLoad: !1,
      lazyFollow: !0,
      lazyEffect: "fade",
      autoHeight: !1,
      jsonPath: !1,
      jsonSuccess: !1,
      dragBeforeAnimFinish: !0,
      mouseDrag: !0,
      touchDrag: !0,
      addClassActive: !1,
      transitionStyle: !1,
      beforeUpdate: !1,
      afterUpdate: !1,
      beforeInit: !1,
      afterInit: !1,
      beforeMove: !1,
      afterMove: !1,
      afterAction: !1,
      startDragging: !1,
      afterLazyLoad: !1
    }
  }(jQuery, window, document)
