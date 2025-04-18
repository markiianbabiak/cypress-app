import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreportsComponent } from './myreports.component';

describe('MyreportsComponent', () => {
  let component: MyreportsComponent;
  let fixture: ComponentFixture<MyreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyreportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
