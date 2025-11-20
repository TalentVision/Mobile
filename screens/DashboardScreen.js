// screens/DashboardScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

export default function DashboardScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const name = user.displayName || user.email || "";
      const first = name.split(" ")[0];
      setFirstName(first);
    }
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      // AuthContext vai detectar que não tem mais usuário e voltar para Login
    } catch (err) {
      console.log("Erro ao sair:", err);
    }
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appName}>TalentVision</Text>
          <Text style={styles.appSubtitle}>
            Inteligência para triagem de talentos
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Saudação */}
      <View style={styles.greetingBox}>
        <Text style={styles.greetingTitle}>
          Olá{firstName ? `, ${firstName}` : ""}
        </Text>
        <Text style={styles.greetingText}>
          Bem-vindo(a) ao painel da TalentVision. Aqui você acompanha
          candidatos, vagas e faz upload de currículos para análise com IA.
        </Text>
      </View>

      {/* Ações principais */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.cardPrimary}
          onPress={() => navigation.navigate("ResumeUpload")}
        >
          <Text style={styles.cardTitle}>Upload de Currículo</Text>
          <Text style={styles.cardText}>
            Envie um PDF para que a IA extraia dados e calcule o match com as
            vagas.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardSecondary}
          onPress={() => navigation.navigate("CandidatesList")}
        >
          <Text style={styles.cardTitleSecondary}>Candidatos</Text>
          <Text style={styles.cardTextSecondary}>
            Visualize e gerencie os candidatos analisados pela TalentVision.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardSecondary}
          onPress={() => navigation.navigate("JobsList")}
        >
          <Text style={styles.cardTitleSecondary}>Vagas</Text>
          <Text style={styles.cardTextSecondary}>
            Cadastre vagas e defina as skills para o cálculo de compatibilidade.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const BLUE = "#2D6CDF";
const BLUE_DARK = "#1D4ED8";
const BG = "#F2F6FC";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: BG,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: BLUE_DARK,
  },
  appSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFFAA",
  },
  logoutText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "500",
  },
  greetingBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
  },
  greetingText: {
    fontSize: 13,
    color: "#6B7280",
  },
  cardsContainer: {
    flex: 1,
    gap: 12,
  },
  cardPrimary: {
    backgroundColor: BLUE,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    color: "#E5E7EB",
  },
  cardSecondary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitleSecondary: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardTextSecondary: {
    fontSize: 13,
    color: "#6B7280",
  },
});
