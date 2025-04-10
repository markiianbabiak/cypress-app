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
import { ReportsDataSource } from './reports-datasource';
import CityReport, { ReportType } from '../../models/cityReport';
import { ReportService } from '../../services/report.service';
import { ViewNavigationComponent } from '../view-navigation/view-navigation.component';
import { DataSource } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ViewReportModalComponent } from '../view-report-modal/view-report-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ViewNavigationComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ReportsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CityReport>;

  reportType: typeof ReportType = ReportType;
  reports: CityReport[] | undefined;
  dataSource!: ReportsDataSource;

  constructor(
    private reportService: ReportService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    const results = await this.reportService.getAllActive();
    if (!results) {
      console.error('No report loaded');
      return;
    }
    this.reports = results['reports'];
    if (this.reports) {
      this.dataSource = new ReportsDataSource(this.reports);

      // Trigger change detection to ensure ViewChild bindings are updated
      this.cdr.detectChanges();
      this.initializeTable();
    }
  }

  viewReport(row) {
    const dialogRef = this.dialog.open(ViewReportModalComponent, {
      data: row,
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
