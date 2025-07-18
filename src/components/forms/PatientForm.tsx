import { useForm } from "react-hook-form";
import { Patient } from "@/types/patient";

type Props = {
  initialData?: Partial<Patient>;
  onSubmit: (data: Partial<Patient>) => void;
};

export function PatientForm({ initialData = {}, onSubmit }: Props) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input {...register("full_name")} placeholder="Full Name" required />
      <input type="date" {...register("birth_date")} />
      <select {...register("sex")}>
        <option>Male</option>
        <option>Female</option>
      </select>
      <input {...register("address")} placeholder="Address" />
      <input {...register("contact_number")} placeholder="Contact Number" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
