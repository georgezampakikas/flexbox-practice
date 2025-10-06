import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';
import { PatientDto, PatientV2Dto } from '../../shared/patient-modal';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-patients',
  imports: [
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzAutocompleteModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './patients.html',
  styleUrl: './patients.scss'
})
export class Patients implements OnInit {
  patientsData: PatientDto[] = [];
  selectedPatient: string = '';
  

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getPatientsDto().pipe(take(1)).subscribe(patients => {
      this.patientsData = patients;
    });
  }

  get filteredPatients() {
    if(this.selectedPatient.length > 3) {
      return this.patientsData.filter(p =>
        p.patientIdentity.firstName.toLowerCase().includes(this.selectedPatient.toLowerCase().trim())
      );    
    } else return;
  }

}
