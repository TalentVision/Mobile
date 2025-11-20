// screens/CandidateDetailsScreen.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CandidateDetailsScreen({ route }) {
  const { candidate } = route.params || {};

  if (!candidate) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Nenhum candidato foi informado.
        </Text>
      </View>
    );
  }

  const matchPct = candidate.match
    ? Math.round(candidate.match * 100)
    : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {candidate.name?.charAt(0)?.toUpperCase() || "C"}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{candidate.name}</Text>
          {candidate.role ? (
            <Text style={styles.role}>{candidate.role}</Text>
          ) : null}
          {candidate.email ? (
            <Text style={styles.email}>{candidate.email}</Text>
          ) : null}
        </View>
      </View>

      {/* Match / Score */}
      {matchPct !== null && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Match com as vagas</Text>
          <Text style={styles.matchValue}>{matchPct}%</Text>
          <Text style={styles.cardText}>
            Este valor representa o quão próximo o perfil do candidato está dos
            requisitos das vagas analisadas pela TalentVision.
          </Text>
        </View>
      )}

      {/* Skills */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>
        {candidate.skills && candidate.skills.length > 0 ? (
          <View style={styles.chipsRow}>
            {candidate.skills.map((skill) => (
              <View key={skill} style={styles.chip}>
                <Text style={styles.chipText}>{skill}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.cardText}>Nenhuma skill informada.</Text>
        )}
      </View>

      {/* Experiência / Info extra */}
      {(candidate.experienceYears ||
        candidate.phone ||
        candidate.city) && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações adicionais</Text>

          {candidate.experienceYears && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Anos de experiência:</Text>
              <Text style={styles.rowValue}>
                {candidate.experienceYears}
              </Text>
            </View>
          )}

          {candidate.phone && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Telefone:</Text>
              <Text style={styles.rowValue}>{candidate.phone}</Text>
            </View>
          )}

          {candidate.city && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Cidade:</Text>
              <Text style={styles.rowValue}>{candidate.city}</Text>
            </View>
          )}
        </View>
      )}

      {/* Resultado da IA (opcional, se vier do backend) */}
      {candidate.iaResult && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Análise da IA</Text>
          {candidate.iaResult.summary && (
            <Text style={styles.cardText}>{candidate.iaResult.summary}</Text>
          )}

          {candidate.iaResult.overlap_skills && (
            <>
              <Text style={[styles.rowLabel, { marginTop: 8 }]}>
                Skills em comum:
              </Text>
              <Text style={styles.rowValue}>
                {candidate.iaResult.overlap_skills.join(", ")}
              </Text>
            </>
          )}

          {candidate.iaResult.missing_skills && (
            <>
              <Text style={[styles.rowLabel, { marginTop: 8 }]}>
                Skills faltantes:
              </Text>
              <Text style={styles.rowValue}>
                {candidate.iaResult.missing_skills.join(", ")}
              </Text>
            </>
          )}
        </View>
      )}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    padding: 24,
  },
  errorText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: "#6B7280",
  },
  header: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  role: {
    fontSize: 13,
    color: "#4B5563",
    marginTop: 2,
  },
  email: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: "#6B7280",
  },
  matchValue: {
    fontSize: 28,
    fontWeight: "700",
    color: BLUE,
    marginBottom: 4,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  chip: {
    backgroundColor: "#E0ECFF",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginTop: 6,
  },
  chipText: {
    color: BLUE,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  rowLabel: {
    fontSize: 13,
    color: "#6B7280",
    width: 140,
  },
  rowValue: {
    fontSize: 13,
    color: "#111827",
    flex: 1,
    flexWrap: "wrap",
  },
});
