// types/dispensation.ts
export type Dispensation = {
    id: string;
    medicine_id: string;
    admission_id: string;
    quantity: number;
    dispensed_at?: string;
  };