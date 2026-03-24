export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { symbols } = req.query;
  if (!symbols) { res.status(400).json({ error: 'symbols required' }); return; }
  const syms = symbols.split(',');
  try {
    const results = await Promise.all(
      syms.map(s =>
        fetch(`https://financialmodelingprep.com/stable/quote?symbol=${s.trim()}&apikey=827kK29QJ79WDQGsBZVpuUmXRW5fxH1m`)
          .then(r => r.json())
      )
    );
    const flat = results.flat().filter(Boolean);
    res.json(flat);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
