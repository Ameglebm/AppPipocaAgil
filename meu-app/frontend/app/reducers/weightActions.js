import api from "../services/api";

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
