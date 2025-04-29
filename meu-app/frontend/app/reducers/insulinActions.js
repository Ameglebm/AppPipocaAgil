// actions/insulinActions.js

import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const pushInsulin = (insulin, userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const requestBody = {
      userId: Number(userId),
      insulina: insulin.name,
      dosagemQtd: Number (insulin.dosage),
    };

    console.log("Corpo da requisição (POST):", requestBody);

    const response = await api.post("/insulin/register", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "PUSH_INSULIN",
      payload: { ...requestBody, timestamp: new Date().toISOString() },
    });

  switch (response.status) {
        case 201:
          console.log("Insulina do usuário registrado com sucesso!", response.data);
          
          break;

        case 400:
          console.error("Erro de validação! Verifique os dados enviados.");
          break;

        case 500:
          console.error("Erro interno do servidor");
          break;

        default:
          console.error("Resposta inesperada do servidor", response.status);
          break;
      }
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      );
    }
};

export const updateInsulinField = (id, updatedData, userId) => async (dispatch) => {
  try {
    const requestBody = {
      userId: Number(userId),
      insulina: updatedData.name,
      dosagemQtd: Number(updatedData.dosage),
    };

    console.log("Corpo da requisição (PUT):", requestBody);

    const response = await api.put(`/insulin/register/${id}`, requestBody);

    console.log("✅ Resposta do backend:", response.data);

    dispatch({
      type: "UPDATE_INSULIN_FIELD",
      payload: { id: Number(id), ...updatedData },
    });
  } catch (error) {
    console.error("❌ Erro completo:", error);
    console.error("❌ Detalhe da resposta:", error.response?.data);

    if (error.response?.status === 400) {
      console.error("Erro de validação: Verifique os dados enviados.");
    } else if (error.response?.status === 500) {
      console.error("Erro interno do servidor. Tente novamente mais tarde.");
    } else {
      console.error(
        `Erro inesperado: ${error.response?.status || "Desconhecido"} - ${error.response?.data?.message || "Erro desconhecido"}`
      );
    }
  }
};

export const removeInsulin = (id) => ({
  type: "REMOVE_INSULIN",
  payload: id,
});

export const resetInsulin = () => ({
  type: "RESET_INSULIN",
});
