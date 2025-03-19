const initialState = {
  glucoseRecords: [],
  bloodPressureRecords: [],
  weightRecords: [],
};

const healthRecordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_GLUCOSE":
      return {
        ...state,
        glucoseRecords: [...state.glucoseRecords, action.payload],
      };
    case "UPDATE_BLOOD_PRESSURE":
      return {
        ...state,
        bloodPressureRecords: [...state.bloodPressureRecords, action.payload],
      };
    case "UPDATE_WEIGHT":
      return {
        ...state,
        weightRecords: [...state.weightRecords, action.payload],
      };
    default:
      return state;
  }
};

export default healthRecordsReducer;
