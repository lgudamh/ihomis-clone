import { useForm } from "react-hook-form";
import { BillingItem } from "@/types/billing";

export function BillingForm({
  admissionId,
  onSubmit,
}: {
  admissionId: string;
  onSubmit: (data: Partial<BillingItem>) => void;
}) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, admission_id: admissionId }))} className="space-y-2">
      <input {...register("item")} placeholder="Item name" className="w-full border p-2" />
      <input type="number" step="0.01" {...register("cost")} placeholder="Cost" className="w-full border p-2" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
    </form>
  );
}
