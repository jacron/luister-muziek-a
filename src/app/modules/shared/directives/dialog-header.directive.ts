import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDialogHeader]',

})
export class DialogHeaderDirective implements OnInit {
  @Input() paddingBottom: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    renderer.setStyle(el.nativeElement, 'fontSize', '30px');
    renderer.setStyle(el.nativeElement, 'fontWeight', '300');
    renderer.setStyle(el.nativeElement, 'letterSpacing', '1px');
  }

  ngOnInit() {
    // console.log(this.paddingBottom);
    this.renderer.setStyle(this.el.nativeElement, 'paddingBottom',
      this.paddingBottom + 'px');
  }


}
