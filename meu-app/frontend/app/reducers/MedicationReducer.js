const initialState = {
  medicamentos: [],
};

const MedicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_MEDICATION":
      return {
        ...state,
        medicamentos: [...state.medicamentos, action.payload],
      };

    case "UPDATE_MEDICATION_FIELD": {
      console.log("Recebido para atualização:", action.payload);

      const updatedMedicamentos = state.medicamentos.map((med) => {
        if (Number(med.id) === Number(action.payload.id)) {
          console.log(
            "Atualizando medicamento:",
            med.id,
            "com",
            action.payload
          );
          return { ...med, ...action.payload };
        }
        return med;
      });

      console.log("Novo estado do Redux:", updatedMedicamentos);

      return {
        ...state,
        medicamentos: [...updatedMedicamentos],
      };
    }

    case "REMOVE_MEDICATION":
      return {
        ...state,
        medicamentos: state.medicamentos.filter(
          (med) => med.id !== action.payload
        ),
      };

    case "RESET_MEDICATION":
      return {
        ...state,
        medicamentos: state.medicamentos.map((item) => ({
          ...item,
          value: "",
        })),
      };

    default:
      return state;
  }
};

export default MedicationReducer;
