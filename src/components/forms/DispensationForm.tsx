import { useForm } from "react-hook-form";
import { Dispensation } from "@/types/dispensation";
import { Medicine } from "@/types/medicine";

type Props = {
  admissionId: string;
  medicines: Medicine[];
  onSubmit: (data: Partial<Dispensation>) => void;
};

export function DispensationForm({ admissionId, medicines, onSubmit }: Props) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, admission_id: admissionId }))} className="space-y-2 mt-4">
      <select {...register("medicine_id")} className="w-full border p-2">
        {medicines.map((med) => (
          <option key={med.id} value={med.id}>{med.name}</option>
        ))}
      </select>
      <input type="number" {...register("quantity")} placeholder="Quantity" className="w-full border p-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Dispense</button>
    </form>
  );
}
