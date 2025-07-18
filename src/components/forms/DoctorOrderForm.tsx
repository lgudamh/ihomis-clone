import { useForm } from "react-hook-form";
import { DoctorOrder } from "@/types/doctorsOrder";

type Props = {
  admissionId: string;
  onSubmit: (data: Partial<DoctorOrder>) => void;
};

export function DoctorOrderForm({ admissionId, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<Partial<DoctorOrder>>({
    defaultValues: { order_type: "Medication" },
  });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, admission_id: admissionId }))} className="space-y-3">
      <select {...register("order_type")}>
        <option>Medication</option>
        <option>Procedure</option>
        <option>Diet</option>
        <option>Lab</option>
      </select>
      <textarea {...register("order_details")} placeholder="Order Details" rows={3} />
      <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
        Add Order
      </button>
    </form>
  );
}
