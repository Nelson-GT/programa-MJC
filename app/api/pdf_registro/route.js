import { NextRequest, NextResponse } from "next/server";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  renderToStream,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 25,
    paddingHorizontal: 35,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#333",
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  photoSection: {
    width: "20%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  photoBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  photoText: {
    textAlign: "center",
  },
  logoSection: {
    width: "60%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  mainTitle: {
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    nowrap: "nowrap", // Evita que el título se corte
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 12,
  },
  fieldSubRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "33.333%",
  },
  fieldLabel: {
    fontWeight: "bold",
    marginRight: 4,
    flexShrink: 0,
    fontSize: 10,
  },
  fieldLabelSmall: {
    fontWeight: "bold",
    marginRight: 4,
    flexShrink: 0,
    fontSize: 8,
  },
  fieldValue: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#4B5563",
    paddingHorizontal: 4,
    fontSize: 10,
  },
  fullWidthField: {
    width: "100%",
  },
  fullWidthLabel: {
    flex: 0,
  },
  // ESTILOS DE FIRMA ACTUALIZADOS
  signatureContainer: {
    marginTop: 2,
    alignItems: "flex-end",
  },
  signatureRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 15,
  },
  signatureLabel: {
    fontSize: 10,
    marginRight: 5,
  },
  signatureLine: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: "#4B5563",
  },
});

