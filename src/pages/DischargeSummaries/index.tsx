import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DischargeSummary } from "@/types/dischargeSummary";
import { DischargeSummaryForm } from "@/components/forms/DischargeSummaryForm";

export default function DischargeSummaryPage() {
  const [summary, setSummary] = useState<DischargeSummary | null>(null);
  const [admissionId, setAdmissionId] = useState("");

  const fetchSummary = async () => {
    if (!admissionId) return;
    const { data } = await supabase
      .from("discharge_summaries")
      .select("*")
      .eq("admission_id", admissionId)
      .single();
    setSummary(data);
  };

  const handleSave = async (data: Partial<DischargeSummary>) => {
    if (summary) {
      await supabase.from("discharge_summaries").update(data).eq("id", summary.id);
    } else {
      await supabase.from("discharge_summaries").insert(data);
    }
    fetchSummary();
  };

  useEffect(() => {
    fetchSummary();
  }, [admissionId]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Discharge Summary</h1>
      <input
        className="w-full border p-2 mb-4"
        placeholder="Admission ID"
        value={admissionId}
        onChange={(e) => setAdmissionId(e.target.value)}
      />
      {admissionId && (
        <DischargeSummaryForm
          admissionId={admissionId}
          initialData={summary || {}}
          onSubmit={handleSave}
        />
      )}
    </div>
  );
}
