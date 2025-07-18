import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../service/reports.service';
import { ReportEntry } from '../../Models/report-entry.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
startDate = new Date().toISOString().substring(0, 10);

  // report: { [day: string]: ReportEntry[] } = {};

  reportType: 'weekly' | 'monthly' = 'weekly';
  report: { [day: string]: ReportEntry[] } = {};
  weeklyReport: { [day: string]: ReportEntry[] } = {};
  monthlyReport: ReportEntry[] = [];

  constructor(private reportsService: ReportsService) {}

  // loadReport() {
  //   this.reportsService.getWeeklyReport(this.startDate).subscribe(data => {
  //     this.report = data;
  //   });
  // }

  loadReport(): void {
    if (this.reportType === 'weekly') {
      this.reportsService.getWeeklyReport(this.startDate).subscribe(data => {
        this.weeklyReport = data;
        this.monthlyReport = [];
      });
    } else {
      this.reportsService.getMonthlyReport(this.startDate).subscribe(data => {
        this.monthlyReport = data;
        this.weeklyReport = {};
      });
    }
  }

   exportToExcel(): void {
  let excelData: any[] = [];

  if (this.reportType === 'weekly') {
    for (const [day, entries] of Object.entries(this.weeklyReport)) {
      if (!entries.length) {
        excelData.push({ Date: day, Info: 'No Bookings' });
      } else {
        entries.forEach(entry => {
          excelData.push({
            Day: day,
            BookingID: entry.bookingId,
            Guest: entry.guestName,
            RoomID: entry.roomId,
            Requests: entry.specialRequests?.join(', ') || 'None'
          });
        });
      }
    }
  } else if (this.reportType === 'monthly') {
    excelData = this.monthlyReport.map(entry => ({
      Date: entry.date,
      BookingID: entry.bookingId,
      Guest: entry.guestName,
      RoomID: entry.roomId,
      Requests: entry.specialRequests?.join(', ') || 'None'
    }));
  }

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = { Sheets: { Report: worksheet }, SheetNames: ['Report'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

  FileSaver.saveAs(blob, `report_${this.reportType}_${this.startDate}.xlsx`);
}

  
}
