import { Component } from '@angular/core';
import { AvailabilityService } from '../../service/availability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-availability',
  imports: [CommonModule,FormsModule],
  templateUrl: './availability.component.html',
  styleUrl: './availability.component.scss'
})
export class AvailabilityComponent {

  startDate = new Date().toISOString().substring(0, 10);
  endDate = new Date(Date.now() + 6 * 86400000).toISOString().substring(0, 10);
  results: any[] = [];

  constructor(private availabilityService: AvailabilityService) {}

  getAvailability() {
  this.availabilityService.predict(this.startDate, this.endDate)
    .subscribe(data => this.results = data);
}
}
