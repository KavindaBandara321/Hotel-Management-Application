import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
private api = 'http://localhost:5000/api/Availability';
  constructor(private http: HttpClient) { }

  predict(from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/predict?from=${from}&to=${to}`);
  }
}
