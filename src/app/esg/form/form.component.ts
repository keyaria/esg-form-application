import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListDirective,
  TuiDataListModule,
  TuiErrorModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputComponent,
  TuiInputDateModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputSliderModule,
  TuiRadioBlockModule,
  TuiSelectModule,
  TuiStepperComponent,
  TuiStepperModule,
} from '@taiga-ui/kit';
import { EmissionsQuestionComponent } from './emissions-question/emissions-question.component';
import { EmissionsConfirmComponent } from './emissions-confirm/emissions-confirm.component';
import { EmissionsResultComponent } from './emissions-result/emissions-result.component';
import { ResultsService } from '../../services/esgResult.service';
import { ResultsFirebaseService } from '../../services/esgFirebase.service';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  imports: [
    TuiStepperModule,
    TuiInputModule,
    TuiErrorModule,
    TuiInputDateModule,
    TuiInputNumberModule,
    TuiInputSliderModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiRadioBlockModule,
    TuiCheckboxLabeledModule,
    FormsModule,
    ReactiveFormsModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    CommonModule,
    EmissionsQuestionComponent,
    TuiButtonModule,
    EmissionsConfirmComponent,
    EmissionsResultComponent,
  ],
})
export class FormComponent {
  public currentStep = 0;

  public question1 = 0;
  public question2 = 0;
  resultsService = inject(ResultsService);
  resultsFirebaseService = inject(ResultsFirebaseService);

  @ViewChild('stepper', { static: true })
  public stepper!: TuiStepperComponent;

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
      label: 'Question 1',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
    {
      label: 'Question 2',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
    {
      label: 'Confirm Details',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
    {
      label: 'Results',
      isValid: this.isStepValid,
      validate: this.shouldValidate,
    },
  ];

  public form = new FormGroup({
    Question1Details: new FormGroup({
      verifierValue: new FormControl('', [Validators.required]),
      verifierValueText: new FormControl(''),
      standardValue: new FormControl(false),
      standardValueOther: new FormControl(false),
      standardValueOtherText: new FormControl(''),
      assuranceValue: new FormControl(''),
      scopeValue1: new FormControl(false),
      scopeValue3: new FormControl(false),
      disclosureValue: new FormControl(null),
    }),
    // While they are using same setup, this is example if Question 2 was different
    Question2Details: new FormGroup({
      verifierValue: new FormControl('', [Validators.required]),
      verifierValueText: new FormControl(''),
      standardValue: new FormControl(false),
      standardValueOther: new FormControl(false),
      standardValueOtherText: new FormControl(''),
      assuranceValue: new FormControl(''),
      scopeValue1: new FormControl(false),
      scopeValue3: new FormControl(false),
      disclosureValue: new FormControl(null),
    }),
  });

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  public prev(): void {
    this.currentStep -= 1;
  }

  public next(): void {
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      this.currentStep += 1;
      return;
    }

    this.currentGroup.markAllAsTouched();
  }

  public submit(): void {
    if (this.form.valid) {
    }

    this.question1 = this.getPoints(this.form.value.Question1Details);
    this.question2 = this.getPoints(this.form.value.Question2Details);

    this.addResult();
    this.currentStep += 1;
  }

  // Add To Firebase Database
  addResult(): void {
    this.resultsFirebaseService
      .addResult(this.form, this.question1, this.question2)
      .subscribe((addedResultid) => {
        this.resultsService.addResult(
          this.form,
          this.question1,
          this.question2,
          addedResultid,
        );
      });
  }

  getPoints(values: any): number {
    if (values.verifierValue === 'No' || values.disclosureValue === null) {
      return 0;
    } else if (values.assuranceValue!.length === 0) {
      return 2;
    } else if (values.scopeValue1 === true) {
      return 3.5;
    } else {
      return 5;
    }
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map((groupName) =>
      this.form.get(groupName),
    ) as FormGroup[];

    return groups[index];
  }
}
