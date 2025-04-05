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

@Component({
  selector: 'app-edit-report-modal',
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
  templateUrl: './edit-report-modal.component.html',
  styleUrl: './edit-report-modal.component.css',
})
export class EditReportModalComponent {
  reportHeader!: string;
  reportDescription!: string;
  reportType!: ReportType;
  otherReportType: string = '';
  reportPriority: ReportPriority = ReportPriority.LOW;
  ReportPriority: typeof ReportPriority = ReportPriority;
  ReportType: typeof ReportType = ReportType;
  noChanges: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit(): Promise<void> {
    this.reportHeader = this.data.name;
    this.reportDescription = this.data.description;
    this.reportPriority = this.data.priority;
    this.reportType = this.data.type;
    if (this.data.otherType) {
      this.otherReportType = this.data.otherType;
    }
    if (
      this.reportHeader != this.data.name ||
      this.reportDescription != this.data.description ||
      this.reportPriority != this.data.priority ||
      this.reportType != this.data.type ||
      this.otherReportType != this.data.otherType
    ) {
      this.noChanges = true;
    }
  }

  async handleEditReport() {
    if (this.otherReportType) {
      const editedReport = {
        name: this.reportHeader,
        type: this.reportType,
        other_type: this.otherReportType,
        priority: this.reportPriority,
        description: this.reportDescription,
      };
      this.dialogRef.close(editedReport);
    } else {
      const editedReport = {
        name: this.reportHeader,
        type: this.reportType,
        priority: this.reportPriority,
        description: this.reportDescription,
      };
      this.dialogRef.close(editedReport);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
