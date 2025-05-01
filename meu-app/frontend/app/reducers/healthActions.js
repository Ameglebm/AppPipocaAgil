// Actions
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateGlucose =
  (userId, glicemiaId, value) => async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token || !userId) throw new Error("Token ou userId não encontrado");

      const requestBody = {
        userId: Number(userId),
        glicemiaId: Number(glicemiaId),
        value: Number(value),
      };

      console.log("Enviando requisição:", requestBody);

      const response = await api.post("/medicalRecord/userGlicemia", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        dispatch({
          type: "UPDATE_GLUCOSE",
          payload: { ...requestBody, timestamp: new Date().toISOString() },
        });
  
        console.log("Registro de glicemia salvo com sucesso:", response.data);
      }
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

export const fetchGlucoseTypes = () => async (dispatch) => {
  try {
    const response = await api.get("/medicalRecord/tiposGlicemia");

    dispatch({
      type: "SET_GLUCOSE_TYPES",
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Erro ao buscar glicemia:", error);
  }
};

export const fetchGlucose = (userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (!token || !userId) throw new Error("Token ou userId não encontrado");

    const response = await api.get(`/medicalRecord/userGlicemia/${userId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    if (response.status === 200) {
      const registros = response.data.data;
      const ultimoRegistro = registros.length > 0 ? [registros[0]] : [];
      dispatch({ type: "SET_GLUCOSE", payload: response.data.data});
      console.log("Registros de glicemia recebidos", ultimoRegistro);
    }  
  } catch (error) {
      console.error("Erro ao buscar registros de glicemia:", error.response?.data || error.message);
    }
  };

export const updateBloodPressure = (userId, systolic, diastolic, date, time) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    const requestBody = {
      userId: Number(userId),
      sistolica: Number(systolic),
      diastolica: Number(diastolic),
      date: date.toLocaleDateString("pt-BR"), // Formata a data para o padrão brasileiro
      time: time.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }), // Formata a hora para o padrão brasileiro
    };

    console.log("Enviando requisição:", requestBody);

    const response = await api.post("/medicalRecord/pressaoArterial", requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      dispatch({
        type: "UPDATE_BLOOD_PRESSURE",
        payload: { ...requestBody, timestamp: new Date().toISOString() },
      });

      console.log("Registro de pressão arterial salvo com sucesso:", response.data.data);
    }
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

export const fetchBloodPressure = (userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");

    if (!token || !userId) throw new Error("Token ou userId não encontrado");

    const response = await api.get(`/medicalRecord/pressaoArterial/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const registros = response.data.data;
      const ultimoRegistro = registros.length > 0 ? [registros[0]] : [];
      dispatch({ type: "SET_BLOOD_PRESSURE", payload: response.data.data });
      console.log("Registros de pressão arterial recebidos", ultimoRegistro);
    }  
  } catch (error) {
      console.error("Erro ao buscar registros de pressão:", error.response?.data || error.message);
    }
  };