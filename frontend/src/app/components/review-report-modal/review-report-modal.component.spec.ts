import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReportModalComponent } from './review-report-modal.component';

describe('ReviewReportModalComponent', () => {
  let component: ReviewReportModalComponent;
  let fixture: ComponentFixture<ReviewReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewReportModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
