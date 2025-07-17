import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room } from '../Models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private api = 'http://localhost:5000/api/Rooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Room[]> {
    return this.http.get<Room[]>(this.api);
  }

  get(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.api}/${id}`);
  }

  create(room: Room): Observable<Room> {
    return this.http.post<Room>(this.api, room);
  }

  update(id: number, room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.api}/${id}`, room);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
