import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const pushMedication = (medicationData, userId, onSuccess, onError) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const requestBody = {
        userId,
        nomeMedicamento: medicationData.name,
        tipoDosagem: medicationData.unit,
        tipoTratamentoId: parseInt(medicationData.treatment, 10) || 1,
        dosagemPorAdministracao: medicationData.dosageAdm,
        dosesRestantes: Number(medicationData.doseLeft) || 0,
      };

      console.log("Enviando requisição:", requestBody);

      const response = await api.post("/userMedicines", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Medicamento registrado com sucesso!");
        dispatch({
          type: "PUSH_MEDICATION",
          payload: {
            id: response.data.id,
            ...medicationData,
            userId,
            timestamp: new Date().toISOString(),
          },
        });

        onSuccess?.();
      } else {
        onError?.("Erro ao salvar medicamento");
      }
    } catch (error) {
      onError?.(error.message || "Erro desconhecido");
    }
  };
};

export const fetchMedications = (userId) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const response = await api.get(`/userMedicines/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch({
          type: "SET_MEDICATIONS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error.response?.data || error.message);
    }
  };
};


export const updateMedicationField = (updatedData) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const response = await api.patch(`/userMedicines/`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {  // Verifica se o status é 200
        console.log("Atualizando medicamento:", response.data);
        
        dispatch({
          type: "UPDATE_MEDICATION_FIELD",
          payload: updatedData,  // Passa os dados atualizados para o reducer
        });
      } else {
        console.error("Erro ao atualizar medicamento", response.status);
      }
    } catch (error) {
      console.error("Erro desconhecido:", error.message || error);
    }
  };
};

export const deleteMedications = (id, userId) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const response = await api.delete(`/userMedicines/${userId}/medicine/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        dispatch({
          type: "DELETE_MEDICATION",
          payload: id,
        });
      } else {
        console.error("Erro ao deletar medicamento:", response.status);
      }
    } catch (error) {
      console.error("Erro ao deletar medicamento:", error.response?.data || error.message);
    }
  };
};
