export interface PatientsDto {
  id: number;
  patientIdentity: {
    code: string;
    amka: string;
    lastName: string;
    firstName: string;
    status: string;
  };
  demographicInfo: {
    birthDate: string;
    birthPlace: string;
    gender: {
      id: number;
      name: string;
    };
    maritalStatus: {
      id: number;
      name: string;
    };
    fatherName: string;
    motherName: string;
    language: string;
    nationality: {
      id: number;
      name: string;
    };
    profession: {
      id: number;
      name: string;
    };
    education: {
      id: number;
      name: string;
    };
  };
  contactInfo: {
    homePhone: string;
    mobilePhone: string;
    workPhone: string;
    address: string;
    email: string;
  };
}
