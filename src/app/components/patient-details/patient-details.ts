import { Component, inject } from '@angular/core';
import { PatientDetailsCard } from "../patient-details-card/patient-details-card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { UserInfo } from "../user-info/user-info";
import { ActivatedRoute } from '@angular/router';
import { PatientLabResultsTable } from "../patient-lab-results-table/patient-lab-results-table";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { LabTestsSectionsTable } from '../lab-tests-sections-table/lab-tests-sections-table';

@Component({
  selector: 'app-patient-details',
  imports: [
    PatientDetailsCard,
    NzTabsModule,
    NzButtonModule,
    UserInfo,
    PatientLabResultsTable,
],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {
  route = inject(ActivatedRoute);
  private drawerService = inject(NzDrawerService);

  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));

  labTestsDrawer(): void {
    this.drawerService.create({
      nzTitle: 'Παραγγελία εξετάσεων',
      nzClosable: false,
      nzMaskClosable: false,
      nzContent: LabTestsSectionsTable, 
      nzWidth: '90%'
    });
  }
}
