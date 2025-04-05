import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
})
export class ConfirmModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  handleConfirm() {
    if (this.data.handleConfirm) {
      this.data.handleConfirm();
    }
  }

  handleCancel() {
    if (this.data.handleCancel) {
      this.data.handleCancel();
    }
  }
}
