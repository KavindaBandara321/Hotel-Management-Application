import { Component, OnInit } from '@angular/core';
import { Booking } from '../Models/booking.model';
import { Room } from '../Models/room.model';
import { SpecialRequest } from '../Models/request.model';
import { BookingService } from '../service/booking.service';
import { RoomService } from '../service/room.service';
import { RequestService } from '../service/request.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnInit {

   booking: Booking = {
    id: 0,
    roomId: 0,
    guestName: '',
    checkInDate: '',
    checkOutDate: '',
    specialRequestIds: [],
    isRecurring: false
  };
  rooms: Room[] = [];
  requests: SpecialRequest[] = [];
  message: string = '';

  constructor(
    private bookingService: BookingService,
    private roomService: RoomService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.roomService.getAll().subscribe(data => this.rooms = data);
    this.requestService.getAll().subscribe(data => this.requests = data);
  }

  submit(): void {
    this.bookingService.create(this.booking).subscribe(() => {
      this.message = 'Booking created successfully!';
      this.booking = {
        id: 0,
        roomId: 0,
        guestName: '',
        checkInDate: '',
        checkOutDate: '',
        specialRequestIds: [],
        isRecurring: false
      };
    });
  }

}
