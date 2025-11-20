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
  Alert,
} from "react-native";

import { fetchCandidates } from "../services/candidateService"; // ⬅️ agora usando backend real

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

export default function CandidatesListScreen({ navigation }) {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadCandidates() {
    try {
      setLoading(true);
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (err) {
      console.log("Erro ao carregar candidatos:", err);
      Alert.alert("Erro", "Não foi possível carregar os candidatos.");
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
    const matchPct = item.match
      ? Math.round(item.match * 100)
      : null;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("CandidateDetails", {
            candidateId: item.id, // agora enviamos apenas o ID
          })
        }
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name || "Nome não identificado"}</Text>

          {matchPct !== null && (
            <View style={styles.matchBadge}>
              <Text style={styles.matchBadgeText}>{matchPct}% match</Text>
            </View>
          )}
        </View>

        <Text style={styles.cardEmail}>{item.email || "-"}</Text>

        {item.skills && item.skills.length > 0 && (
          <View style={styles.skillsRow}>
            <Text style={styles.skillLabel}>Skills:</Text>
            <Text style={styles.skillText}>{item.skills.join(", ")}</Text>
          </View>
        )}

        <View style={styles.cardFooter}>
          <Text style={styles.detailsButtonText}>
            Toque para ver detalhes →
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candidatos</Text>
      <Text style={styles.subtitle}>
        Aqui aparecem todos os candidatos analisados pela IA da TalentVision.
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
            Faça upload de currículos na tela de Upload para que eles apareçam aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={candidates}
          keyExtractor={(item) => String(item.id)}
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
    marginTop: 6,
  },
  detailsButtonText: {
    fontSize: 12,
    color: BLUE,
    fontWeight: "600",
    textAlign: "right",
  },
});
