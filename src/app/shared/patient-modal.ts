export interface PatientDto {
  id: number;
  patientIdentity: PatientIdentity;
  demographicInfo: DemographicInfo;
  contactInfo: ContactInfo;
}

export interface PatientIdentity {
  code: string;
  amka: string;
  lastName: string;
  firstName: string;
  status: string;
}

export interface DemographicInfo {
  birthDate: string;
  birthPlace: string;
  gender: NamedEntity;
  maritalStatus: NamedEntity;
  fatherName: string;
  motherName: string;
  language: string;
  nationality: NamedEntity;
  profession: NamedEntity;
  education: NamedEntity;
}

export interface ContactInfo {
  homePhone: string;
  mobilePhone: string;
  workPhone: string;
  address: string;
  email: string;
}

export interface NamedEntity {
  id: number;
  name: string;
}




export interface GenderDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface MaritalStatusDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface EducationLevelDto {
  id: number;
  name: string;
  order: number;
  years: number;
  isActive: boolean;
}

export interface NationalityDto {
  id: number;
  name: string;
  countryCode: string;
  isActive: boolean;
}

export interface ProfessionDto {
  id: number;
  name: string;
  category: string;
  isActive: boolean;
}