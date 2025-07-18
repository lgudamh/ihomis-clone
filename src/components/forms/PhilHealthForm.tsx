import { useForm } from "react-hook-form";
import { PhilHealthClaim } from "@/types/philhealth";

export function PhilHealthForm({
  admissionId,
  initialData,
  onSubmit,
}: {
  admissionId: string;
  initialData?: Partial<PhilHealthClaim>;
  onSubmit: (data: Partial<PhilHealthClaim>) => void;
}) {
  const { register, handleSubmit } = useForm({ defaultValues: initialData });

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, admission_id: admissionId }))} className="space-y-2 mt-6">
      <input {...register("case_code")} placeholder="Case Rate Code" className="w-full border p-2" />
      <input type="number" step="0.01" {...register("deduction")} placeholder="Deduction" className="w-full border p-2" />
      <textarea {...register("cf1")} placeholder="CF1 data or URL" className="w-full border p-2" />
      <textarea {...register("cf2")} placeholder="CF2 data or URL" className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save PhilHealth</button>
    </form>
  );
}
