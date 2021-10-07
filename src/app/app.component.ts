import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  isShowLoadingIndicator = false;
  isShowConnectionStatus = false;

  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.isShowLoadingIndicator = true;
      } else if (routerEvent instanceof NavigationEnd) {
        this.isShowLoadingIndicator = false;
      }

    });
  }
  ngOnInit(): void {

  }
}
