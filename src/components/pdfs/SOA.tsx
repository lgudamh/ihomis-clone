import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BillingItem } from "@/types/billing";
import { PhilHealthClaim } from "@/types/philhealth";

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 10, textAlign: "center" },
  section: { marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
});

type Props = {
  billing: BillingItem[];
  philhealth?: PhilHealthClaim;
};

export function SOA({ billing, philhealth }: Props) {
  const total = billing.reduce((sum, i) => sum + i.cost, 0);
  const deduction = philhealth?.deduction || 0;
  const balance = total - deduction;

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Statement of Account</Text>

        <View style={styles.section}>
          {billing.map((item) => (
            <View key={item.id} style={styles.row}>
              <Text>{item.item}</Text>
              <Text>₱{item.cost.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text>Total</Text>
            <Text>₱{total.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>PhilHealth Deduction</Text>
            <Text>-₱{deduction.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text><strong>Net Balance</strong></Text>
            <Text><strong>₱{balance.toFixed(2)}</strong></Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
