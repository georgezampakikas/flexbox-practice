import { Component, inject } from '@angular/core';
import { PatientDetailsCard } from "../patient-details-card/patient-details-card";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { UserInfo } from "../user-info/user-info";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  imports: [
    PatientDetailsCard,
    NzTabsModule,
    UserInfo
],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {
  route = inject(ActivatedRoute);

  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));
}
