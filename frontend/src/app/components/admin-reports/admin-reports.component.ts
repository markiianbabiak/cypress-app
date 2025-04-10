import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { AdminReportsDataSource } from './admin-reports-datasource';
import CityReport, { ReportType } from '../../models/cityReport';
import { ReportService } from '../../services/report.service';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ViewReportModalComponent } from '../view-report-modal/view-report-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { AuthUser, Role } from '../../models/user';
import { EditReportModalComponent } from '../edit-report-modal/edit-report-modal.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';
import { ReviewReportModalComponent } from '../review-report-modal/review-report-modal.component';

@Component({
  selector: 'app-admin-reports',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ViewNavigationComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css',
})
export class AdminReportsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CityReport>;

  reportType: typeof ReportType = ReportType;
  reports: CityReport[] | undefined;
  dataSource!: AdminReportsDataSource;
  user: AuthUser | undefined;

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = await this.userService.user!;
    if (this.user.role != Role.ADMIN) {
      this.router.navigate['/reports'];
      console.error('YOU DO NOT HAVE ACCESS TO THIS!!!');
      return;
    }

    this.reports = await this.reportService.getAll();
    if (this.reports) {
      this.dataSource = new AdminReportsDataSource(this.reports);
      if (this.user.department) {
        this.dataSource.filterCriteria = { type: this.user.department };
      }
      this.cdr.detectChanges();
      this.initializeTable();
    }
    this.sort.active = 'status';
    this.sort.direction = 'asc';
  }

  viewReport(row) {
    const dialogRef = this.dialog.open(ViewReportModalComponent, {
      data: row,
    });
  }

  reviewReport(row) {
    const dialogRef = this.dialog.open(ReviewReportModalComponent, {
      width: '400px',
      data: row,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      let newReport = await this.reportService.update(row.reportID, result);
      this.reports = await this.reportService.getAll();
      if (this.reports) {
        this.dataSource = new AdminReportsDataSource(this.reports);
        this.cdr.detectChanges();
        this.initializeTable();
      }
      if (newReport) {
        newReport = newReport['savedReport'];
        if (newReport) {
          const owner = await this.userService.getOneById(newReport.userID);
          if (result.status && result.reviewNotes) {
            await this.reportService.sendEmail(
              owner.email,
              'Your Report In Cypress App Update',
              newReport.status,
              newReport.reviewNotes,
              true,
              newReport.name
            );
          } else if (result.status) {
            await this.reportService.sendEmail(
              owner.email,
              'Your Report In Cypress App Update',
              newReport.status,
              undefined,
              true,
              newReport.name
            );
          } else if (result.reviewNotes) {
            await this.reportService.sendEmail(
              owner.email,
              'Your Report In Cypress App Update',
              undefined,
              newReport.reviewNotes,
              true,
              newReport.name
            );
          }
        }
      }
    });
  }

  deleteReport(row) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        handleConfirm: async () => {
          this.reportService.delete(row.reportID);
          if (this.user) {
            const results = await this.reportService.getByUser(
              this.user.userID
            );
            if (!results) {
              console.error('No report loaded');
              return;
            }
            this.reports = results['reports'];
            if (this.reports) {
              this.dataSource = new AdminReportsDataSource(this.reports);
              this.cdr.detectChanges();
              this.initializeTable();
            }
          }
        },
      },
    });
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'reportID',
    'name',
    'type',
    'status',
    'priority',
    'location',
    'submittedAt',
    'actions',
  ];

  private initializeTable(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    } else {
      console.error('DataSource is still undefined after retrying.');
    }
  }
}
