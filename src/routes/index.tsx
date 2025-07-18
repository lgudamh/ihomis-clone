import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientListPage from "@/pages/Patients";
import AdmissionPage from "@/pages/Admissions";
import DoctorOrdersPage from "@/pages/DoctorsOrders";
import DischargeSummaryPage from "@/pages/DischargeSummaries";
import BillingPage from "@/pages/Billing";
import PharmacyPage from "@/pages/Pharmacy";


export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/patients" element={<PatientListPage />} />
        <Route path="/admissions" element={<AdmissionPage />} />
        <Route path="/orders" element={<DoctorOrdersPage />} />
        <Route path="/discharge" element={<DischargeSummaryPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
