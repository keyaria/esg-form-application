import { AsyncPipe } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
} from '@taiga-ui/kit';

@Component({
  selector: 'app-emissions-question',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiErrorModule,
    AsyncPipe,
    TuiFieldErrorPipeModule,
    ReactiveFormsModule,
    TuiRadioLabeledModule,
    TuiCheckboxLabeledModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    FormsModule,
  ],
  templateUrl: './emissions-question.component.html',
  styleUrl: './emissions-question.component.scss',
})
export class EmissionsQuestionComponent {
  @Input()
  public Question1Details: FormGroup;

  @Input()
  public items: any;
}
