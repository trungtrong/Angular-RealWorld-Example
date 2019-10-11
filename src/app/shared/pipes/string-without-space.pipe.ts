import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appStringWithoutSpace'
})

export class StringWithoutSpacePipe implements PipeTransform {
  transform(input: string): string {
    return input.split(' ').join('');
  }
}
