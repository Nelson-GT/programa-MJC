import next from "next";
import { NextRequest, NextResponse } from "next/server";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d3d3d3",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
  },
  tableCell: {
    padding: 5,
    borderRightWidth: 1,
    borderColor: "#d3d3d3",
    flex: 1,
  },
  totalRow: {
    fontWeight: "bold",
    fontSize: 14,
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#555",
  },
});

// Create Document Component
const MyDocument = ({ invoiceid }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Text>Invoice ID: {invoiceid}</Text>
        <Text>Date: {new Date().toLocaleDateString()}</Text>
      </View>

      {/* Bill To Section */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Bill To:</Text>
        <Text>Client Name</Text>
        <Text>456 Client Avenue</Text>
        <Text>City, State, ZIP</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Item</Text>
          <Text style={styles.tableCellHeader}>Quantity</Text>
          <Text style={styles.tableCellHeader}>Unit Price</Text>
          <Text style={styles.tableCellHeader}>Total</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Service A</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>$100.00</Text>
          <Text style={styles.tableCell}>$100.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Service B</Text>
          <Text style={styles.tableCell}>2</Text>
          <Text style={styles.tableCell}>$50.00</Text>
          <Text style={styles.tableCell}>$100.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Product X</Text>
          <Text style={styles.tableCell}>1</Text>
          <Text style={styles.tableCell}>$200.00</Text>
          <Text style={styles.tableCell}>$200.00</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.totalRow]}>Total</Text>
          <Text style={[styles.tableCell, styles.totalRow]}></Text>
          <Text style={[styles.tableCell, styles.totalRow]}></Text>
          <Text style={[styles.tableCell, styles.totalRow]}>$400.00</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
        <Text>If you have any questions, contact us at email@example.com</Text>
      </View>
    </Page>
  </Document>
);

export async function POST(request) {
  try {
    const { id } = await request.json()
    const stream = await renderToStream(<MyDocument invoiceid={id} />)

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
      },
    })
  } catch (error) {
    console.error("Error al enviar datos:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}