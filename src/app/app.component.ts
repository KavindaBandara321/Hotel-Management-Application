import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BookingListComponent } from "./booking-list/booking-list.component";
import { BookingFormComponent } from "./booking-form/booking-form.component";
import { CommonModule } from '@angular/common';
import { ChatbotComponent } from "./components/chatbot/chatbot.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hotel-booking-ui';
   chatOpen = false;
}
