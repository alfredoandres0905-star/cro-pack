export default async (request) => {
  const SITE_PASSWORD = process.env.SITE_PASSWORD;

  if (!SITE_PASSWORD) {
    return new Response(
      JSON.stringify({ error: "SITE_PASSWORD no configurada" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await request.json();
    const ok   = body.password === SITE_PASSWORD;

    return new Response(JSON.stringify({ ok }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = { path: "/.netlify/functions/auth" };
