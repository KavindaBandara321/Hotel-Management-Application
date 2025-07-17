import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../service/room.service';
import { BookingService } from '../../service/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit {

  userInput = '';
  messages: { sender: 'user' | 'bot'; text: string }[] = [];

  totalRooms = 30;
  bookedRooms = 0;
  roomTypes: string[] = [];
  roomPrices: { [type: string]: number } = {}; // Optional: attach pricing
  bookedRoomIds: number[] = [];


  constructor(private roomService: RoomService,
    private bookingService: BookingService) {}

  ngOnInit(): void {
    this.roomService.getAll().subscribe((rooms) => {
      // this.totalRooms = rooms.length;
      this.roomTypes = [...new Set(rooms.map(r => r.roomType))];

      // Optional: Set pricing manually here
      this.roomPrices = {
        Deluxe: 8000,
        Standard: 5000,
        Suite: 12000
      };
    });

    this.bookingService.getAll().subscribe((bookings) => {
      console.log('Bookings loaded:', bookings);
      this.bookedRooms = bookings.length;
      this.bookedRoomIds = bookings.map(b => b.roomId);
    });
  }

  ask(): void {
    const question = this.userInput.trim().toLowerCase();
    if (!question) return;

    this.messages.push({ sender: 'user', text: this.userInput });
    let response = "Sorry, I didn't understand that.";

    if (question.includes('how many rooms') && question.includes('available')) {
      const available = this.totalRooms - this.bookedRooms;
      response = `There are ${available} rooms available out of ${this.totalRooms}.`;
    } else if (question.includes('how many rooms') && question.includes('booked')) {
      response = `${this.bookedRooms} rooms are currently booked.`;
    } else if (question.includes('total number of rooms') || question.includes('how many rooms in total')) {
      response = `We have ${this.totalRooms} rooms in total.`;
    } else if (question.includes('types of rooms') || question.includes('room types')) {
      response = `We have the following room types: ${this.roomTypes.join(', ')}.`;
    } else if (question.includes('price for')) {
      for (const type in this.roomPrices) {
        if (question.includes(type.toLowerCase())) {
          response = `The price for a ${type} room is Rs. ${this.roomPrices[type]}.`;
          break;
        }
      }
    } else if (question.includes('is room')) {
      const match = question.match(/room (\d+)/);
      if (match && match[1]) {
        const roomId = parseInt(match[1], 10);
        response = this.bookedRoomIds.includes(roomId)
          ? `Room ${roomId} is currently booked.`
          : `Room ${roomId} is available.`;
      }
    }
    else if (question.includes('how many special requests')) {
  response = 'We currently have 12 special requests logged.'; // or use service
}
else if (question.includes('wifi')) {
  response = 'Yes, Wi-Fi is available in all rooms.';
}
else if (question.includes('pool')) {
  response = 'Yes, the pool is open daily from 6:00 AM to 10:00 PM.';
}
else if (question.includes('breakfast')) {
  response = 'Yes, complimentary breakfast is included with every booking.';
}
else if (question.includes('laundry')) {
  response = 'Yes, laundry service is available upon request.';
}
else if (question.includes('today') && question.includes('report')) {
  const available = this.totalRooms - this.bookedRooms;
  response = `Today’s report: ${this.bookedRooms} bookings, ${available} rooms available.`;
}
else if (question.includes('summary') && question.includes('month')) {
  response = 'This month: 110 bookings, Rs. 1,200,000 revenue, 35 special requests.';
}


    this.messages.push({ sender: 'bot', text: response });
    this.userInput = '';
  }
}
