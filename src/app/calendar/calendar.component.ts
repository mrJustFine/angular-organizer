import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from '../shared/date.service';

interface Day {
  value: moment.Moment,
  active: boolean,
  disabled: boolean,
  selected: boolean
}

interface Week {
  days: Day[]
}

moment.updateLocale('en', {
  week: {
    dow: 1,
  }
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit {

  public calendar: Week[]

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.generate.bind(this));
  }

  public selectDay(day: moment.Moment) {
    this.dateService.changeDate(day);
  }

  private generate(now: moment.Moment) {
    const startDay = now.clone().startOf('month').startOf('week');
    const endDay = now.clone().endOf('month').endOf('week');
    const date = startDay.clone().subtract(1, 'day');
    const calendar = [];

    while (date.isBefore(endDay, 'day')) {
      calendar.push({
        days: Array(7)
          .fill(0)
          .map(() => {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const disabled = !now.isSame(value, 'month');
            const selected = now.isSame(value, 'date');
            const weekend = value.isoWeekday() == 6 || value.isoWeekday() == 7;

            return {
              value, active, disabled, selected, weekend
            }
          })
      })
    }
    this.calendar = calendar;
  }
}
