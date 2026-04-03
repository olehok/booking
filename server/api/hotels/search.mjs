import { getDb, jsonResponse, optionsResponse } from "../_utils.mjs";

export function OPTIONS(request) {
  return optionsResponse(request);
}

export function GET(request) {
  const url = new URL(request.url);
  const city = url.searchParams.get("city");
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "10");
  const sort = url.searchParams.get("sort") || "";
  const search = url.searchParams.get("search") || "";

  const database = getDb();
  let hotels = database.hotels;

  if (!city) {
    return jsonResponse({ data: [], total: 0 }, request);
  }
  if (city !== "all") {
    hotels = hotels.filter(hotel => hotel.city === city);
  }

  if (search) {
    const query = search.toLowerCase();
    hotels = hotels.filter(hotel => hotel.name.toLowerCase().includes(query));
  }

  if (sort === "desc") {
    hotels = hotels.sort((a, b) => b.hotel_rating - a.hotel_rating);
  }

  if (sort === "asc") {
    hotels = hotels.sort((a, b) => a.hotel_rating - b.hotel_rating);
  }

  const total = hotels.length;
  const start = (page - 1) * limit;
  const end = start + Number(limit);
  const paginatedHotels = hotels.slice(start, end);

  return jsonResponse({ data: paginatedHotels, total }, request);
}
