import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class MainLayoutComponent implements DoCheck {
  isHome: boolean = false;
  constructor(private router: Router) {
    this.isHome = this.router.url === '/' ? true : false;
  }

  ngDoCheck(): void {
    this.isHome = this.router.url === '/' ? true : false;
  }
}
