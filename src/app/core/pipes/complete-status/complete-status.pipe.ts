import { Pipe, PipeTransform } from '@angular/core';
import { isNull, isUndefined } from '../../utilities/util';

@Pipe({
  name: 'completeStatus'
})
export class CompleteStatusPipe implements PipeTransform {
  transform(value: boolean): "YES" | "NO" | "" {
    if (isNull(value) || isUndefined(value)) return ""
    return value ? "YES" : "NO"
  }

}
