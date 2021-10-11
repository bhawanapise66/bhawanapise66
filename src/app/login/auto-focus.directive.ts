import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[dataAutoFocus]'
})
export class AutoFocusDirective {


  @Input()
  public set dataAutoFocus(value) {
    if (!!value) {
      this.el.nativeElement.focus()
    }
  }

  constructor(private el:ElementRef) {
  }

}
