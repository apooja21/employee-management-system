import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterr'
})
export class FilterrPipe implements PipeTransform {

  transform(value: any[], args: string): any[] {
    let filter: string = args ? args.toLocaleLowerCase() : null;
    return filter ? value.filter((employee) =>
        employee.name.toLocaleLowerCase().startsWith(filter) != false) : value;
}

}
