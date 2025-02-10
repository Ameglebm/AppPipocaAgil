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
  insulinArray: []
};

const InsulinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_INSULIN":
      return{
        ...state,
        insulinArray: [...state.insulinArray, {
          name: state.formData[0].value,
          decimalUnits: state.formData[1].value,
          halfUnits: state.formData[2].value,
          wholeUnits: state.formData[3].value

        }]
      };

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
