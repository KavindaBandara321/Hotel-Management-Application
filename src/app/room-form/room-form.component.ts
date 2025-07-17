import { Component, OnInit } from '@angular/core';
import { Room } from '../Models/room.model';
import { RoomService } from '../service/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-form',
  imports: [ CommonModule,
    FormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent implements OnInit {

  room: Room = {
    id: 0, roomType: '', capacity: 0, pricePerNight: 0
  };
 isEdit = false;

  constructor(private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router) {}

   ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.isEdit = true;
      this.roomService.get(id).subscribe(data => this.room = data);
    }
  }

  save() {
    if (this.isEdit) {
      this.roomService.update(this.room.id, this.room).subscribe(() => {
        this.router.navigate(['/rooms']);
      });
    } else {
      this.roomService.create(this.room).subscribe(() => {
        this.router.navigate(['/rooms']);
      });
    }
  }

}
