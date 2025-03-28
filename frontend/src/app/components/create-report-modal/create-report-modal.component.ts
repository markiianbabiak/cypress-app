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
  selector: 'app-create-report-modal',
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
  templateUrl: './create-report-modal.component.html',
  styleUrl: './create-report-modal.component.css',
})
export class CreateReportModalComponent {
  reportHeader!: string;
  user!: AuthUser | null;
  reportDescription!: string;
  reportType!: ReportType;
  otherReportType: string = '';
  reportPriority: ReportPriority = ReportPriority.LOW;
  time!: any;
  ReportPriority: typeof ReportPriority = ReportPriority;
  ReportType: typeof ReportType = ReportType;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<CreateReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.user;
  }

  async handleCreateReport() {
    await fetch('http://worldtimeapi.org/api/timezone/America/Toronto')
      .then((response) => response.json())
      .then((data) => {
        this.time = data.datetime;
      })
      .catch((error) => console.error('Error fetching time:', error));

    if (this.otherReportType) {
      const newReport = {
        reportID: generateUniqueID(),
        name: this.reportHeader,
        type: this.reportType,
        other_type: this.otherReportType,
        status: ReportStatus.PENDING,
        priority: this.reportPriority,
        description: this.reportDescription,
        userID: this.user?.userID,
        location: this.data.location,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        submittedAt: this.time,
      };
      this.dialogRef.close(newReport);
    } else {
      const newReport = {
        reportID: generateUniqueID(),
        name: this.reportHeader,
        type: this.reportType,
        status: ReportStatus.PENDING,
        priority: this.reportPriority,
        description: this.reportDescription,
        userID: this.user?.userID,
        location: this.data.location,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        submittedAt: this.time,
      };
      this.dialogRef.close(newReport);
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
