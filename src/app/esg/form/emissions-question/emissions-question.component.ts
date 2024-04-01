import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiDataListModule, TuiErrorModule } from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiFileLike,
  TuiInputFilesModule,
  TuiInputModule,
  TuiRadioLabeledModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { Observable, Subject, finalize, map, of, switchMap, timer } from 'rxjs';
import { ResultsService } from '../../../services/esgResult.service';
import { ResultsFirebaseService } from '../../../services/esgFirebase.service';
import { FileUpload } from '../../../../types/result.interface';

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
    ReactiveFormsModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    FormsModule,
    TuiInputFilesModule,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './emissions-question.component.html',
  styleUrl: './emissions-question.component.scss',
})
export class EmissionsQuestionComponent {
  @Input()
  public Question1Details: FormGroup;

  @Input()
  public Question2Details: FormGroup;

  // Monitor file Changes
  readonly control = new FormControl();

  @Input()
  public items: any;

  // File Handling
  rejectedFiles: readonly TuiFileLike[] = [];
  resultsService = inject(ResultsService);
  resultsFirebaseService = inject(ResultsFirebaseService);
  currentFileUpload?: FileUpload;
  percentage = 0;

  ngOnInit(): void {
    this.control.statusChanges.subscribe((response) => {
      console.info('STATUS', response);
      console.info('ERRORS', this.control.errors, '\n');

      this.resultsService.disclosureFile.set(this.control.value[0]);
    });
  }

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  removeFile({ name }: File): void {
    this.control.setValue(
      this.control.value?.filter((current: File) => current.name !== name) ??
        [],
    );
  }

  //uploading to FireStore
  upload(): void {
    if (this.control.value[0]) {
      const file: File | null = this.control.value[0];

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.resultsFirebaseService
          .pushFileToStorage(this.control.value[0])
          .subscribe(
            (percentage) => {
              this.percentage = Math.round(percentage ? percentage : 0);
            },
            (error) => {
              console.log(error);
            },
          );
      }
    }
  }

  clearRejected({ name }: TuiFileLike): void {
    this.rejectedFiles = this.rejectedFiles.filter(
      (rejected) => rejected.name !== name,
    );
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({ value }: AbstractControl) =>
    value.length > maxLength
      ? {
          maxLength: new TuiValidationError(
            'Error: maximum limit - 5 files for upload',
          ),
        }
      : null;
}
