import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emissions-confirm',
  standalone: true,
  imports: [],
  templateUrl: './emissions-confirm.component.html',
  styleUrl: './emissions-confirm.component.scss',
})
export class EmissionsConfirmComponent {
  @Input()
  public form: FormGroup;
}
