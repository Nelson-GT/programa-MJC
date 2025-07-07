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
    padding: 35,
    fontSize: 10,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 12,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    textDecoration: "underline",
  },
  field: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
  },
  value: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 25,
    borderTop: "1 solid #000",
    paddingTop: 5,
    textAlign: "center",
  },
})

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>
        Programa de Formación Musical "Maestro José Calabrese"
      </Text>
      <Text style={styles.subtitle}>PLANILLA DE INSCRIPCIÓN</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Estudiante</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombres y Apellidos:</Text>
          <Text style={styles.value}>{data.nombreEstudiante}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <Text style={styles.value}>{data.fechaNacimiento}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{data.edad}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Sexo / C.I.:</Text>
          <Text style={styles.value}>{data.sexo} / {data.cedula}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Teléfono Celular:</Text>
          <Text style={styles.value}>{data.telefono}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Institución Educacional:</Text>
          <Text style={styles.value}>{data.institucion}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Ocupación / Profesión / Lugar de Trabajo:</Text>
          <Text style={styles.value}>{data.ocupacion} / {data.profesion} / {data.lugarTrabajo}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Dirección Residencial:</Text>
          <Text style={styles.value}>{data.direccion}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Alergias / Antecedentes:</Text>
          <Text style={styles.value}>{data.alergias} / {data.antecedentes}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Especifique (anexar informe correspondiente):</Text>
          <Text style={styles.value}>{data.alergiasEspecificadas}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del Representante Legal</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre / C.I. / Parentesco:</Text>
          <Text style={styles.value}>
            {data.representanteNombre} / {data.representanteCI} / {data.parentesco}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{data.representanteTelefono}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Ocupación / Profesión:</Text>
          <Text style={styles.value}>
            {data.representanteOcupacion} / {data.representanteProfesion}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Dirección / Email:</Text>
          <Text style={styles.value}>
            {data.representanteDireccion} / {data.representanteEmail}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>En caso de emergencia avisar a / Teléfono:</Text>
          <Text style={styles.value}>
            {data.contactoEmergencia} / {data.numeroEmergencia}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cátedras a Inscribir</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Instrumento(s):</Text>
          <Text style={styles.value}>{data.instrumentosData}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Teóricas:</Text>
          <Text style={styles.value}>{data.teoricasData}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Otros:</Text>
          <Text style={styles.value}>{data.otrosData}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Posee instrumento propio:</Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Beca:</Text>
          <Text style={styles.value}></Text>
        </View>
      </View>
      <View style={styles.field}>
        <Text style={styles.subtitle}>
          Autorizo a la Fundación Orquesta Sinfónica de Carabobo a hacer uso del material fotográfico y audiovisual de las actividades académicas y artísticas que se llevan a cabo durante el desarrollo del Programa de Formación Musical. Las imágenes podrán ser usadas para la difusión en medios de comunicación y redes sociales. 
        </Text>
        <Text style={styles.value}>{data.autorizacion}</Text>
      </View>

      <View style={styles.signatureSection}>
        <Text>Firma del Estudiante o Representante Legal</Text>
        <Text>C.I.: {data.firmaCedula}</Text>
      </View>
    </Page>
  </Document>
)

export async function POST(request) {
  try {
    const data = await request.json()
    const stream = await renderToStream(<MyDocument data={data} />)

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