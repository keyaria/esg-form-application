import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiArcChartModule } from '@taiga-ui/addon-charts';
import { TuiButtonModule, TuiLabelModule } from '@taiga-ui/core';

@Component({
  selector: 'app-emissions-result',
  standalone: true,
  imports: [TuiArcChartModule, TuiLabelModule, TuiButtonModule, RouterModule],
  templateUrl: './emissions-result.component.html',
  styleUrl: './emissions-result.component.scss',
})
export class EmissionsResultComponent implements OnInit {
  @Input()
  public question1Results: number;

  @Input()
  public question2Results: number;

  public results: number;

  ngOnInit(): void {
    this.results = this.question1Results * 0.6 + this.question2Results * 0.4;
  }
}
