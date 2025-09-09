import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientsDto } from './patient-modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = "http://localhost:3000";

  private httpClient = inject(HttpClient);

  getUserData(id: number): Observable<PatientsDto> {
    return this.httpClient.get<PatientsDto>(`${this.url}/patients/${id}`);
  }

  updatePatient(updatedPatient: PatientsDto | null): Observable<PatientsDto | null> {
    return this.httpClient.put<PatientsDto | null>(`${this.url}/patients/${updatedPatient?.id}`, updatedPatient);
  }
}
