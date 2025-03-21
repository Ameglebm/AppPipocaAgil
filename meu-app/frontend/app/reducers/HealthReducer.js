const initialState = {
  glucoseRecords: [],
  glucoseTypes: [],
};

const healthRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_GLUCOSE":
      return {
        ...state,
        glucoseRecords: [...state.glucoseRecords, action.payload],
      };
    case "SET_GLUCOSE_TYPES": // Nova action para armazenar os tipos
      return {
        ...state,
        glucoseTypes: action.payload,
      };
    default:
      return state;
  }
};

export default healthRecordsReducer;
