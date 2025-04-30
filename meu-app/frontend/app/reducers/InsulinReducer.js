const initialState = {
  insulinas: [],
};

const InsulinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PUSH_INSULIN":
      return {
        ...state,
        insulinas: [...state.insulinas, { ...action.payload }],
      };

    case "UPDATE_INSULIN_FIELD": {
      console.log("Recebido para atualização:", action.payload);

      const updatedInsulinas = state.insulinas.map((ins) => {
        if (Number(ins.id) === Number(action.payload.id)) {
          console.log("Atualizando insulina:", ins.id, "com", action.payload);
          return { 
            ...ins, dosagemQtd: action.payload.dosage,
          };
        }
        return ins;
      });

      console.log("Novo estado do Redux:", updatedInsulinas);

      return {
        ...state,
        insulinas: updatedInsulinas,
      };
    }

    case "REMOVE_INSULIN":
      return {
        ...state,
        insulinas: state.insulinas.filter((ins) => ins.id !== action.payload),
      };

    case "RESET_INSULIN":
      return {
        ...state,
        insulinas: state.insulinas.map((item) => ({
          ...item,
          value: "",
        })),
      };

    default:
      return state;
  }
};

export default InsulinReducer;
