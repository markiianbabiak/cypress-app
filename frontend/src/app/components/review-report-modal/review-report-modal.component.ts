import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { AuthUser } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { generateUniqueID } from '../../utils/Utils';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {
  ReportPriority,
  ReportStatus,
  ReportType,
} from '../../models/cityReport';
import { MatSelectModule } from '@angular/material/select';
import { ReportService } from '../../services/report.service';
@Component({
  selector: 'app-review-report-modal',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './review-report-modal.component.html',
  styleUrl: './review-report-modal.component.css',
})
export class ReviewReportModalComponent {
  reportHeader!: string;
  reportDescription!: string;
  reportType!: ReportType;
  otherReportType: string = '';
  reportPriority!: ReportPriority;
  reportStatus!: ReportStatus;
  reportReviewNotes: string = '';
  ReportPriority: typeof ReportPriority = ReportPriority;
  ReportType: typeof ReportType = ReportType;
  ReportStatus: typeof ReportStatus = ReportStatus;
  noChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReviewReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit(): Promise<void> {
    this.reportHeader = this.data.name;
    this.reportDescription = this.data.description;
    this.reportPriority = this.data.priority;
    this.reportType = this.data.type;
    this.reportReviewNotes = this.data.reportReviewNotes;
    if (this.data.otherType) {
      this.otherReportType = this.data.otherType;
    }
    this.reportStatus = this.data.status;
    if (
      this.reportStatus != this.data.status ||
      this.reportReviewNotes != this.data.reportReviewNotes
    ) {
      this.noChanges = true;
    }
  }

  async handleReviewReport() {
    let reviewedReport = {};
    if (
      this.reportStatus != this.data.status &&
      this.reportReviewNotes != this.data.reportReviewNotes
    ) {
      reviewedReport = {
        status: this.reportStatus,
        reviewNotes: this.reportReviewNotes,
      };
    } else if (this.reportStatus != this.data.status) {
      reviewedReport = {
        status: this.reportStatus,
      };
    } else if (this.reportReviewNotes != this.data.reportReviewNotes) {
      reviewedReport = {
        reviewNotes: this.reportReviewNotes,
      };
    }

    this.dialogRef.close(reviewedReport);
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
