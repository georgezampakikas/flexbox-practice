import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';

import { take } from 'rxjs';

import { UserService } from '../../shared/user-service';
import { PatientDto } from '../../shared/patient-modal';
import { LabeledTextUserInfo } from "../labeled-text-user-info/labeled-text-user-info";
import { PatientIdentityForm } from '../patient-identity-form/patient-identity-form';
import { DemographicInfoForm } from '../demographic-info-form/demographic-info-form';
import { ActivatedRoute } from '@angular/router';

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

  patient: PatientDto | null = null;

  private userService = inject(UserService);
  private drawerService = inject(NzDrawerService);
  private notification = inject(NzNotificationService);
  private route = inject(ActivatedRoute);
  
  patientId = this.route.snapshot.paramMap.get('id');
  index = Number(this.patientId);


  ngOnInit(): void {
    this.loadLabeledText();
  }

  loadLabeledText(): void {
      this.userService.getPatientData(this.index)
      .pipe(take(1))
      .subscribe({
        next: (res: PatientDto) => {
          this.patient = res;
        },
        error: err => {
          this.notification.error('Error', 'something went wrong');
        },
        
      });
  }

  openPatientIdentityDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: this.drawerTitle,
      nzContent: PatientIdentityForm,
      nzContentParams: {
        index: this.index
      },
      nzMaskClosable: false,
      nzClosable: false,
    });

    drawerRef.afterClose.subscribe((updatedPatient) => {
      if (updatedPatient) {
        this.userService.putPatient(updatedPatient).pipe(take(1)).subscribe({
          next: (res: PatientDto | null) => {this.loadLabeledText();},
          error: err => this.notification.error('Error:', 'put Patient error'),
        });     
      }
    });
  }

  openDemographicInfoDrawer(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Επεξεργασία Δημογραφικών Στοιχείων',
      nzContent: DemographicInfoForm,
      nzContentParams: {
        index: this.index,
        patientData: this.patient,
      },
      nzMaskClosable: false,
      nzClosable: false,
    });

    drawerRef.afterClose.subscribe((updatedDemographicInfo) => {
      if (updatedDemographicInfo) {

        this.userService.putPatient(updatedDemographicInfo).pipe(take(1)).subscribe({
          next: (res: PatientDto | null) => {this.loadLabeledText();
          },
          error: err => this.notification.error('Error:', 'put Patient error'),
        });   
      }
    });
  }
}

