# 📱 README — TalentVision Mobile (App Expo/React Native)

## 🚀 TalentVision – App Mobile de Triagem Inteligente de Currículos

Este repositório contém o **aplicativo mobile da TalentVision**, desenvolvido com **Expo (React Native)**, que se conecta à API em FastAPI para:

- Fazer **upload de currículos em PDF**
- Enviar para análise por **IA**
- Exibir **skills extraídas**, contatos e anos de experiência
- Mostrar o **score de match** entre candidato e vagas
- Listar candidatos já analisados e ver seus detalhes

O app faz parte do projeto da **Global Solution – IOT**, integrando visão de negócio, IA e mobile.

---

## 🧠 Principais Funcionalidades

- Tela de **Login** e **Cadastro** (Firebase Auth)
- Tela **Dashboard** com visão geral (atalhos para:
  - Upload de Currículo
  - Lista de Candidatos
  - Vagas)
- Tela **Upload de Currículo**:
  - Seleciona PDF com `expo-document-picker`
  - Envia para API FastAPI (`/parse-resume`)
  - Exibe resultado da análise (nome, email, telefone, skills, anos de experiência, match)
- Tela **Lista de Candidatos**:
  - Consome `GET /candidates`
  - Exibe nome, email, skills principais e score
- Tela **Detalhes do Candidato**:
  - Consome `GET /candidates/{id}`
  - Mostra dados completos do candidato, incluindo análise da IA
  - - Tela **Vagas**:
  - Formulario de cadastro de vagas e exibição

---

## 🛠️ Tecnologias Utilizadas

### Frontend Mobile

- **Expo** (React Native)
- **React Navigation** (Stack Navigator)
- **Firebase Authentication** (login/cadastro de usuário)
- **Axios** (chamadas HTTP para a API)
- **expo-document-picker** (seleção de arquivos PDF)
- **React Native Web** (para rodar o app também no navegador durante o desenvolvimento)

### Integração com Backend

- API em **FastAPI** 
- Endpoints principais:
  - `POST /parse-resume` — envia PDF + dados da vaga e recebe análise da IA
  - `GET /candidates` — lista candidatos analisados
  - `GET /candidates/{id}` — detalhes de um candidato específico

---

## 📦 Pré-requisitos

- Node.js instalado (versão LTS recomendada)
- **Expo CLI** (usando `npx` já funciona)
- Conta no **Firebase** (para configurar autenticação)
- Backend FastAPI rodando (ver repositório `TalentVision IOT API`)

---

## 🔧 Configuração do Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/TalentVision/Mobile.git
cd Mobile
```

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar o Firebase

Crie um projeto no **Firebase Console**, ative o **Authentication (Email/Senha)** e copie as credenciais do app web.

No projeto, crie o arquivo:

```bash
./firebase/firebaseConfig.js
```

Com algo assim:

```js
// firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. Configurar a URL da API (FastAPI)

No arquivo:

```bash
./services/api.js
```

Defina a URL da API:

```js
import axios from "axios";

// Para desenvolvimento web (rodando backend na mesma máquina):
export const API_BASE_URL = "http://127.0.0.1:8000";

// Se for testar em dispositivo físico, usar o IP da máquina:
// export const API_BASE_URL = "http://192.168.X.X:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

export default api;
```

---

## ▶️ Como Rodar o App

### 1. Rodar o backend

Certifique-se que a API FastAPI está rodando:

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

### 2. Rodar o app Expo

No diretório do app mobile:

```bash
npx expo start
```

Você pode rodar:

- **no navegador (web)**  
- **no emulador Android/iOS**  
- **no celular físico (via app Expo Go)**  

---

## 🌐 Fluxo de Uso

1. Usuário faz login/cadastro (Firebase Auth)
2. Acessa o Dashboard TalentVision
3. Vai para **Upload de Currículo**
4. Seleciona um PDF
5. O app envia o arquivo para `POST /parse-resume`
6. O backend:
   - extrai dados do currículo
   - calcula o match com a vaga
   - salva no banco (SQLite)
7. O app exibe o resultado na tela
8. O candidato também aparece na **Lista de Candidatos**
9. Ao clicar em um candidato, abre a tela de **Detalhes**, com toda a análise da IA

---

## 📂 Estrutura Básica de Pastas (Sugestão)

```bash
.
├── App.js
├── navigation/
│   └── AppNavigator.js
├── screens/
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   ├── DashboardScreen.js
│   ├── ResumeUploadScreen.js
│   ├── CandidatesListScreen.js
│   └── CandidateDetailsScreen.js
├── services/
│   ├── api.js
│   ├── resumeService.js
│   └── candidateService.js
└── firebase/
    └── firebaseConfig.js
```

---

## 👥 Participantes

| Nome             | RM              |
|------------------|-----------------|
| Kleber da Silva  | **RM - 557887** |
| Lucas Rainha     | **RM - 558471** |
| Nicolas Barutti  | **RM - 554944** |

---

## ✔️ Conclusão

O app mobile da TalentVision é a interface que conecta recrutadores/usuários à IA de triagem de currículos, permitindo uma experiência moderna e centralizada para análise de talentos.

Ele demonstra:

- Integração entre **mobile + backend + IA**
- Uso de **Expo/React Native** com **Firebase**
- Comunicação com API em **FastAPI** para processamento avançado de currículos.

