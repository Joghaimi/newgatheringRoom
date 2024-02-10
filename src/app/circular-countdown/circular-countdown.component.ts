import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-circular-countdown',
  templateUrl: './circular-countdown.component.html',
  styleUrls: ['./circular-countdown.component.css']
})
export class CircularCountdownComponent implements OnInit, OnDestroy {
  @Input() duration: number = 60; // Default duration in seconds
  @Input() interval: number = 1000; // Interval for updating the countdown (in milliseconds)
  @Output() currentTimeChange: EventEmitter<number> = new EventEmitter<number>();
  countdownValue: number = 0;
  countdownSubscription!: Subscription;
  substractRatio = 0;
  strockColor = "green";
  countUp = 0;
  constructor() { }

  ngOnInit(): void {
    this.substractRatio = 440 / this.duration;

    const source = interval(this.interval);
    this.countdownSubscription = source.subscribe(() => {
      if (this.countdownValue < 439) {
        this.countdownValue += this.substractRatio;
        let percentage = 100 - (this.countdownValue / 440) * 100;
        console.log(percentage);
        if (percentage < 50 && percentage > 20)
          this.strockColor = "orange";
        else if (percentage < 20) {
          this.strockColor = "yellow";
        }
        this.countUp++;
        this.currentTimeChange.emit(this.countUp);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

}
