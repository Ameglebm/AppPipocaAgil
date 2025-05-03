const initialState = {
  glucoseRecords: [],
  glucoseTypes: [],
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
    case "ADD_WEIGHT_RECORD": {
      // Função para formatar hora no formato HH:MM:SS
      const formatTime = (date) => {
        let hours = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      // Função para formatar data no formato DD-MM-YYYY
      const formatDate = (date) => {
        let day = date.getDate().toString().padStart(2, "0");
        let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Meses começam do 0
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };

      const newRecord = {
        userId: action.payload.userId, // usar userId do payload
        peso: action.payload.peso, // usar peso do payload
        date: formatDate(new Date()),
        time: formatTime(new Date()),
        timestamp: action.payload.timestamp,
      };

      return {
        ...state,
        weightRecords: [...state.weightRecords, newRecord],
      };
    }

    case "SET_WEIGHT":
      return {
        ...state,
        weightRecords: action.payload,
      }
    default:
      return state;
  }
};

export default healthRecordsReducer;
