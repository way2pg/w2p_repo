import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

var check = require('check-types');

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  private keys:Array<any>

  transform(value, args) {
    debugger;
    if (!check.undefined(value)) {
      console.log('Value - ' + value);
      this.keys = []
      if (Array.isArray(value)) {
        this.keys = Array.from(value)
      } else {
        if (value.hasOwnProperty("rooms")) {
          for (let key in value.rooms) {
            this.keys.push({key: key, value: value.rooms[key]});
          }
        }
      }
      console.log('Result - ' + this.keys);
    }
    return this.keys
  }
}

@Pipe({
  name: 'groupkeys',
  pure: false
})
export class GroupKeysPipe implements PipeTransform {
  private keys:Array<any>

  transform(value, args) {
    if (!check.undefined(value)) {
      this.keys = []
      if (Array.isArray(value)) {
        this.keys = Array.from(value)
      } else {
        if (value.hasOwnProperty("members")) {
          this.keys = value.members;
        }
      }
      return this.keys
    }
  }
}

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer:DomSanitizer) {
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
