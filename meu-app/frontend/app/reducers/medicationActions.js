export const pushMedication = (medication) => ({
  type: "PUSH_MEDICATION",
  payload: medication,
});

export const updateMedicationField = (id, updatedData) => {
  console.log(
    "Disparando UPDATE_MEDICATION_FIELD com ID:",
    Number(id),
    "Dados:",
    updatedData
  );
  return {
    type: "UPDATE_MEDICATION_FIELD",
    payload: { id: Number(id), ...updatedData },
  };
};

export const removeMedication = (id) => ({
  type: "REMOVE_MEDICATION",
  payload: id,
});

export const resetMedication = () => ({
  type: "RESET_MEDICATION",
});
