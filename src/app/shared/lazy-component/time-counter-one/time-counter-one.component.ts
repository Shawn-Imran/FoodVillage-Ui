import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'app-time-counter-one',
  templateUrl: './time-counter-one.component.html',
  styleUrls: ['./time-counter-one.component.scss']
})
export class TimeCounterOneComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Input() endDate: string;

  timeLeft = 0;

  public dateNow = new Date();
  public dDay: Date;
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference;
  public secondsToDday;
  public minutesToDday;
  public hoursToDday;
  public daysToDday;


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }


  constructor(
    private utilsService: UtilsService
  ) {
  }

  ngOnInit() {
    if (this.endDate) {
      this.timeLeft = this.utilsService.getDateDifference(new Date(this.endDate), new Date());

      if (this.timeLeft <= 0) {
        this.secondsToDday = 0;
        this.minutesToDday = 0;
        this.hoursToDday = 0;
        this.daysToDday = 0;
      } else {
        this.dDay = new Date(this.endDate);
        this.subscription = interval(1000)
          .subscribe(x => {
            this.getTimeDifference();
          });
      }

    }
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
