export const pushMedication = (medication) => ({
  type: "PUSH_MEDICATION",
  payload: medication,
});

export const updateMedicationField = (id, value) => ({
  type: "UPDATE_MEDICATION_FIELD",
  payload: { id, value },
});
