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

      const response = await api.post(
        "/medicalRecord/userGlicemia",
        requestBody
      );

      if (response.status === 201) console.log("Registro salvo");

      dispatch({
        type: "UPDATE_GLUCOSE",
        payload: { ...requestBody, timestamp: new Date().toISOString() },
      });
    } catch (error) {
      console.log("Erro ao salvar glicemia: ", error);
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
