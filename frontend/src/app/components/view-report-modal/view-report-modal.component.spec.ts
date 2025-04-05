import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportModalComponent } from './view-report-modal.component';

describe('ViewReportModalComponent', () => {
  let component: ViewReportModalComponent;
  let fixture: ComponentFixture<ViewReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReportModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
