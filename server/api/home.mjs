import { getDb, jsonResponse, optionsResponse } from "./_utils.mjs";

export function OPTIONS(request) {
  return optionsResponse(request);
}

export function GET(request) {
  const database = getDb();
  return jsonResponse({ hotels: database.hotels }, request);
}
