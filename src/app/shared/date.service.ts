import { Injectable } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DateService {

  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());

  public changeMonth(direction: number) {
    const changedMonth = this.date.value.add(direction, 'month');
    this.date.next(changedMonth);
  }

  public changeDate(date: moment.Moment) {
    const changedDate = this.date.value.set({
      date: date.date(),
      month: date.month()
    });
    this.date.next(changedDate);
  }
}