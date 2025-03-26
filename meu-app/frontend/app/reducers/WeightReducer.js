const initialState = {
  weightRecords: [],
};

const weightReducer = (state = initialState, action) => {
  switch (action.type) {
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

      const { value } = action.payload;

      const newRecord = {
        value,
        // Data no formato DD-MM-YYYY
        date: formatDate(new Date()),
        // Hora formatada no formato HH:MM:SS
        time: formatTime(new Date()),
      };

      return {
        ...state,
        weightRecords: [...state.weightRecords, newRecord],
      };
    }

    default:
      return state;
  }
};

export default weightReducer;
