import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsConfirmComponent } from './emissions-confirm.component';

describe('EmissionsConfirmComponent', () => {
  let component: EmissionsConfirmComponent;
  let fixture: ComponentFixture<EmissionsConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
