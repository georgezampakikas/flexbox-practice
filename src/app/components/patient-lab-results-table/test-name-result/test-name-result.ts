import { Component, inject, OnInit } from '@angular/core';
import { NzTableModule } from "ng-zorro-antd/table";
import { NsAutoHeightTableDirective } from '../../../directives/ns-auto-height-table';
import { PatientResultTableDto } from '../../../shared/patient-modal';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { CommonModule, formatDate } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';


@Component({
  selector: 'app-test-name-result',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    NzTableModule,
    NzStatisticModule,
    NsAutoHeightTableDirective
  ],
  templateUrl: './test-name-result.html',
  styleUrl: './test-name-result.scss'
})
export class TestNameResult implements OnInit{
  lastTestResult: PatientResultTableDto | null = null;
  nzData: { filteredResults: PatientResultTableDto[], multi: [] } = inject(NZ_MODAL_DATA);
  filteredResults: PatientResultTableDto[] = this.nzData.filteredResults;
  multi = this.nzData.multi;

  // ngx-chart
  view: [number, number] = [700, 400];
  
  assayChart: {
    scheme: string;
    showLabels: boolean;
    animations: boolean;
    xAxis: boolean;
    yAxis: boolean;
    timeline: boolean;
  } = {
    scheme: 'ocean',
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true,
    timeline: true
  };

  ngOnInit(): void {
    this.lastTestResult = this.findLastTestResult();
  }

  findLastTestResult(): PatientResultTableDto {
    return this.filteredResults.reduce((latest, current) => {
        const latestDate = new Date(latest.issueDate!);
        const currentDate = new Date(current.issueDate!);
      return (currentDate > latestDate) ? current : latest;
    });
  }

}
