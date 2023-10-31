import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  @Output() scrollToEnd = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = event.target.scrollTop + event.target.clientHeight;
    const maxScroll = event.target.scrollHeight;

    if (maxScroll <= scrollPosition + 1) {
      this.scrollToEnd.emit();
    }
  }
}
