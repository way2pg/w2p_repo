import { Directive, Input} from '@angular/core';
declare var $ : any;

@Directive({ selector: '[ratings]' })
export class RatingsDirective{

  @Input('ratings')
  set activate(isactivate : boolean){
    if(isactivate) this.activatePlugin();
  }

  private activatePlugin() {
    $('.ui.rating').rating();
  }
}
