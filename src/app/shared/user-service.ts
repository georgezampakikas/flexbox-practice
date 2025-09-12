import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable, switchMap, take } from 'rxjs';

import { 
  EducationLevelDto, 
  GenderDto, 
  MaritalStatusDto, 
  NationalityDto, 
  PatientDto, 
  PatientIdentity, 
  ProfessionDto 
} from './patient-modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = "http://localhost:3000";

  private httpClient = inject(HttpClient);

  getPatientData(id: number): Observable<PatientDto> {
    return this.httpClient.get<PatientDto>(`${this.url}/patients/${id}`)
    .pipe(map(patient => ({
      ...patient,
      id: Number(patient.id),
      demographicInfo: {
        ...patient.demographicInfo,
        gender: { ...patient.demographicInfo.gender, id: Number(patient.demographicInfo.gender.id )},
        maritalStatus: { ...patient.demographicInfo.maritalStatus, id: Number(patient.demographicInfo.maritalStatus.id )},
        nationality: { ...patient.demographicInfo.nationality, id: Number(patient.demographicInfo.nationality.id )},
        profession: { ...patient.demographicInfo.profession, id: Number(patient.demographicInfo.profession.id )},
        education: { ...patient.demographicInfo.education, id: Number(patient.demographicInfo.education.id )}
      }
    })));
  }

putPatientIdentity(
  patientId: number, 
  updatedPatientIdentity: PatientIdentity, 
  currentPatient: PatientDto
): Observable<PatientDto> {
  const payload: PatientDto = {
    ...currentPatient,
    id: Number(currentPatient.id),
    patientIdentity: updatedPatientIdentity,
    demographicInfo: {
      ...currentPatient.demographicInfo,
      gender: { ...currentPatient.demographicInfo.gender, id: Number(currentPatient.demographicInfo.gender.id) },
      maritalStatus: { ...currentPatient.demographicInfo.maritalStatus, id: Number(currentPatient.demographicInfo.maritalStatus.id) },
      nationality: { ...currentPatient.demographicInfo.nationality, id: Number(currentPatient.demographicInfo.nationality.id) },
      profession: { ...currentPatient.demographicInfo.profession, id: Number(currentPatient.demographicInfo.profession.id) },
      education: { ...currentPatient.demographicInfo.education, id: Number(currentPatient.demographicInfo.education.id) },
    }
  };

  return this.httpClient.put<PatientDto>(`${this.url}/patients/${patientId}`, payload);
}



  getGenders(): Observable<GenderDto[]> {
    return this.httpClient.get<GenderDto[]>(`${this.url}/genders`);
  }

  getMaritalStatuses(): Observable<MaritalStatusDto[]> {
    return this.httpClient.get<MaritalStatusDto[]>(`${this.url}/maritalStatuses`);
  }

  getEducationLevels(): Observable<EducationLevelDto[]> {
    return this.httpClient.get<EducationLevelDto[]>(`${this.url}/educationLevels`);
  }

  getNationalities(): Observable<NationalityDto[]> {
    return this.httpClient.get<NationalityDto[]>(`${this.url}/nationalities`);
  }

  getProfessions(): Observable<ProfessionDto[]> {
    return this.httpClient.get<ProfessionDto[]>(`${this.url}/professions`);
  }
}
