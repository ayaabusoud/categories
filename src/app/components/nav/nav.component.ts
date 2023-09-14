import { Component, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements AfterViewInit {
  @ViewChild('categoriesLink', { static: false }) categoriesLink!: ElementRef;
  @ViewChild('itemsLink', { static: false }) itemsLink!: ElementRef;

  lineWidth: number = 0;
  lineLeft: number = 0;
  activeClass = 'active';

  constructor(private renderer: Renderer2, private router: Router) { }


  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let activeElement ;
      if (event.url === '/manage-categories' || event.url === '/') {
        activeElement = this.categoriesLink.nativeElement;
      } else if (event.url === '/manage-items') {
        activeElement = this.itemsLink.nativeElement;
      }
      this.controlLine(activeElement);
      this.activateLink(activeElement);
    });
  }

  activateLink(link: HTMLAnchorElement) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((element) => {
      this.renderer.removeClass(element, this.activeClass);
    });
    this.renderer.addClass(link, this.activeClass);
  }

  private controlLine(link: HTMLElement) {
    this.lineLeft = link.offsetLeft;
    this.lineWidth = link.offsetWidth;
  }
}
