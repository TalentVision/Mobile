// screens/SignupScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function SignupScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!nome || !email || !senha || !confirmSenha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha !== confirmSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, senha);

      await updateProfile(cred.user, { displayName: nome });

      // Firebase já loga automaticamente
    } catch (err) {
      console.log(err);
      let msg = "Não foi possível criar a conta.";
      if (err.code === "auth/email-already-in-use")
        msg = "Este e-mail já está em uso.";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>TalentVision</Text>
      <Text style={styles.title}>Criar conta</Text>
      <Text style={styles.subtitle}>
        Cadastre-se para acessar todos os recursos.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
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

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmSenha}
        onChangeText={setConfirmSenha}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Criando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Já possui conta?{" "}
          <Text style={styles.linkBold}>Entrar</Text>
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
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: BLUE,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
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
    marginTop: 4,
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
