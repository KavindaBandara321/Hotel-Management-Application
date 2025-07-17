import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
private api = 'http://localhost:5000/api/Reports';
  constructor(private http: HttpClient) { }

   getWeeklyReport(startDate: string): Observable<any> {
    return this.http.get<any>(`${this.api}/weekly?startDate=${startDate}`);
  }
}
