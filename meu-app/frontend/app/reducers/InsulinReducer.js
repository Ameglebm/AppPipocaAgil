const initialState = {
  formData: [
    {
      id: 1,
      label: "Nome da Insulina",
      value: "",
      placeholder: "Insira o nome",
    },
    {
      id: 2,
      label: "Décimos da unidade - Ex.: 0,1.0,2 UI",
      value: "",
      isRadioButton: true,
      key: "decimalUnits",
    },

    {
      id: 3,
      label: "Meias unidades - Ex.: 0,5.1,0.1,5 UI",
      value: "",
      isRadioButton: true,
      key: "halfUnits",
    },

    {
      id: 4,
      label: "Unidades Inteiras - Ex.: 1,2,3,4,5 UI",
      value: "",
      isRadioButton: true,
      key: "wholeUnits",
    },
  ],
};

const InsulinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_INSULIN":
      return {
        ...state,
        formData: action.payload || [],
      };

    case "UPDATE_INSULIN_FIELD":
      return {
        ...state,
        formData: state.formData.map((ins) =>
          ins.id === action.payload.id
            ? { ...ins, value: action.payload.value }
            : ins
        ),
      };

    case "REMOVE_INSULIN":
      return {
        ...state,
        formData: state.formData.filter((ins) => ins.id !== action.payload),
      };

    case "RESET_INSULIN":
      return {
        ...state,
        formData: state.formData.map((item) => ({
          ...item,
          value: "",
        })),
      };

    default:
      return state;
  }
};

export default InsulinReducer;
