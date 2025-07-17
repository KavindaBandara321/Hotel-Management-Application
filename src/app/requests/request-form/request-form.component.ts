import { Component, OnInit } from '@angular/core';
import { SpecialRequest } from '../../Models/request.model';
import { RequestService } from '../../service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-form',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './request-form.component.html',
  styleUrl: './request-form.component.scss'
})
export class RequestFormComponent implements OnInit {
  // request: SpecialRequest = { id: 0, description: '', roomId: 0, date: new Date().toISOString() };
  // isEdit = false;

  form: FormGroup;
  
  constructor(
    private requestService: RequestService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,) {
      this.form = this.fb.group({
      roomId: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      description: ['', Validators.required]
    });
     
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  createRequest(): void {
    const request: SpecialRequest = this.form.value;
    this.requestService.create(request).subscribe(() => {
      this.router.navigate(['/requests']);
    });
  }

  cancel(): void {
    this.router.navigate(['/requests']);
  }
 
}
