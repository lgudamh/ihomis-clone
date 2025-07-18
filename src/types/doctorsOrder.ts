export type DoctorOrder = {
    id: string;
    admission_id: string;
    doctor_id?: string;
    order_type: "Medication" | "Procedure" | "Diet" | "Lab";
    order_details: string;
    created_at?: string;
  };