// app.routes.ts
import { Routes } from '@angular/router';
import { BookingListComponent } from './booking-list/booking-list.component';
import { RoomListComponent } from './room-list/room-list.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { RequestListComponent } from './requests/request-list/request-list.component';
import { RequestFormComponent } from './requests/request-form/request-form.component';
import { AvailabilityComponent } from './components/availability/availability.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [

  { path: 'bookings/create', component: BookingFormComponent },
  { path: 'bookings/edit/:id', component: BookingFormComponent },
  { path: 'bookings', component: BookingListComponent },
  
  { path: 'rooms/create', component: RoomFormComponent },
  { path: 'rooms/edit/:id', component: RoomFormComponent },
  { path: 'rooms', component: RoomListComponent },
  
  { path: 'requests/create', component: RequestFormComponent },
  { path: 'requests/edit/:id', component: RequestFormComponent },
  { path: 'requests', component: RequestListComponent },
  
  { path: 'availability', component: AvailabilityComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'reports', component: ReportsComponent },
  
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];