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
    return jsonResponse({ hotels: database.hotels }, request);
  },
};
