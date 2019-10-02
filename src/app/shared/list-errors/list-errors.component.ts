import { Component, OnInit, Input } from '@angular/core';
import { Errors } from 'src/app/core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})

export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
    set errors(errorList: Errors) {
      this.formattedErrors = Object.keys(errorList.errors || {})
        .map(key => {
          console.log(`${key} ${errorList.errors[key]}`);
          return `${key} ${errorList.errors[key]}`;
    });
    }

    get errorList() {
      console.log('formar:', this.formattedErrors);
      return this.formattedErrors;
    }
}
