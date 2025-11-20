// services/candidateService.js
import api from "./api";

export async function fetchCandidates() {
  const res = await api.get("/candidates");
  return res.data.items || [];
}

export async function fetchCandidateById(id) {
  const res = await api.get(`/candidates/${id}`);
  return res.data;
}
