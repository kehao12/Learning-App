import { Directive, Input, ElementRef, Renderer, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appVideoPreview]'
})
export class VideoPreviewDirective {
    @Input() video: any;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges) {

        const reader = new FileReader();
        const el = this.el;

        reader.onloadend = function (e) {
            el.nativeElement.src = reader.result;
        };

        if (this.video) {
            return reader.readAsDataURL(this.video);
        }

    }
}
