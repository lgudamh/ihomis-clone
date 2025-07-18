import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Medicine } from "@/types/medicine";
import { Dispensation } from "@/types/dispensation";
import { MedicineForm } from "@/components/forms/MedicineForm";
import { DispensationForm } from "@/components/forms/DispensationForm";

export default function PharmacyPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [dispensations, setDispensations] = useState<Dispensation[]>([]);
  const [admissionId, setAdmissionId] = useState("");

  const fetchData = async () => {
    const { data: meds } = await supabase.from("medicines").select("*");
    const { data: logs } = await supabase
      .from("dispensations")
      .select("*, medicine:medicine_id(name)")
      .eq("admission_id", admissionId);

    setMedicines(meds || []);
    setDispensations(logs || []);
  };

  const handleAddMedicine = async (med: Partial<Medicine>) => {
    await supabase.from("medicines").insert(med);
    fetchData();
  };

  const handleDispense = async (log: Partial<Dispensation>) => {
    const med = medicines.find((m) => m.id === log.medicine_id);
    if (!med || med.stock < Number(log.quantity)) {
      alert("Insufficient stock");
      return;
    }

    await supabase.from("dispensations").insert(log);
    await supabase
      .from("medicines")
      .update({ stock: med.stock - Number(log.quantity) })
      .eq("id", med.id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [admissionId]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Pharmacy Module</h1>

      <MedicineForm onSubmit={handleAddMedicine} />

      <hr className="my-6" />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Admission ID"
        value={admissionId}
        onChange={(e) => setAdmissionId(e.target.value)}
      />

      {admissionId && (
        <>
          <DispensationForm
            admissionId={admissionId}
            medicines={medicines}
            onSubmit={handleDispense}
          />

          <ul className="mt-4 space-y-2">
            {dispensations.map((d) => (
              <li key={d.id} className="border p-2">
                Dispensed {d.quantity} of {d.medicine?.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
