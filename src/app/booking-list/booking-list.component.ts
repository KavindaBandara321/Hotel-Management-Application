import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../Models/booking.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-list',
  imports: [DatePipe,CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  standalone: true
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] = [];
 
  constructor(private bookingService: BookingService) {
  
    
  }
  ngOnInit(): void {
    this.load();
  }
 load() {
    this.bookingService.getAll().subscribe(data => {
      
      this.bookings = data
    });
  }

  delete(id: number) {
    this.bookingService.delete(id).subscribe(() => this.load());
  }
}