const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Sección del logo y título principal */}
      <View style={styles.headerContainer}>
        {/* Espacio para la foto, simulado con un View y texto */}
        <View style={styles.photoSection}>
          <View style={styles.photoBox}>
            {data.photoUrl ? (
              <Image src={data.photoUrl} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            ) : (
              <Text style={styles.photoText}>Foto</Text>
            )}
          </View>
        </View>
        <View style={styles.logoSection}>
          <Image src="http://localhost:3000/sinfondo.png" style={styles.logo} />
          <Text style={styles.mainTitle}>
            Programa de Formación Musical "Maestro José Calabrese"
          </Text>
          <Text style={styles.mainTitle}>
            Fundación Orquesta Sinfónica de Carabobo
          </Text>
        </View>
        <View style={{ width: "20%" }}></View> {/* Placeholder para alinear */}
      </View>

      <Text style={styles.formTitle}>PLANILLA DE INSCRIPCIÓN</Text>

      {/* Sección datos del estudiante */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del estudiante</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Nombres y Apellidos:</Text>
          <Text style={styles.fieldValue}>{data.nombreEstudiante}</Text>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>Fecha de Nacimiento:</Text>
            <Text style={styles.fieldValue}>{data.fechaNacimiento}</Text>
          </View>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>Edad:</Text>
            <Text style={styles.fieldValue}>{data.edad}</Text>
          </View>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>Sexo:</Text>
            <Text style={styles.fieldValue}>{data.sexo}</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>C.I.:</Text>
            <Text style={styles.fieldValue}>{data.cedula}</Text>
          </View>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>RIF:</Text>
            <Text style={styles.fieldValue}>{data.rif}</Text>
          </View>
          <View style={styles.fieldSubRow}>
            <Text style={styles.fieldLabel}>Teléfono Celular:</Text>
            <Text style={styles.fieldValue}>{data.telefono}</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Institución Educacional:</Text>
            <Text style={styles.fieldValue}>{data.institucion}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabel}>Ocupación:</Text>
            <Text style={styles.fieldValue}>{data.ocupacion}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabel}>Profesión:</Text>
            <Text style={styles.fieldValue}>{data.profesion}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '66.666%' }}>
            <Text style={styles.fieldLabel}>Lugar de Trabajo:</Text>
            <Text style={styles.fieldValue}>{data.lugarTrabajo}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '33.333%' }}>
            <Text style={styles.fieldLabel}>E-mail:</Text>
            <Text style={styles.fieldValue}>{data.email}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '100%' }}>
            <Text style={styles.fieldLabel}>Dirección Residencial:</Text>
            <Text style={styles.fieldValue}>{data.direccion}</Text>
          </View>
        </View>
        
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Alérgico(a) a:</Text>
            <Text style={styles.fieldValue}>{data.alergias}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Antecedentes (médico, psicológico):</Text>
            <Text style={styles.fieldValue}>{data.antecedentes}</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '100%' }}>
            <Text style={styles.fieldLabel}>Especificar (anexar informe correspondiente):</Text>
            <Text style={styles.fieldValue}>{data.alergiasEspecificadas}</Text>
          </View>
        </View>
      </View>

      {/* Sección datos del representante */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Datos del representante</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Nombres y Apellidos:</Text>
          <Text style={styles.fieldValue}>{data.representanteNombre}</Text>
        </View>

        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '18%' }}>
            <Text style={styles.fieldLabel}>C.I:</Text>
            <Text style={styles.fieldValue}>{data.representanteCI}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '18%' }}>
            <Text style={styles.fieldLabel}>RIF:</Text>
            <Text style={styles.fieldValue}>{data.representanteRif}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '30%' }}>
            <Text style={styles.fieldLabel}>Parentesco:</Text>
            <Text style={styles.fieldValue}>{data.parentesco}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '34%' }}>
            <Text style={styles.fieldLabel}>Teléfono Celular:</Text>
            <Text style={styles.fieldValue}>{data.representanteTelefono}</Text>
          </View>
        </View>

        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabel}>Ocupación:</Text>
            <Text style={styles.fieldValue}>{data.representanteOcupacion}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabel}>Profesión:</Text>
            <Text style={styles.fieldValue}>{data.representanteProfesion}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Lugar de Trabajo:</Text>
            <Text style={styles.fieldValue}>{data.representanteLugarTrabajo}</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Dirección Residencial:</Text>
            <Text style={styles.fieldValue}>{data.representanteDireccion}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>E-mail:</Text>
            <Text style={styles.fieldValue}>{data.representanteEmail}</Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>En caso de emergencia avisar a:</Text>
            <Text style={styles.fieldValue}>{data.contactoEmergencia}</Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Teléfono:</Text>
            <Text style={styles.fieldValue}>{data.numeroEmergencia}</Text>
          </View>
        </View>
      </View>

      {/* Sección Cátedras a Inscribir */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cátedras a Inscribir</Text>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Instrumento(s):</Text>
            <Text style={styles.fieldValue}>{data.instrumentosData} </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Docente(s):</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Teóricas(s):</Text>
            <Text style={styles.fieldValue}>{data.teoricasData} </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Docente(s):</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Otros(s):</Text>
            <Text style={styles.fieldValue}>{data.otrosData} </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '50%' }}>
            <Text style={styles.fieldLabel}>Docente(s):</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '33.333%' }}>
            <Text style={styles.fieldLabel}>Posee instrumento propio:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '66.666%' }}>
            <Text style={styles.fieldLabel}>Instrumento:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.fieldLabel}>Beca:</Text>
          <Text style={styles.fieldValue}> </Text>
        </View>
      </View>

      {/* Sección de autorización */}
      <View style={styles.section}>
        <Text>
          <Text style={{ fontWeight: "bold", fontSize: 10 }}>Autorizo a la Fundación Orquesta Sinfónica de Carabobo a hacer uso del material fotográfico y audiovisual de las actividades académicas y artísticas que se lleven a cabo durante el desarrollo del Programa de Formación Musical. Las imágenes podrán ser usadas para la difusión en medios de comunicación y redes sociales.{" "}</Text>
          <Text style={{ borderBottomWidth: 1, borderBottomColor: "#4B5563", paddingHorizontal: 4 }}>
            {data.autorizacion}
          </Text>
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabelSmall}>Fecha de Ingreso:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '15%' }}>
            <Text style={styles.fieldLabelSmall}>Inscripción:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '28%' }}>
            <Text style={styles.fieldLabelSmall}>Mensualidad 1 Cátedra:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '16%' }}>
            <Text style={styles.fieldLabelSmall}>2 Cátedras:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
          <View style={{ ...styles.fieldSubRow, width: '16%' }}>
            <Text style={styles.fieldLabelSmall}>3 Cátedras:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
        <View style={styles.fieldRow}>
          <View style={{ ...styles.fieldSubRow, width: '25%' }}>
            <Text style={styles.fieldLabelSmall}>Fecha de Egreso:</Text>
            <Text style={styles.fieldValue}> </Text>
          </View>
        </View>
      </View>

      {/* Sección de firmas */}
      <View style={styles.signatureContainer}>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLabel}>Firma del Estudiante o Representante Legal:</Text>
          <View style={styles.signatureLine}></View>
        </View>
        <View style={styles.signatureRow}>
          <Text style={styles.signatureLabel}>Cédula:</Text>
          <View style={styles.signatureLine}></View>
        </View>
      </View>
    </Page>
  </Document>
);

export async function POST(request) {
  try {
    const data = await request.json();
    const stream = await renderToStream(<MyDocument data={data} />);

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error al enviar datos:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}