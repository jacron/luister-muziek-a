import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    // '(load)': 'load()',
    '[src]': 'src'
  }
})
export class DefaultImageDirective {
  @Input() src: string;
  @Input() default: string;
  @HostBinding('class') className;

  updateUrl() {
    this.src = this.default;
    const cls = this.className;
    this.className = 'default-image';
    if (cls) {
      this.className += ' ' + cls;
    }
  }

  // load() {
  //   this.className = 'image-loaded';
  // }

}
