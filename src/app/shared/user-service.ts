import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EducationLevelDto, GenderDto, MaritalStatusDto, NationalityDto, PatientDto, ProfessionDto } from './patient-modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = "http://localhost:3000";

  private httpClient = inject(HttpClient);

  getPatientData(id: number): Observable<PatientDto> {
    return this.httpClient.get<PatientDto>(`${this.url}/patients/${id}`);
  }

  putPatient(updatedPatient: PatientDto | null): Observable<PatientDto | null> {
    return this.httpClient.put<PatientDto | null>(`${this.url}/patients/${updatedPatient?.id}`, updatedPatient);
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
