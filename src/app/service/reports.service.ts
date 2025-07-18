import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportEntry } from '../Models/report-entry.model';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
private api = 'http://localhost:5000/api/Reports';
  constructor(private http: HttpClient) { }

  getWeeklyReport(startDate: string): Observable<{ [key: string]: ReportEntry[] }> {
  return this.http.get<{ [key: string]: ReportEntry[] }>(`${this.api}/weekly?startDate=${startDate}`);
}

getMonthlyReport(startDate: string): Observable<ReportEntry[]> {
  return this.http.get<ReportEntry[]>(`${this.api}/monthly?startDate=${startDate}`);
}
}
