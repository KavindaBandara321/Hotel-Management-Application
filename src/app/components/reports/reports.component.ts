import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../service/reports.service';
import { ReportEntry } from '../../Models/report-entry.model';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
startDate = new Date().toISOString().substring(0, 10);

  report: { [day: string]: ReportEntry[] } = {};

  constructor(private reportsService: ReportsService) {}

  loadReport() {
    this.reportsService.getWeeklyReport(this.startDate).subscribe(data => {
      this.report = data;
    });
  }
}
