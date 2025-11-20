// screens/ResumeUploadScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
// quando tiver o backend pronto, podemos importar algo como:
// import { parseResume } from "../services/resumeService";

export default function ResumeUploadScreen() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handlePickFile() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (res.canceled) return;

      const picked = res.assets[0];
      setFile(picked);
      setResult(null); // limpa resultado quando trocar de arquivo
    } catch (err) {
      console.log(err);
      Alert.alert("Erro", "Não foi possível selecionar o arquivo.");
    }
  }

  async function handleUpload() {
    if (!file) {
      Alert.alert("Atenção", "Selecione um arquivo PDF primeiro.");
      return;
    }

    try {
      setLoading(true);

      // 🔹 Aqui depois você chama sua API real de IA:
      // const data = await parseResume(file);
      // setResult(data);

      // Por enquanto, mock para ver a tela funcionando:
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setResult({
        name: "Ana Souza",
        email: "ana@exemplo.com",
        phone: "+55 11 99999-0000",
        skills: ["React", "TypeScript", "SQL"],
        experienceYears: 3,
        score: {
          match: 0.86,
          similarity: 0.82,
          coverage: 0.67,
          overlap_skills: ["React", "TypeScript"],
          missing_skills: ["Testing"],
        },
      });
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Erro",
        "Ocorreu um problema ao enviar o currículo para análise."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.appName}>TalentVision</Text>
      <Text style={styles.title}>Upload de Currículo</Text>
      <Text style={styles.subtitle}>
        Envie um currículo em PDF para que a TalentVision faça a triagem com IA.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. Selecionar arquivo</Text>
        <Text style={styles.cardText}>
          Aceitamos arquivos no formato PDF. O conteúdo será usado apenas para
          análise automática.
        </Text>

        <TouchableOpacity style={styles.buttonOutline} onPress={handlePickFile}>
          <Text style={styles.buttonOutlineText}>Escolher PDF</Text>
        </TouchableOpacity>

        {file && (
          <View style={styles.fileInfo}>
            <Text style={styles.fileLabel}>Arquivo selecionado:</Text>
            <Text style={styles.fileName}>{file.name}</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>2. Enviar para análise</Text>
        <Text style={styles.cardText}>
          A IA irá extrair nome, contato, skills e calcular o match com as vagas
          cadastradas (quando integrar com o backend).
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar para análise</Text>
          )}
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resultado da análise</Text>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Nome:</Text>
            <Text style={styles.resultValue}>{result.name}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Email:</Text>
            <Text style={styles.resultValue}>{result.email}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Telefone:</Text>
            <Text style={styles.resultValue}>{result.phone}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Skills:</Text>
            <Text style={styles.resultValue}>
              {result.skills?.join(", ") || "-"}
            </Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Anos de exp.:</Text>
            <Text style={styles.resultValue}>
              {result.experienceYears ?? "-"}
            </Text>
          </View>

          {result.score && (
            <>
              <View style={[styles.resultRow, { marginTop: 8 }]}>
                <Text style={styles.resultLabel}>Score (0–1):</Text>
                <Text style={styles.resultValue}>
                  {result.score.match.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.resultScoreDetail}>
                Similaridade: {result.score.similarity.toFixed(2)} • Cobertura:{" "}
                {result.score.coverage.toFixed(2)}
              </Text>
              <Text style={styles.resultScoreDetail}>
                Skills em comum: {result.score.overlap_skills.join(", ") || "-"}
              </Text>
              <Text style={styles.resultScoreDetail}>
                Skills faltantes:{" "}
                {result.score.missing_skills.join(", ") || "-"}
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
const BLUE_DARK = "#1D4ED8";
const BG = "#F2F6FC";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  contentContainer: {
    padding: 24,
  },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: BLUE_DARK,
    marginBottom: 4,
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 12,
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonOutlineText: {
    color: BLUE,
    fontWeight: "600",
  },
  fileInfo: {
    marginTop: 10,
  },
  fileLabel: {
    fontSize: 12,
    color: "#6B7280",
  },
  fileName: {
    fontSize: 13,
    color: "#111827",
    marginTop: 2,
  },
  resultRow: {
    flexDirection: "row",
    marginTop: 6,
  },
  resultLabel: {
    fontSize: 13,
    color: "#6B7280",
    width: 110,
  },
  resultValue: {
    fontSize: 13,
    color: "#111827",
    flex: 1,
    flexWrap: "wrap",
  },
  resultScoreDetail: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 2,
  },
});
