// Actions
export const updateGlucose = (value) => ({
  type: "UPDATE_GLUCOSE",
  payload: { glucose: value, timestamp: new Date().toISOString() },
});

export const updateBloodPressure = (value) => ({
  type: "UPDATE_BLOOD_PRESSURE",
  payload: { bloodPressure: value, timestamp: new Date().toISOString() },
});

export const updateWeight = (value) => ({
  type: "UPDATE_WEIGHT",
  payload: { weight: value, timestamp: new Date().toISOString() },
});
