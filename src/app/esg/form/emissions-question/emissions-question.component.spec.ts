import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionsQuestionComponent } from './emissions-question.component';

describe('EmissionsQuestionComponent', () => {
  let component: EmissionsQuestionComponent;
  let fixture: ComponentFixture<EmissionsQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionsQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
