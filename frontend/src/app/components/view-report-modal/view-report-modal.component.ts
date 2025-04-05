import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import CityReport from '../../models/cityReport';

@Component({
  selector: 'app-view-report-modal',
  imports: [MatDialogModule],
  templateUrl: './view-report-modal.component.html',
  styleUrl: './view-report-modal.component.css',
})
export class ViewReportModalComponent implements OnInit {
  report!: CityReport;

  constructor(
    public dialogRef: MatDialogRef<ViewReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.report = this.data;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
