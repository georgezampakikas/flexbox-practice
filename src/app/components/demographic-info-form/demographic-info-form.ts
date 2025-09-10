import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerRef, NzDrawerContentDirective } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { UserService } from '../../shared/user-service';
import { take } from 'rxjs';
import { Patients } from '../patients/patients';
import { EducationLevelDto, GenderDto, MaritalStatusDto, NamedEntity, NationalityDto, PatientDto, ProfessionDto } from '../../shared/patient-modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-demographic-info-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
],
  templateUrl: './demographic-info-form.html',
  styleUrl: './demographic-info-form.scss'
})
export class DemographicInfoForm implements OnInit {
  @Input() index!: number;

  @ViewChild('suffixSearchIcon', { static: true }) suffixSearchIcon!: TemplateRef<any>;

  genders: GenderDto[] = [];
  maritalStatuses: MaritalStatusDto[] = [];
  educationLevels: EducationLevelDto[] = [];
  nationalities: NationalityDto[] = [];
  professions: ProfessionDto[] = [];

  patientData!: PatientDto;

  private formBuilder = inject(FormBuilder);
  private drawerRef = inject(NzDrawerRef);
  private notification = inject(NzNotificationService);
  private userService = inject(UserService);

  ngOnInit(): void {


    // fetch nationalities
    this.userService.getNationalities()
    .pipe(take(1))
    .subscribe({
      next: (res: NationalityDto[]) => {
        this.nationalities = res
      },

      error: err => this.notification.error('Error: ', 'nationalities not fetched'),      
    });

    // fetch professions
    this.userService.getProfessions()
    .pipe(take(1))
    .subscribe({
      next: (res: ProfessionDto[]) => {
        this.professions = res
      },

      error: err => this.notification.error('Error: ', 'professions not fetched'),      
    });


    // fetch genders
    this.userService.getGenders()
    .pipe(take(1))
    .subscribe({
      next: (res: GenderDto[]) => {
        this.genders = res
      },

      error: err => this.notification.error('Error: ', 'Genders not fetched'),
    });

    // fetch marital status
    this.userService.getMaritalStatuses()
    .pipe(take(1))
    .subscribe({
      next: (res: MaritalStatusDto[]) => {
        this.maritalStatuses = res
      },

      error: err => this.notification.error('Error: ', 'marital statuses not fetched'),
    });

    // fetch educational levels
    this.userService.getEducationLevels()
    .pipe(take(1))
    .subscribe({
      next: (res: EducationLevelDto[]) => {
        this.educationLevels = res
      },

      error: err => this.notification.error('Error: ', 'education levels not fetched'),
    });

    this.userService.getPatientData(this.index)
    .pipe(take(1))
    .subscribe({
      next: (res: PatientDto) => {
        this.patientData = res;

        this.demographicInfoForm.patchValue({
          birthDate: this.patientData.demographicInfo.birthDate,
          birthPlace: this.patientData.demographicInfo.birthPlace,
          genderId: this.patientData.demographicInfo.gender.id,
          maritalStatusId: this.patientData.demographicInfo.maritalStatus.id,
          fatherName: this.patientData.demographicInfo.fatherName,
          motherName: this.patientData.demographicInfo.motherName,
          language: this.patientData.demographicInfo.language,
          nationalityId: this.patientData.demographicInfo.nationality.id,
          professionId: this.patientData.demographicInfo.profession.id,
          educationId: this.patientData.demographicInfo.education.id,          
        });
      },

      error: err => this.notification.error('Error:', 'Patient Data fetched'),
    });    
  }

  demographicInfoForm = this.formBuilder.group({
    birthDate: this.formBuilder.control<string | null>(null),
    birthPlace: this.formBuilder.control<string | null>(null),
    genderId: this.formBuilder.control<number | null>(null),
    maritalStatusId: this.formBuilder.control<number | null>(null),
    fatherName: this.formBuilder.control<string | null>(null),
    motherName: this.formBuilder.control<string | null>(null),
    language: this.formBuilder.control<string | null>(null),
    nationalityId: this.formBuilder.control<number | null>(null),
    professionId: this.formBuilder.control<number | null>(null),
    educationId: this.formBuilder.control<number | null>(null),
  });


  closeDrawer(): void {
    this.drawerRef.close();
  }

  submitForm(): void {
    if (this.demographicInfoForm.valid) {
      const formValues = this.demographicInfoForm.value;

      const selectedGender = this.genders.find(g => {
        g.id === formValues.genderId;
      })!;


      const selectedMaritalStatus = this.maritalStatuses.find(g => {
        g.id === formValues.maritalStatusId;
      })!;

      const selectedNationality = this.nationalities.find(g => {
        g.id === formValues.nationalityId;
      })!;

      const selectedProfesion = this.professions.find(g => {
        g.id === formValues.professionId;
      })!;

      const selectedEducation = this.educationLevels.find(g => {
        g.id === formValues.educationId;
      })!;


      const updatedDemographicInfo = {
          birthDate: formValues.birthDate!,
          birthPlace: formValues.birthPlace!,
          gender: selectedGender,
          maritalStatus: selectedMaritalStatus,
          fatherName: formValues.fatherName!,
          motherName: formValues.motherName!,
          language: formValues.language!,
          nationality: selectedNationality,
          profession: selectedProfesion,
          education: selectedEducation,   
      };

      const updatedPatient: PatientDto = {
        ...this.patientData,          
        demographicInfo: updatedDemographicInfo
      };

      this.drawerRef.close(updatedPatient);
    } else {
      this.demographicInfoForm.markAllAsTouched();
    }
  }
}
