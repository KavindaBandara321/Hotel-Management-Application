import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private api = 'http://localhost:5000/api/Calendar';

  constructor(private http: HttpClient) { }

  getWeeklyCalendar(startDate: string): Observable<any> {
    return this.http.get<any>(`${this.api}/weekly?startDate=${startDate}`);
  }
}
