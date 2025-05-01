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

    console.log("Enviando requisição:", requestBody);

    const response = await api.post("/insulin/register", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
    
      const newInsulin = {
        unity: insulin.unity,  // O ID vem da resposta do backend
        name: insulin.name,
        dosage: insulin.dosage,
        userId: userId,
        timestamp: new Date().toISOString(),
      };

       // Dispatch para salvar no Redux
       dispatch({
        type: "PUSH_INSULIN",
        payload: newInsulin,
      });
      console.log("Insulina registrada com sucesso!", newInsulin);
    } else {
      console.error("Erro inesperado ao registrar insulina.", response.status);
    }
  } catch (error) {
    console.error("Erro na requisição:", error.response?.data || error.message);
  }
};

export const updateInsulinField = (id, updatedData, userId) => async (dispatch) => {
  try {
    const requestBody = {
      id: Number(id),
      dosagemQtd: Number(updatedData.dosage),
    };

    console.log("Corpo da requisição (PATCH):", requestBody);

    const response = await api.patch(`/insulin/user/${userId}`, requestBody);

    console.log("✅ Resposta do backend:", response.data);

    dispatch({
      type: "UPDATE_INSULIN_FIELD",
      payload: { 
        id: Number(id), 
        dosage: updatedData.dosage,
        unity: updatedData.unity, // Adicionando a unidade ao payload
        insulina: updatedData.name, // Adicionando o nome ao payload
      },
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

export const fetchInsulinas = (userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token || !userId) throw new Error("Token ou userId não encontrado");

    const response = await api.get(`/insulin/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      dispatch({ type: "SET_INSULINAS", payload: response.data });
    }  
  } catch (error) {
      console.error("Erro ao buscar insulinas:", error.response?.data || error.message);
    }
  };

  export const deleteInsulin = (id, userId) => {
    return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      console.log("Insulina a ser deletada:", id);

      await api.delete(`/insulin/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      });
      dispatch({ type: "DELETE_INSULIN", payload: id });
    } catch (error) {
      console.error("Erro ao deletar insulina:", error.response?.data || error.message);
    } 
  };
};

export const resetInsulin = () => ({
  type: "RESET_INSULIN",
});
