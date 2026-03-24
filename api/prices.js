export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { symbols } = req.query;
  if (!symbols) { res.status(400).json({ error: 'symbols required' }); return; }
  const url = `https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=827kK29QJ79WDQGsBZVpuUmXRW5fxH1m`;
  try {
    const r = await fetch(url);
    const data = await r.json();
    if (data && data['Error Message']) {
      // Fallback to stable endpoint
      const url2 = `https://financialmodelingprep.com/stable/batch-request-end-of-day-prices?symbol=${symbols}&apikey=827kK29QJ79WDQGsBZVpuUmXRW5fxH1m`;
      const r2 = await fetch(url2);
      const data2 = await r2.json();
      res.json(data2);
    } else {
      res.json(data);
    }
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
