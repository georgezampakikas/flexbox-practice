import { Component } from '@angular/core';
import { PatientDetailsCard } from "../patient-details-card/patient-details-card";
import { NzTabsModule } from "ng-zorro-antd/tabs";

@Component({
  selector: 'app-patient-details',
  imports: [
    PatientDetailsCard, 
    NzTabsModule
  ],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss'
})
export class PatientDetails {

}
