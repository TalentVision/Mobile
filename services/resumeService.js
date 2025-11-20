// services/resumeService.js
import { Platform } from "react-native";
import api from "./api";

export async function parseResume(file, jobSkills = [], jobText = "") {
  const form = new FormData();

  // 👇 Tratamento diferente para web e mobile
  if (Platform.OS === "web" && file.file) {
    // Expo Web: usar o File/Blob real
    form.append("file", file.file, file.name || "curriculo.pdf");
  } else {
    // Android / iOS (React Native): usar uri / type / name
    form.append("file", {
      uri: file.uri,
      name: file.name || "curriculo.pdf",
      type: "application/pdf",
    });
  }

  form.append("job_skills", JSON.stringify(jobSkills));
  form.append("job_text", jobText);

  // ⚠️ NÃO force o Content-Type, deixa o axios/navegador cuidar do boundary
  const response = await api.post("/parse-resume", form);

  return response.data;
}
