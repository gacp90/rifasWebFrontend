import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  @Input() targetDate!: Date; // Recibe la fecha como entrada en formato ISO (YYYY-MM-DDTHH:mm:ss).
  timeRemaining!: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  private subscription!: Subscription;

  ngOnInit(): void {
    this.calculateTimeRemaining();
    // Actualiza cada segundo.
    this.subscription = interval(1000).subscribe(() => this.calculateTimeRemaining());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private calculateTimeRemaining(): void {
    const now = new Date().getTime();
    const target = new Date(this.targetDate).getTime();
    const difference = target - now;

    if (difference > 0) {
      this.timeRemaining = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      this.timeRemaining = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }

}
