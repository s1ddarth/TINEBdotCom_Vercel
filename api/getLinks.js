// /api/getLinks.js
export default async function handler(req, res) {
  const sheetId = process.env.SHEET_ID;
  const apiKey = process.env.API_KEY;
  const range = "links!A:C";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
}
