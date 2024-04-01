import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import {
  TuiAccordionComponent,
  TuiAccordionModule,
  TuiAvatarModule,
} from '@taiga-ui/kit';
import { ResultsFirebaseService } from '../../services/esgFirebase.service';
import { ResultsService } from '../../services/esgResult.service';
import {
  ResultInterface,
  ResultsInterface,
} from '../../../types/result.interface';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiAvatarModule,
    TuiAccordionModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  resultsService = inject(ResultsService);
  resultsFirebaseService = inject(ResultsFirebaseService);
  public todos: ResultsInterface[];

  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.resultsFirebaseService.getResults().subscribe((results) => {
      console.log('ada', results);
      this.resultsService.resultSig.set(results);
      this.todos = this.resultsService.resultSig();
    });
  }
}
