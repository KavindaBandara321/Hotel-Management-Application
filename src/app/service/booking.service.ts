import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../Models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private api = 'http://localhost:5000/api/Bookings';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.api);
  }

  create(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.api, booking);
  }

  update(id: number, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.api}/${id}`, booking);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
