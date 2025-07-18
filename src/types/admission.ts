export type Admission = {
    id: string;
    patient_id: string;
    room: string;
    bed: string;
    status: string;
    date_admitted: string;
    date_discharged?: string;
  };
  
  export type AdmissionWithPatient = Admission & {
    patients: {
      full_name: string;
    };
  };
  