const API_KEY = "c79fa6ef1f8d0221e4921d394cfde40e";

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "general";
    const lang = searchParams.get("lang") || "en";
    const max = searchParams.get("max") || "10";

    const res = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${lang}&max=${max}&apikey=${API_KEY}`
    );
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  },
};