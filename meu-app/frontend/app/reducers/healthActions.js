// Actions
import api from "../services/api";

export const updateGlucose =
  (userId, glicemiaId, value) => async (dispatch) => {
    try {
      const requestBody = {
        userId: Number(userId),
        glicemiaId: Number(glicemiaId),
        value: Number(value),
      };

      await api.post("/medicalRecord/userGlicemia", requestBody);

      console.log("Enviando dados para API:", requestBody);

      dispatch({
        type: "UPDATE_GLUCOSE",
        payload: { ...requestBody, timestamp: new Date().toISOString() },
      });
    } catch (error) {
      console.log("Erro ao salvar glicemia: ", error);
    }
  };

export const fetchGlucose = (userId) => async (dispatch) => {
  try {
    console.log("Buscando glicemia para o userId:", userId); // DEBUG

    const response = await api.get(`/medicalRecord/adminInsulina/${userId}`);

    console.log("Resposta da API:", response.data); // Verificando os dados retornados

    dispatch({
      type: "SET_GLUCOSE",
      payload: response.data, // Supondo que a API retorna uma lista de registros
    });
  } catch (error) {
    console.error("Erro ao buscar glicemia:", error);

    if (error.response) {
      console.error("Detalhes do erro:", error.response.data);
    }
  }
};
