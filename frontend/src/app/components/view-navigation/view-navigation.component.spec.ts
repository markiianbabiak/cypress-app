import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNavigationComponent } from './view-navigation.component';

describe('ViewNavigationComponent', () => {
  let component: ViewNavigationComponent;
  let fixture: ComponentFixture<ViewNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
