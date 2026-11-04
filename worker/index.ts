// Cloudflare Worker: serves /api/posters; all other paths are static assets (SPA fallback).
interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  TMDB_API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: { waitUntil(p: Promise<unknown>): void }): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/posters") return env.ASSETS.fetch(request);

    const cache = (caches as any).default as Cache;
    const cached = await cache.match(request);
    if (cached) return cached;

    const r = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${env.TMDB_API_KEY}`
    );
    if (!r.ok) return Response.json({ error: "Failed to fetch posters" }, { status: 500 });
    const data: any = await r.json();
    const posters = (data.results ?? [])
      .filter((m: any) => m.poster_path)
      .map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);
    const res = Response.json({ posters }, { headers: { "Cache-Control": "public, max-age=86400" } });
    ctx.waitUntil(cache.put(request, res.clone()));
    return res;
  },
};
