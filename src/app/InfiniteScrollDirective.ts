import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  @Output() scrollToEnd = new EventEmitter<void>();
  @HostListener('scroll', ['$event'])
  
  onScroll(event: any): void {
    const target = event.target;
    const totalScrollHeight = target.scrollHeight;
    const scrollPosition = target.scrollTop;
    const viewportHeight = target.clientHeight;

    if (scrollPosition + viewportHeight >= totalScrollHeight - 50) {
      this.scrollToEnd.emit();
    }
  }
}
