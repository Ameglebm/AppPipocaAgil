import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addWeightRecord = (peso, userId) => async (dispatch) => {
  try {
    const requestBody = {
      peso: Number(peso),
      userId: Number(userId),
    };

    await api.post("/medicalRecord/userPeso", requestBody);
    console.log("Registro salvo", requestBody);

    dispatch({
      type: "ADD_WEIGHT_RECORD",
      payload: { ...requestBody, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    if (error.response?.status === 400) {
      console.error("Erro de validação: Verifique os dados enviados.");
    } else if (error.response?.status === 500) {
      console.error("Erro interno do servidor. Tente novamente mais tarde");
    } else {
      console.error(
        `Erro inesperado: ${error.response?.status || "Desconhecido"} - ${error.response?.data?.message || "Erro desconhecido"}`
      );
    }
  }
};

export const fetchWeight = (userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token || !userId) throw new Error("Token ou userId não encontrado");

    const response = await api.get(`/medicalRecord/userPeso/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    
    if (response.status === 200) {
      const registros = response.data.data;

      const registrosFormatados = registros.map((record) => {
        const dateObj = new Date(record.createdAt);
        return {
          ...record,
          date: dateObj.toLocaleDateString("pt-BR"),
          time: dateObj.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });

      dispatch({ type: "SET_WEIGHT", payload: registrosFormatados });
      console.log("Registros de peso recebidos", registrosFormatados.slice(0, 1));
    }
  } catch (error) {
    console.error(
      "Erro ao buscar registros de peso:",
      error.response?.data || error.message
    );
  }
};