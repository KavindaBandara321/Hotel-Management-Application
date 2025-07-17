import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecialRequest } from '../Models/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private api = 'http://localhost:5000/api/SpecialRequests';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SpecialRequest[]> {
    return this.http.get<SpecialRequest[]>(this.api);
  }

  get(id: number): Observable<SpecialRequest> {
    return this.http.get<SpecialRequest>(`${this.api}/${id}`);
  }

  create(request: SpecialRequest): Observable<SpecialRequest> {
    return this.http.post<SpecialRequest>(this.api, request);
  }

  update(id: number, request: SpecialRequest): Observable<SpecialRequest> {
    return this.http.put<SpecialRequest>(`${this.api}/${id}`, request);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
