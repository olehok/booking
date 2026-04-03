import { getDb, jsonResponse, optionsResponse } from "./_utils.mjs";

export default {
  fetch(request) {
    if (request.method === "OPTIONS") {
      return optionsResponse(request);
    }
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method Not Allowed" }, request, 405);
    }

    const database = getDb();
    const destinations = database.destination.map(city => ({
      id: city.id,
      label: city.label,
    }));
    return jsonResponse(destinations, request);
  },
};
