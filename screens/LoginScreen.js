// screens/LoginScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (err) {
      console.log(err);
      Alert.alert("Erro ao entrar", "Email ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* LOGO / Marca */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>T</Text>
        </View>
        <Text style={styles.appName}>TalentVision</Text>
        <Text style={styles.appSubtitle}>
          Inteligência para conectar talentos
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Acesse sua conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>
          Não possui conta?{" "}
          <Text style={styles.linkBold}>Criar conta no TalentVision</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const BLUE = "#2D6CDF";
const BG = "#F2F6FC";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: BG,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logoText: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },
  appSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
    color: "#1F2937",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    marginBottom: 12,
  },
  button: {
    backgroundColor: BLUE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  link: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "#374151",
  },
  linkBold: {
    color: BLUE,
    fontWeight: "600",
  },
});
