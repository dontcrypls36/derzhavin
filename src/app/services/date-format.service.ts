import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateFormatService {

  public static readonly DATE_TIME = 'dd.MM.yyyy HH:mm:ss';
  public static readonly DATE = 'yyyy-MM-dd';
  public static readonly DATE_2 = 'dd-MMM-yyyy';

  constructor(private datePipe: DatePipe) { }

  public format(date: Date | number | string, format: string) {
    return this.datePipe.transform(date, format);
  }

}
