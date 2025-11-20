// screens/JobsListScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TextInput,
  ScrollView,
} from "react-native";

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

const MOCK_JOBS = [
  {
    id: "j1",
    title: "Desenvolvedor(a) Front-end React",
    company: "TechWave",
    location: "São Paulo - SP",
    seniority: "Pleno",
    skills: ["React", "TypeScript", "Testing"],
    openings: 2,
  },
  {
    id: "j2",
    title: "Engenheiro(a) Back-end .NET",
    company: "CloudBridge",
    location: "Remoto",
    seniority: "Sênior",
    skills: [".NET", "SQL Server", "Azure"],
    openings: 1,
  },
  {
    id: "j3",
    title: "Desenvolvedor(a) Full Stack",
    company: "Inova Labs",
    location: "Campinas - SP",
    seniority: "Júnior",
    skills: ["React", "Node.js", "PostgreSQL"],
    openings: 3,
  },
];

export default function JobsListScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // campos do formulário de nova vaga
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [seniority, setSeniority] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [openings, setOpenings] = useState("1");
  const [saving, setSaving] = useState(false);

  async function loadJobs() {
    try {
      setLoading(true);
      // aqui depois você chama sua API real:
      // const data = await listJobs();
      // setJobs(data.items);
      await new Promise((r) => setTimeout(r, 800)); // simula delay
      setJobs(MOCK_JOBS);
    } catch (err) {
      console.log("Erro ao carregar vagas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await loadJobs();
    setRefreshing(false);
  }

  function handleCreateJob() {
    if (!title || !company || !location) {
      alert("Preencha pelo menos título, empresa e local.");
      return;
    }

    setSaving(true);

    const skills =
      skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) || [];

    const openingsNumber = parseInt(openings, 10);
    const newJob = {
      id: `local-${Date.now()}`,
      title,
      company,
      location,
      seniority: seniority || "Não informada",
      skills,
      openings: isNaN(openingsNumber) ? 1 : openingsNumber,
    };

    setJobs((prev) => [newJob, ...prev]);

    // limpa o formulário
    setTitle("");
    setCompany("");
    setLocation("");
    setSeniority("");
    setSkillsInput("");
    setOpenings("1");
    setSaving(false);
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => {
          // quando criar JobDetailsScreen:
          // navigation.navigate("JobDetails", { job: item });
        }}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <View style={styles.seniorityBadge}>
            <Text style={styles.seniorityText}>{item.seniority}</Text>
          </View>
        </View>

        <Text style={styles.company}>{item.company}</Text>
        <Text style={styles.location}>{item.location}</Text>

        {item.skills && item.skills.length > 0 && (
          <View style={styles.skillsRow}>
            {item.skills.map((skill) => (
              <View key={skill} style={styles.chip}>
                <Text style={styles.chipText}>{skill}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footerRow}>
          <Text style={styles.openingsText}>
            {item.openings} {item.openings === 1 ? "vaga aberta" : "vagas abertas"}
          </Text>
          <Text style={styles.detailsText}>Toque para ver detalhes →</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <Text style={styles.title}>Vagas</Text>
      <Text style={styles.subtitle}>
        Cadastre e gerencie as oportunidades disponíveis na TalentVision.
      </Text>

      {/* Card de cadastro de nova vaga */}
      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Cadastrar nova vaga</Text>
        <Text style={styles.formSubtitle}>
          Preencha os campos abaixo para adicionar uma nova vaga à lista.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título da vaga (ex: Dev Front-end React)"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Empresa"
          value={company}
          onChangeText={setCompany}
        />

        <TextInput
          style={styles.input}
          placeholder="Local (ex: São Paulo - SP / Remoto)"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Senioridade (Júnior, Pleno, Sênior...)"
          value={seniority}
          onChangeText={setSeniority}
        />

        <TextInput
          style={styles.input}
          placeholder="Skills (separe por vírgula, ex: React, TypeScript, SQL)"
          value={skillsInput}
          onChangeText={setSkillsInput}
        />

        <TextInput
          style={styles.input}
          placeholder="Número de vagas (ex: 1)"
          value={openings}
          onChangeText={setOpenings}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.saveButton, saving && { opacity: 0.7 }]}
          onPress={handleCreateJob}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? "Salvando..." : "Cadastrar vaga"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de vagas */}
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={BLUE} />
          <Text style={styles.loadingText}>Carregando vagas...</Text>
        </View>
      ) : jobs.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Nenhuma vaga cadastrada</Text>
          <Text style={styles.emptyText}>
            Use o formulário acima para cadastrar a primeira vaga.
          </Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 8 }}
          scrollEnabled={false} // ScrollView já cuida do scroll
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[BLUE]}
            />
          }
        />
      )}
    </ScrollView>
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
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  formTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 10,
    fontSize: 13,
  },
  saveButton: {
    backgroundColor: BLUE,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },
  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  loadingText: {
    marginTop: 8,
    color: "#4B5563",
    fontSize: 13,
  },
  emptyBox: {
    marginTop: 24,
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
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    paddingRight: 8,
  },
  seniorityBadge: {
    backgroundColor: BLUE,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  seniorityText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  company: {
    fontSize: 13,
    color: "#4B5563",
  },
  location: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
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
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  openingsText: {
    fontSize: 12,
    color: "#4B5563",
  },
  detailsText: {
    fontSize: 12,
    color: BLUE,
    fontWeight: "600",
  },
});
