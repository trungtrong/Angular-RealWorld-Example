import { Injectable } from '@angular/core';
import { Pagination } from '../models';

@Injectable()

export class PaginationService {
  // default it all started with currentPage = 1
  pager: Pagination;

  getPager(
    totalItems: number,
    currentPage: number = 1,
    amountOfArticle: number, // amount of article in 1 page
    maxPager: number // maxPager must be an odd number
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / amountOfArticle);
    const halfOfPageSize = Math.floor(maxPager / 2) + 1; // b/c 5/2 = 2.5

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number;
    let endPage: number;

    // less than { pageSize }
    if (totalPages <= maxPager) {
      /* VD: totalPages = 4 ; pageSize = 5;
          1 2 3 4
      */
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than { pageSize }
      if (currentPage <= halfOfPageSize) {
        // case 1:
        /* VD: totalPages = 7 ; pageSize = 5; currentPage = 3
          1 2 3 4 5 Next
        */
        startPage = 1;
        endPage = maxPager;
      } else if (currentPage + halfOfPageSize - 1 >= totalPages) {
          // case 2:
          /* VD: totalPages = 7 ; pageSize = 5; currentPage = 5
            Prev 3 4 5 6 7 Next
          */
          startPage = totalPages - maxPager + 1;
          endPage = totalPages;
        } else {
          // case 3:
          /* VD: totalPages = 7 ; pageSize = 5; currentPage = 4
            Prev 2 3 4 5 6 Next
          */
          startPage = currentPage - halfOfPageSize + 1;
          endPage = currentPage + halfOfPageSize - 1;
        }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // https://www.jstips.co/en/javascript/create-range-0/.n-easily-using-one-line/
    // this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + startPage);
    /*
    + let c = new Array(5);
      => c (5) [empty × 5]
    + let d = Array.from(c);
      => d (5) [undefined, undefined, undefined, undefined, undefined]
    + let e = Array.from(c, (val, index) => index + 1);
      => e (5) [1, 2, 3, 4, 5]
    */
    this.pager = {
      pages,
      currentPage,
      totalPages,
      startPage,
      endPage
    };
    return this.pager;
  }
}


/* ***
  //  https://jasonwatmore.com/post/2016/08/23/angular-2-pagination-example-with-logic-like-google
  // with pageSize = 10
getPager(
    totalItems: number,
    currentPage: number = 1,
    pageSize: number = 10
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }


    let startPage: number;
    let endPage: number;

    if (totalPages <= pageSize) {
      // less than 10 total pages so show all
      // VD: totalPages = 4 ; pageSize = 10;
      //    Prev 1 2 3 4 Next

     startPage = 1;
     endPage = totalPages;
   } else {
     // more than 10 total pages so calculate start and end pages
     if (currentPage <= 6) {
       // VD: totalPages = 15; pageSize = 10; currentPage = 5
       // =>   Prev 1 2 3 4 5 6 7 8 9 10 Next
       //
     ]startPage = 1;
       endPage = 10;
     } else if (currentPage + 4 >= totalPages) {
       // VD: totalPages = 15; pageSize = 10; currentPage = 11
       // =>   Prev 6 7 8 9 10 11 12 13 14 15 Next
       //
       startPage = totalPages - 9;
       endPage = totalPages;
     } else {
       // VD: totalPages = 15; pageSize = 10; currentPage = 7
       // =>   Prev 2 3 4 5 6 7 8 9 10 11 Next
       //
       startPage = currentPage - 5;
       endPage = currentPage + 4;
     }
   }

   // calculate start and end item indexes
   //
   const startIndex = (currentPage - 1) * pageSize;
   const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

   // create an array of pages to ng-repeat in the pager control
   const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

   //       this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + startPage);
   //
  //  + let c = new Array(5);
  //    => c (5) [empty × 5]
  //  + let d = Array.from(c);
  //    => d (5) [undefined, undefined, undefined, undefined, undefined]
  //  + let e = Array.from(c, (val, index) => index + 1);
  //    => e (5) [1, 2, 3, 4, 5]
   //

   return {
     totalItems,
     currentPage,
     pageSize,
     totalPages,
     startPage,
     endPage,
     startIndex,
     endIndex,
     pages
   };
 }
****/
