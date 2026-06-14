export default async (request) => {
  const NOTION_TOKEN    = process.env.NOTION_TOKEN;
  const NOTION_DATABASE = process.env.NOTION_DATABASE;

  if (!NOTION_TOKEN || !NOTION_DATABASE) {
    return new Response(
      JSON.stringify({ error: "Variables de entorno no configuradas en Netlify" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const notionRes = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE}/query`,
      {
        method: "POST",
        headers: {
          "Authorization":  `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type":   "application/json",
        },
        body: JSON.stringify({ page_size: 100 }),
      }
    );

    const data = await notionRes.json();

    return new Response(JSON.stringify(data), {
      status: notionRes.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = { path: "/.netlify/functions/notion" };
