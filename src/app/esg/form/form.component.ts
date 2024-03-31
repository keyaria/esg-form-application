import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
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
  ],
})
export class FormComponent {
  public currentStep = 0;

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
  items = [{ name: 'tariff1' }, { name: 'tariff2' }, { name: 'tariff3' }];

  public form = new FormGroup({
    Question1Details: new FormGroup({
      verifierValue: new FormControl(this.items[0], Validators.required),
      standardValue: new FormControl(''),
      assuranceValue: new FormControl(''),
      scopeValue1: new FormControl(false),
      scopeValue3: new FormControl(false),
      disclosureValue: new FormControl(null),
    }),
    // While they are using same setup, this is example if Question 2 was different
    Question2Details: new FormGroup({
      verifierValue: new FormControl('', Validators.required),
      standardValue1: new FormControl(''),
      assuranceValue: new FormControl(''),
      scopeValue1: new FormControl(false),
      scopeValue3: new FormControl(false),
      disclosureValue: new FormControl(null),
    }),
  });
  // testForm = new FormGroup({
  //   nameValue: new FormControl('', Validators.required),
  //   textValue: new FormControl('', Validators.required),
  //   passwordValue: new FormControl('', Validators.required),
  //   phoneValue: new FormControl('', Validators.required),
  //   moneyValue: new FormControl('100', Validators.required),
  //   quantityValue: new FormControl(50_000, Validators.required),
  //   radioValue: new FormControl('with-commission'),
  //   accountWherefrom: new FormControl(null),
  //   accountWhere: new FormControl(null),
  //   checkboxValue: new FormControl(false),
  //   osnoValue: new FormControl(false),
  //   usnValue: new FormControl(false),
  //   eshnValue: new FormControl(false),
  //   envdValue: new FormControl(false),
  //   usn2Value: new FormControl(false),
  //   patentValue: new FormControl(false),
  // });
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
    //    this.stepper.validateSteps();
  }

  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.form.controls).map((groupName) =>
      this.form.get(groupName),
    ) as FormGroup[];

    return groups[index];
  }
}
