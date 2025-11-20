// screens/CandidateDetailsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { fetchCandidateById } from "../services/candidateService";

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

export default function CandidateDetailsScreen({ route }) {
  const { candidateId } = route.params || {};
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!candidateId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhum candidato foi informado.</Text>
      </View>
    );
  }

  useEffect(() => {
    async function loadCandidate() {
      try {
        setLoading(true);
        const data = await fetchCandidateById(candidateId);
        setCandidate(data);
      } catch (err) {
        console.log("Erro ao carregar candidato:", err);
        Alert.alert("Erro", "Não foi possível carregar os dados do candidato.");
      } finally {
        setLoading(false);
      }
    }

    loadCandidate();
  }, [candidateId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color={BLUE} />
        <Text style={{ marginTop: 8, color: "#6B7280" }}>
          Carregando candidato...
        </Text>
      </View>
    );
  }

  if (!candidate) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Candidato não encontrado.</Text>
      </View>
    );
  }

  const matchPct =
    candidate.score && candidate.score.match != null
      ? Math.round(candidate.score.match * 100)
      : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View className="avatar" style={styles.avatar}>
          <Text style={styles.avatarText}>
            {candidate.name?.charAt(0)?.toUpperCase() || "C"}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {candidate.name || "Nome não identificado"}
          </Text>
          {candidate.email ? (
            <Text style={styles.email}>{candidate.email}</Text>
          ) : null}
          {candidate.phone ? (
            <Text style={styles.email}>{candidate.phone}</Text>
          ) : null}
          {candidate.linkedin ? (
            <Text style={styles.email}>{candidate.linkedin}</Text>
          ) : null}
        </View>
      </View>

      {/* Match / Score */}
      {candidate.score && matchPct !== null && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Match com as vagas</Text>
          <Text style={styles.matchValue}>{matchPct}%</Text>
          <Text style={styles.cardText}>
            Este valor representa o quão próximo o perfil do candidato está dos
            requisitos das vagas analisadas pela TalentVision.
          </Text>

          <Text style={[styles.cardText, { marginTop: 8 }]}>
            Similaridade semântica:{" "}
            {candidate.score.similarity?.toFixed(2) ?? "-"} • Cobertura das
            skills: {candidate.score.coverage?.toFixed(2) ?? "-"}
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
          <Text style={styles.cardText}>Nenhuma skill identificada.</Text>
        )}
      </View>

      {/* Experiência / Info extra */}
      {(candidate.experienceYears || candidate.phone || candidate.city) && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações adicionais</Text>

          {candidate.experienceYears && (
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Anos de experiência:</Text>
              <Text style={styles.rowValue}>{candidate.experienceYears}</Text>
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

      {/* Resultado da IA: skills em comum / faltantes */}
      {candidate.score && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Análise da IA</Text>

          {candidate.score.overlap_skills && (
            <>
              <Text style={[styles.rowLabel, { marginTop: 4 }]}>
                Skills em comum:
              </Text>
              <Text style={styles.rowValue}>
                {candidate.score.overlap_skills.length > 0
                  ? candidate.score.overlap_skills.join(", ")
                  : "-"}
              </Text>
            </>
          )}

          {candidate.score.missing_skills && (
            <>
              <Text style={[styles.rowLabel, { marginTop: 8 }]}>
                Skills faltantes:
              </Text>
              <Text style={styles.rowValue}>
                {candidate.score.missing_skills.length > 0
                  ? candidate.score.missing_skills.join(", ")
                  : "-"}
              </Text>
            </>
          )}
        </View>
      )}

      {/* Preview opcional do texto do currículo */}
      {candidate.rawTextPreview && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo do currículo (preview)</Text>
          <Text style={styles.cardText}>{candidate.rawTextPreview}</Text>
        </View>
      )}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

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
