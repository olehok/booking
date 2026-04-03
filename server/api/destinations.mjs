import { getDb, jsonResponse, optionsResponse } from "./_utils.mjs";

export function OPTIONS(request) {
  return optionsResponse(request);
}

export function GET(request) {
  const database = getDb();
  const destinations = database.destination.map(city => ({
    id: city.id,
    label: city.label,
  }));
  return jsonResponse(destinations, request);
}
