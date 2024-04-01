import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsResultComponent } from './emissions-result.component';

describe('EmissionsResultComponent', () => {
  let component: EmissionsResultComponent;
  let fixture: ComponentFixture<EmissionsResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionsResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
