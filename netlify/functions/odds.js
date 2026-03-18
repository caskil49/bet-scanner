exports.handler = async function(event) {
  const API_KEY = process.env.ODDS_API_KEY;
  const sport = event.queryStringParameters.sport || 'basketball_ncaab';

  const url = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${API_KEY}&regions=us&markets=spreads,totals,h2h&oddsFormat=american&bookmakers=fanduel`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const remaining = response.headers.get('x-requests-remaining') || '?';

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data, remaining })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
