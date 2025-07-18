import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Patient } from "@/types/patient";
import { PatientForm } from "@/components/forms/PatientForm";

export default function PatientListPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const fetchPatients = async () => {
    const { data } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
    if (data) setPatients(data);
  };

  const handleSave = async (patient: Partial<Patient>) => {
    if (selectedPatient) {
      await supabase.from("patients").update(patient).eq("id", selectedPatient.id);
    } else {
      await supabase.from("patients").insert(patient);
    }
    setSelectedPatient(null);
    fetchPatients();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("patients").delete().eq("id", id);
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Patient Management</h1>
      <PatientForm initialData={selectedPatient || {}} onSubmit={handleSave} />

      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Sex</th>
            <th className="border p-2">Birth Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.full_name}</td>
              <td className="border p-2">{p.sex}</td>
              <td className="border p-2">{p.birth_date}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => setSelectedPatient(p)} className="text-blue-500">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
