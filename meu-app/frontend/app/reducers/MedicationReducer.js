const initialState = {
  formData: [
    {
      id: 1,
      label: "Nome do medicamento",
      value: "",
      placeholder: "Insira o nome",
    },
    {
      id: 2,
      label: "Para qual tratamento?",
      value: "",
      placeholder: "Selecione o tratamento",
    },
    {
      id: 3,
      label: "Dosagem por administração",
      value: "",
      placeholder: "Dose",
      keyboardType: "numeric",
    },
    {
      id: 4,
      value: "",
      placeholder: ["mL", "IU", "%", "mcg", "mg", "g"],
      isInputWithPressable: true,
    },
    {
      id: 5,
      label: "Quantidade de doses restantes",
      value: "",
      placeholder: "Dose",
      keyboardType: "numeric",
    },
  ],
};

const MedicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_MEDICATION":
      return {
        ...state,
        formData: action.payload || [],
      };

    case "UPDATE_MEDICATION_FIELD":
      return {
        ...state,
        formData: state.formData.map((med) =>
          med.id === action.payload.id
            ? { ...med, value: action.payload.value }
            : med
        ),
      };

    default:
      return state;
  }
};

export default MedicationReducer;
