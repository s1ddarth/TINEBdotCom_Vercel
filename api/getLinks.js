export default async function handler(req, res) {
  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.API_KEY;
  const range = "links!A:C";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Cache on Vercel edge for 3 hours (10800 seconds)
    res.setHeader("Cache-Control", "s-maxage=10800, stale-while-revalidate=60");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
