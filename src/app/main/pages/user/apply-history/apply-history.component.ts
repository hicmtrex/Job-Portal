import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ApplyService } from 'src/app/main/services/apply.service';
import { ApplyType } from 'src/app/utils/interfaces/apply.interface';

@Component({
  selector: 'app-apply-history',
  templateUrl: './apply-history.component.html',
  styleUrls: ['./apply-history.component.css'],
})
export class ApplyHistoryComponent implements OnInit {
  headData: string[] = ['Company', 'Title', 'Status', 'Created At', 'View'];
  applies: ApplyType[] = [];
  page: number = 1;
  pages: number = 1;
  constructor(private applySerive: ApplyService) {}

  getUserApplies() {
    this.applySerive.getUserApplies(this.page).subscribe({
      next: (data: any) => {
        this.applies = data.applies;
        this.pages = data.pages;
      },
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.getUserApplies();
  }

  ngOnInit(): void {
    this.getUserApplies();
  }
}
