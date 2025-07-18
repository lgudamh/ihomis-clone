  // types/philhealth.ts
  export type PhilHealthClaim = {
    id: string;
    admission_id: string;
    case_code: string;
    deduction: number;
    cf1?: string;
    cf2?: string;
    created_at?: string;
  };