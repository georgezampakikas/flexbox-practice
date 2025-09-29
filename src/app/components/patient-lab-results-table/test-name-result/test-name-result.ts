import { Component, inject, OnInit } from '@angular/core';
import { NzTableModule } from "ng-zorro-antd/table";
import { NsAutoHeightTableDirective } from '../../../directives/ns-auto-height-table';
import { PatientResultTableDto, PatientTestResultDto } from '../../../shared/patient-modal';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-test-name-result',
  standalone: true,
  imports: [
    NzTableModule,
    NsAutoHeightTableDirective
  ],
  templateUrl: './test-name-result.html',
  styleUrl: './test-name-result.scss'
})
export class TestNameResult implements OnInit {
  nzData: { 
    patientTestResults: PatientResultTableDto[],
    selectedPatientTestResultTestId: number 
  } = inject(NZ_MODAL_DATA);

  filteredResults: PatientResultTableDto[] = [];

  get patientTestResults(): PatientResultTableDto[] {
    return this.nzData.patientTestResults;
  }

  get selectedPatientTestResultTestId(): number {
    return this.nzData.selectedPatientTestResultTestId;
  }

  ngOnInit(): void {
    this.filteredResults = this.patientTestResults.filter(patientTestResult => 
      patientTestResult.testId === this.selectedPatientTestResultTestId);
  }
}
