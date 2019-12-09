import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService, Pagination } from 'src/app/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})

export class PaginationComponent {
  @Input() pager: Pagination;
  @Input() currentUrl: string;
  @Output() currentPage = new EventEmitter<number>();

  constructor() { }

  setPageTo(pageNumber: number) {
    this.currentPage.emit(pageNumber);
  }
}

