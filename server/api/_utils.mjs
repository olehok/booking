import fs from "node:fs";

const dbPath = new URL("../db.json", import.meta.url);
let cachedDb = null;

function getDb() {
  if (!cachedDb) {
    const raw = fs.readFileSync(dbPath, "utf-8");
    cachedDb = JSON.parse(raw);
  }
  return cachedDb;
}

function getCorsOrigin(request) {
  const raw = process.env.CORS_ORIGIN || "*";
  if (raw === "*") {
    return "*";
  }
  if (raw.includes(",")) {
    const list = raw.split(",").map(value => value.trim()).filter(Boolean);
    const origin = request.headers.get("origin");
    if (!origin) {
      return null;
    }
    return list.includes(origin) ? origin : null;
  }
  return raw;
}

function corsHeaders(request) {
  const origin = getCorsOrigin(request);
  const headers = {
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (origin) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Vary"] = "Origin";
  }
  return headers;
}

function jsonResponse(data, request, status = 200) {
  const headers = corsHeaders(request);
  headers["Content-Type"] = "application/json";
  return new Response(JSON.stringify(data), { status, headers });
}

function optionsResponse(request) {
  const headers = corsHeaders(request);
  return new Response(null, { status: 204, headers });
}

export { getDb, jsonResponse, optionsResponse };
