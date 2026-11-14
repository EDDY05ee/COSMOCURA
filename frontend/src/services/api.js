const API_BASE_URL = "http://127.0.0.1:8000/api";

// ========================================
// COMMON API REQUEST HANDLER
// ========================================

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `API Error: ${response.status}`;

    try {
      const error = await response.json();
      message = error.detail || message;
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  return response.json();
}


// ========================================
// CREW API
// ========================================

export const getCrew = () =>
  apiRequest("/crew/");

export const createCrew = (crew) =>
  apiRequest("/crew/", {
    method: "POST",
    body: JSON.stringify(crew),
  });

export const getCrewMember = (crewId) =>
  apiRequest(`/crew/${crewId}`);


// ========================================
// MEASUREMENTS API
// ========================================

export const getMeasurements = (crewId) => {
  const query = crewId
    ? `?crew_id=${encodeURIComponent(crewId)}`
    : "";

  return apiRequest(`/measurements/${query}`);
};

export const createMeasurement = (measurement) =>
  apiRequest("/measurements/", {
    method: "POST",
    body: JSON.stringify(measurement),
  });


// ========================================
// MEDICAL RECORDS API
// ========================================

export const getMedicalRecords = (crewId) => {
  const query = crewId
    ? `?crew_id=${encodeURIComponent(crewId)}`
    : "";

  return apiRequest(`/medical-records/${query}`);
};

export const createMedicalRecord = (record) =>
  apiRequest("/medical-records/", {
    method: "POST",
    body: JSON.stringify(record),
  });

export const getMedicalRecord = (recordId) =>
  apiRequest(`/medical-records/${recordId}`);


// ========================================
// CREW WELLNESS API
// ========================================

export const getWellnessCheckins = (crewId) => {
  const query = crewId
    ? `?crew_id=${encodeURIComponent(crewId)}`
    : "";

  return apiRequest(`/wellness/${query}`);
};

export const createWellnessCheckin = (checkin) =>
  apiRequest("/wellness/", {
    method: "POST",
    body: JSON.stringify(checkin),
  });

export const getWellnessCheckin = (checkinId) =>
  apiRequest(`/wellness/${checkinId}`);


// ========================================
// SYSTEM HEALTH API
// ========================================

export const getSystemHealth = async () => {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error("COSMOCURA backend connection failed");
  }

  return response.json();
};