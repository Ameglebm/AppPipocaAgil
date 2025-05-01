const initialState = {
  glucoseRecords: [],
  glucoseTypes: [],
  bloodPressureRecords: [],
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
    
    case "SET_GLUCOSE":
      return {
        ...state,
        glucoseRecords: action.payload,
      };
    
    case "UPDATE_BLOOD_PRESSURE":
      return {
        ...state,
        bloodPressureRecords: [
          ...state.bloodPressureRecords,
          action.payload,
        ],
      };
      case "SET_BLOOD_PRESSURE":
        return {
          ...state,
          bloodPressureRecords: action.payload,
        };
    default:
      return state;
  }
};

export default healthRecordsReducer;
