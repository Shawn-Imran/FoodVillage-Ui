import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewDialogComponent } from './quick-view-dialog.component';

describe('QuickViewDialogComponent', () => {
  let component: QuickViewDialogComponent;
  let fixture: ComponentFixture<QuickViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
