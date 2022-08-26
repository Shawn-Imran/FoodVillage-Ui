import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCheckboxOrderStatusComponent } from './update-checkbox-order-status.component';

describe('UpdateCheckboxOrderStatusComponent', () => {
  let component: UpdateCheckboxOrderStatusComponent;
  let fixture: ComponentFixture<UpdateCheckboxOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCheckboxOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCheckboxOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
