import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
  selector: 'app-form',
  standalone: true,
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
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public currentStep = 0;

  testForm = new FormGroup({
    nameValue: new FormControl('', Validators.required),
    textValue: new FormControl('', Validators.required),
    passwordValue: new FormControl('', Validators.required),
    phoneValue: new FormControl('', Validators.required),
    moneyValue: new FormControl('100', Validators.required),
    quantityValue: new FormControl(50_000, Validators.required),
    radioValue: new FormControl('with-commission'),
    accountWherefrom: new FormControl(null),
    accountWhere: new FormControl(null),
    checkboxValue: new FormControl(false),
    osnoValue: new FormControl(false),
    usnValue: new FormControl(false),
    eshnValue: new FormControl(false),
    envdValue: new FormControl(false),
    usn2Value: new FormControl(false),
    patentValue: new FormControl(false),
  });

  public next(): void {
    this.currentStep += 1;
    return;
  }
}
