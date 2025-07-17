import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarService } from '../../service/calendar.service';
import { CalendarEntry } from '../../Models/calendar-entry.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'] // ✅ should be plural
})
export class CalendarComponent {
  startDate: string = new Date().toISOString().substring(0, 10); // default to today
  calendarData: { [day: string]: CalendarEntry[] } = {};
  errorMessage: string | null = null;

  constructor(private calendarService: CalendarService) {}

  loadCalendar(): void {
    this.calendarService.getWeeklyCalendar(this.startDate).subscribe({
      next: (data) => {
        this.calendarData = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load calendar data';
        console.error(err);
      }
    });
  }
}