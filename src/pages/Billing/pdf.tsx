import { PDFDownloadLink } from "@react-pdf/renderer";
import { SOA } from "@/components/pdfs/SOA";

export default function SOAPDFPage({ billing, philhealth }) {
  return (
    <PDFDownloadLink
      document={<SOA billing={billing} philhealth={philhealth} />}
      fileName="soa.pdf"
      className="bg-indigo-600 text-white px-4 py-2 rounded"
    >
      {({ loading }) => (loading ? "Loading PDF..." : "Download SOA PDF")}
    </PDFDownloadLink>
  );
}
