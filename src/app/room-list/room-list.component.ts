import { Component, OnInit } from '@angular/core';
import { Room } from '../Models/room.model';
import { RoomService } from '../service/room.service';
import { Router } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from "../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-room-list',
  imports: [CurrencyPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = [];
  
  constructor(private roomService: RoomService, private router: Router) {  
  }
  ngOnInit(): void {
     this.loadRooms();
  }

  loadRooms() {
    this.roomService.getAll().subscribe(data => this.rooms = data);
    console.log('Rooms loaded:', this.rooms);
  }

  deleteRoom(id: number) {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.delete(id).subscribe(() => this.loadRooms());
    }
  }

  editRoom(id: number) {
    this.router.navigate(['/rooms/edit', id]);
  }
}
