import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BillingItem } from "@/types/billing";
import { PhilHealthClaim } from "@/types/philhealth";
import { BillingForm } from "@/components/forms/BillingForm";
import { PhilHealthForm } from "@/components/forms/PhilHealthForm";

export default function BillingPage() {
  const [admissionId, setAdmissionId] = useState("");
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [philhealth, setPhilhealth] = useState<PhilHealthClaim | null>(null);

  const fetchBilling = async () => {
    const { data } = await supabase.from("billing").select("*").eq("admission_id", admissionId);
    if (data) setBillingItems(data);
  };

  const fetchPhilHealth = async () => {
    const { data } = await supabase.from("philhealth_claims").select("*").eq("admission_id", admissionId).single();
    if (data) setPhilhealth(data);
  };

  const handleBillingSubmit = async (item: Partial<BillingItem>) => {
    await supabase.from("billing").insert(item);
    fetchBilling();
  };

  const handlePhilhealthSubmit = async (claim: Partial<PhilHealthClaim>) => {
    if (philhealth) {
      await supabase.from("philhealth_claims").update(claim).eq("id", philhealth.id);
    } else {
      await supabase.from("philhealth_claims").insert(claim);
    }
    fetchPhilHealth();
  };

  const total = billingItems.reduce((sum, item) => sum + item.cost, 0);
  const deduction = philhealth?.deduction || 0;
  const balance = total - deduction;

  useEffect(() => {
    if (admissionId) {
      fetchBilling();
      fetchPhilHealth();
    }
  }, [admissionId]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Billing & PhilHealth</h1>
      <input
        className="w-full border p-2 mb-4"
        placeholder="Enter Admission ID"
        value={admissionId}
        onChange={(e) => setAdmissionId(e.target.value)}
      />

      {admissionId && (
        <>
          <BillingForm admissionId={admissionId} onSubmit={handleBillingSubmit} />
          <ul className="mt-4 space-y-2">
            {billingItems.map((item) => (
              <li key={item.id} className="border p-2 flex justify-between">
                <span>{item.item}</span>
                <span>₱{item.cost.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t pt-2">
            <p>Total: ₱{total.toFixed(2)}</p>
            <p>PhilHealth Deduction: ₱{deduction.toFixed(2)}</p>
            <p><strong>Net Balance: ₱{balance.toFixed(2)}</strong></p>
          </div>

          <PhilHealthForm admissionId={admissionId} initialData={philhealth || {}} onSubmit={handlePhilhealthSubmit} />
        </>
      )}
    </div>
  );
}
