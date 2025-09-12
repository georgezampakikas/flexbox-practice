import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

import { take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { PatientDto, PatientIdentity } from '../../shared/patient-modal';
import { LabeledTextUserInfo } from "../labeled-text-user-info/labeled-text-user-info";
import { PatientIdentityForm } from '../patient-identity-form/patient-identity-form';
import { DemographicInfoForm } from '../demographic-info-form/demographic-info-form';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    NzCardModule,
    NzDescriptionsModule,
    NzIconModule,
    NzDrawerModule,
    NzButtonModule,
    LabeledTextUserInfo,
],
  templateUrl: './user-info.html',
  styleUrl: './user-info.scss',
})
export class UserInfo implements OnInit {
  @ViewChild('drawerTitle', { static: true }) drawerTitle!: TemplateRef<any>;

  patient?: PatientDto | null;

  private userService = inject(UserService);
  private drawerService = inject(NzDrawerService);
  private notification = inject(NzNotificationService);
  private route = inject(ActivatedRoute);
  
  readonly patientId = Number(this.route.snapshot.paramMap.get('id'));


  ngOnInit(): void {
    this.loadLabeledText();
  }

  loadLabeledText(): void {
      this.userService.getPatientData(this.patientId)
      .pipe(take(1))
      .subscribe({
        next: (res: PatientDto) => {
          this.patient = res;
        },
        error: err => {
          this.notification.error('Error', 'loadLabeledData error');
          console.log(err);
        },
        
      });
  }

  openPatientIdentityDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: this.drawerTitle,
      nzContent: PatientIdentityForm,
      nzData: { patientIdentityData: this.patient?.patientIdentity },
      nzMaskClosable: false,
      nzClosable: false,
    });

    drawerRef.afterClose.subscribe((updatedPatientIdentity) => {
      if (updatedPatientIdentity) {
        const updatedPatient: PatientDto = {
          id: this.patient!.id,
          patientIdentity: updatedPatientIdentity,
          demographicInfo: this.patient!.demographicInfo,
          contactInfo: this.patient!.contactInfo
        };

        this.userService.putPatient(this.patientId, updatedPatient).pipe(take(1)).subscribe({
          next: (res: PatientDto) => {this.loadLabeledText();},
          error: err => this.notification.error('Error:', 'put Patient error'),
        });     
      }
    });
  }

  openDemographicInfoDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Επεξεργασία Δημογραφικών Στοιχείων',
      nzContent: DemographicInfoForm,
      nzData: {demographicInfo: this.patient?.demographicInfo},
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: 530,
    });

    drawerRef.afterClose.subscribe((updatedDemographicInfo) => {
      if (updatedDemographicInfo) {
        const updatedPatient: PatientDto = {
          id: this.patient!.id,
          patientIdentity: this.patient!.patientIdentity,
          demographicInfo: updatedDemographicInfo,
          contactInfo: this.patient!.contactInfo
        };

        this.userService.putPatient(this.patientId, updatedPatient).pipe(take(1)).subscribe({
          next: (res: PatientDto | null) => {
            this.loadLabeledText();
          },
          error: err => this.notification.error('Error:', 'put Patient error'),
        });   
      }
    });
  }
}

