import { useForm } from "react-hook-form";
import { Medicine } from "@/types/medicine";

export function MedicineForm({ onSubmit }: { onSubmit: (data: Partial<Medicine>) => void }) {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input {...register("name")} placeholder="Medicine Name" className="w-full border p-2" />
      <textarea {...register("description")} placeholder="Description" className="w-full border p-2" />
      <input type="number" {...register("stock")} placeholder="Stock Quantity" className="w-full border p-2" />
      <input type="number" step="0.01" {...register("price")} placeholder="Unit Price" className="w-full border p-2" />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Add Medicine</button>
    </form>
  );
}
