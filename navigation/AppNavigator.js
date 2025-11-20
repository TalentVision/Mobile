// navigation/AppNavigator.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/LoginScreen";
import JobsListScreen from "../screens/JobsListScreen";
import SignupScreen from "../screens/SignupScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ResumeUploadScreen from "../screens/ResumeUploadScreen";
import CandidatesListScreen from "../screens/CandidatesListScreen";
import CandidateDetailsScreen from "../screens/CandidateDetailsScreen"; // ⬅ IMPORT

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn }) {
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ title: "TalentVision" }}
          />

          <Stack.Screen
            name="JobsList"
            component={JobsListScreen}
            options={{ title: "Vagas" }}
          />

          <Stack.Screen
            name="ResumeUpload"
            component={ResumeUploadScreen}
            options={{ title: "Upload de Currículo" }}
          />

          <Stack.Screen
            name="CandidatesList"
            component={CandidatesListScreen}
            options={{ title: "Candidatos" }}
          />

          <Stack.Screen
            name="CandidateDetails"
            component={CandidateDetailsScreen}
            options={{ title: "Detalhes do Candidato" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ title: "Criar conta" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
