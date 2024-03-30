import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiAvatarModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  esgResults: any;

  constructor(private router: Router) {}
}
