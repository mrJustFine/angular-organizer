import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent {

  constructor(
    private dateService: DateService,
  ) { }

  public navigate(direction: number) {
    this.dateService.changeDate(direction);
    console.log('direction', direction);
  }
}
