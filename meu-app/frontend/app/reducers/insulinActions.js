// actions/insulinActions.js

import api from "../services/api";

export const pushInsulin = (insulin, userId) => async (dispatch) => {
  try {
    const requestBody = {
      userId: Number(userId),
      insulina: insulin.name,
      dosagemQtd: Number (insulin.dosage),
    };

    const payload = {
      id: insulin.id,               // Garante que o ID seja salvo
      name: insulin.name,           // Salva o nome para exibir
      unity: insulin.unity,         // Salva a unidade selecionada
      dosage: insulin.dosage,}

    console.log("Corpo da requisição (POST):", requestBody);

    const response = await api.post("/insulin/register", requestBody);
    console.log("Requisição enviada:", response);

    dispatch({
      type: "PUSH_INSULIN",
      payload: { ...requestBody, payload, timestamp: new Date().toISOString() },
    });
  } catch (error) {
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
