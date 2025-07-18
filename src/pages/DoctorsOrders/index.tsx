import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { DoctorOrder } from "@/types/doctorsOrder";
import { DoctorOrderForm } from "@/components/forms/DoctorOrderForm";

export default function DoctorOrdersPage() {
  const [orders, setOrders] = useState<DoctorOrder[]>([]);
  const [admissionId, setAdmissionId] = useState<string>("");

  const fetchOrders = async () => {
    if (!admissionId) return;
    const { data } = await supabase
      .from("doctors_orders")
      .select("*")
      .eq("admission_id", admissionId)
      .order("created_at", { ascending: false });
    if (data) setOrders(data);
  };

  const handleAddOrder = async (order: Partial<DoctorOrder>) => {
    await supabase.from("doctors_orders").insert(order);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, [admissionId]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Doctor's Orders</h1>

      <input
        value={admissionId}
        onChange={(e) => setAdmissionId(e.target.value)}
        placeholder="Enter Admission ID"
        className="border px-3 py-2 w-full mb-4"
      />

      {admissionId && <DoctorOrderForm admissionId={admissionId} onSubmit={handleAddOrder} />}

      <ul className="mt-6 space-y-2">
        {orders.map((order) => (
          <li key={order.id} className="border rounded p-3">
            <strong>{order.order_type}</strong>: {order.order_details}
            <div className="text-sm text-gray-500">{new Date(order.created_at!).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
