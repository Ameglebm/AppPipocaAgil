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
      console.log("Registro salvo");

      dispatch({
        type: "UPDATE_GLUCOSE",
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
