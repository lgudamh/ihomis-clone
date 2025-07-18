import { useForm } from "react-hook-form";
import { Patient } from "@/types/patient";
import { Admission } from "@/types/admission";

type Props = {
  patients: Patient[];
  initialData?: Partial<Admission>;
  onSubmit: (data: Partial<Admission>) => void;
};

export function AdmissionForm({ patients, initialData = {}, onSubmit }: Props) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <select {...register("patient_id")} required>
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.full_name}
          </option>
        ))}
      </select>
      <input {...register("room")} placeholder="Room No" required />
      <input {...register("bed")} placeholder="Bed No" required />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Save Admission
      </button>
    </form>
  );
}
