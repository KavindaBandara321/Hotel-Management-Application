import { Component, OnInit } from '@angular/core';
import { SpecialRequest } from '../../Models/request.model';
import { RequestService } from '../../service/request.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit {

  requests: SpecialRequest[] = [];
  constructor(private requestService: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.loadRequests();
  }

 loadRequests() {
    this.requestService.getAll().subscribe(data => this.requests = data);
  }

  deleteRequest(id: number) {
    if (confirm('Delete this request?')) {
      this.requestService.delete(id).subscribe(() => this.loadRequests());
    }
  }

  editRequest(id: number) {
    this.router.navigate(['/requests/edit', id]);
  }

}
