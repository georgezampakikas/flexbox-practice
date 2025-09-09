import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PatientsDto } from '../../shared/patient-modal';
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-patient-identity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,  
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
  ],
  templateUrl: './patient-identity-form.html',
  styleUrl: './patient-identity-form.scss'
})
export class PatientIdentityForm implements OnInit {
  @Input() index!: number;

  initialUserInfoValues!: PatientsDto;

  private drawerRef = inject(NzDrawerRef);
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private notification = inject(NzNotificationService);

  ngOnInit(): void {
    this.userService.getUserData(this.index).pipe(take(1)).subscribe({
      next: (res: PatientsDto) => {
        this.initialUserInfoValues = res;

        this.patientIdentityForm.patchValue({
          amka: this.initialUserInfoValues.patientIdentity?.amka,
          code: this.initialUserInfoValues.patientIdentity.code,
          firstName: this.initialUserInfoValues.patientIdentity.firstName,
          lastName: this.initialUserInfoValues.patientIdentity.lastName,
        });
      },
      error: err => this.notification.error('Error', err),
    });
  }

  patientIdentityForm = this.formBuilder.group({
    amka: [''],
    code: [''],
    firstName: [''],
    lastName: [''],
  });

  closeDrawer(): void {
    this.drawerRef.close();
  }


  submitForm(): void {
    if (this.patientIdentityForm.valid) {
      const formValues = this.patientIdentityForm.value;

      const updatedPatientIdentity = {
        code: formValues.code ?? '',
        amka: formValues.amka ?? '',
        firstName: formValues.firstName ?? '',
        lastName: formValues.lastName ?? '',
        status: this.initialUserInfoValues.patientIdentity.status, 
      };

      const updatedPatient: PatientsDto = {
        ...this.initialUserInfoValues,          
        patientIdentity: updatedPatientIdentity
      };

      this.drawerRef.close(updatedPatient);
    } else {
      this.patientIdentityForm.markAllAsTouched();
    }
  }


}
