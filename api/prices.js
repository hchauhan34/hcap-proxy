export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { symbols } = req.query;
  if (!symbols) { res.status(400).json({ error: 'symbols required' }); return; }
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=827kK29QJ79WDQGsBZVpuUmXRW5fxH1m`;
  const data = await fetch(url).then(r => r.json());
  res.json(data);
}
