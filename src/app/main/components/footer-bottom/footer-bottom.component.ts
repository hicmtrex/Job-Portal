import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-bottom',
  templateUrl: './footer-bottom.component.html',
  styleUrls: ['./footer-bottom.component.css'],
})
export class FooterBottomComponent {
  date = new Date().getFullYear();
}
