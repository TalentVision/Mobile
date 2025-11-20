// screens/CandidatesListScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

const MOCK_CANDIDATES = [
  {
    id: "1",
    name: "Ana Souza",
    email: "ana@exemplo.com",
    role: "Desenvolvedora Front-end",
    skills: ["React", "TypeScript", "Testing"],
    match: 0.86,
  },
  {
    id: "2",
    name: "Bruno Lima",
    email: "bruno@exemplo.com",
    role: "Engenheiro Back-end",
    skills: [".NET", "SQL", "Azure"],
    match: 0.79,
  },
  {
    id: "3",
    name: "Carla Santos",
    email: "carla@exemplo.com",
    role: "Full Stack",
    skills: ["React", "Node.js", "PostgreSQL"],
    match: 0.82,
  },
];

export default function CandidatesListScreen({ navigation }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCandidates() {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800)); // simula delay
      setCandidates(MOCK_CANDIDATES);
    } catch (err) {
      console.log("Erro ao carregar candidatos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCandidates();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await loadCandidates();
    setRefreshing(false);
  }

  function renderItem({ item }) {
    const matchPct = Math.round((item.match || 0) * 100);

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("CandidateDetails", { candidate: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>{matchPct}% match</Text>
          </View>
        </View>

        <Text style={styles.cardRole}>{item.role}</Text>
        <Text style={styles.cardEmail}>{item.email}</Text>

        <View style={styles.skillsRow}>
          <Text style={styles.skillLabel}>Skills:</Text>
          <Text style={styles.skillText}>{item.skills.join(", ")}</Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.detailsButtonText}>Toque para ver detalhes →</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candidatos</Text>
      <Text style={styles.subtitle}>
        Aqui você vê os candidatos que já foram analisados pela TalentVision.
      </Text>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={BLUE} />
          <Text style={styles.loadingText}>Carregando candidatos...</Text>
        </View>
      ) : candidates.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhum candidato ainda</Text>
          <Text style={styles.emptyText}>
            Faça o upload de currículos na tela de Upload para que eles
            apareçam aqui após a análise.
          </Text>
        </View>
      ) : (
        <FlatList
          data={candidates}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[BLUE]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
  },
  loadingBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 8,
    color: "#4B5563",
    fontSize: 13,
  },
  emptyBox: {
    marginTop: 40,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  matchBadge: {
    backgroundColor: BLUE,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  matchBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  cardRole: {
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 2,
  },
  cardEmail: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  skillLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginRight: 4,
  },
  skillText: {
    fontSize: 12,
    color: "#111827",
    flex: 1,
    flexWrap: "wrap",
  },
  cardFooter: {
    marginTop: 4,
  },
  detailsButtonText: {
    fontSize: 12,
    color: BLUE,
    fontWeight: "600",
    textAlign: "right",
  },
});
