import axios from "axios";

const API_KEY = "87fd279a";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchTitles(query) {
  const { data } = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, s: query },
  });

  if (data.Response === "False") {
    return { items: [], error: data.Error || "No titles found." };
  }

  return { items: data.Search ?? [], error: "" };
}

export async function getTitleDetails(imdbID) {
  const { data } = await axios.get(BASE_URL, {
    params: { apikey: API_KEY, i: imdbID, plot: "full" },
  });

  if (data.Response === "False") {
    throw new Error(data.Error || "Unable to load title details.");
  }

  return data;
}
