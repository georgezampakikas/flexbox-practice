import { Component, inject } from '@angular/core';
import { NzTableModule } from "ng-zorro-antd/table";
import { NsAutoHeightTableDirective } from '../../../directives/ns-auto-height-table';
import { PatientResultTableDto } from '../../../shared/patient-modal';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule, formatDate } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@Component({
  selector: 'app-test-name-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    NzTableModule,
    NsAutoHeightTableDirective
  ],
  templateUrl: './test-name-result.html',
  styleUrl: './test-name-result.scss'
})
export class TestNameResult {
  nzData: { filteredResults: PatientResultTableDto[] } = inject(NZ_MODAL_DATA);

  get filteredResults(): PatientResultTableDto[] {
    return this.nzData.filteredResults;
  }

  // ngx-chart
  multi = [
    {
      name: this.filteredResults[0].name,
      series: this.filteredResults.map(result => ({
        name: formatDate(result.issueDate!, 'dd/MM/yy', 'el-GR'),
        value: result.result
      }))
    },
  ]



  view: [number, number] = [700, 400];

  scheme = 'ocean';

  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  timeline = true;
}
