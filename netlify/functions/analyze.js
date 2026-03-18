<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>Bet Scanner</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --bg: #08090f;
  --surface: #0f1018;
  --surface2: #161720;
  --surface3: #1e1f2a;
  --border: #21222f;
  --border2: #2d2e3f;
  --text: #e0e2f0;
  --text2: #7a7d9c;
  --text3: #3f4158;
  --gold: #f5c542;
  --green: #3de090;
  --green-dim: #0c4a2a;
  --green-bg: #040f08;
  --red: #ff5c6c;
  --red-dim: #5c1520;
  --red-bg: #0f0208;
  --amber: #ffb347;
  --amber-dim: #5c3500;
  --amber-bg: #0d0600;
  --blue: #5b9cf6;
  --blue-dim: #1a3a6b;
  --blue-bg: #02080f;
  --purple: #a78bfa;
}

* { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 80px;
}

.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo-row { display: flex; align-items: center; gap: 8px; }
.logo { width: 28px; height: 28px; background: var(--gold); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 14px; }
.app-name { font-size: 15px; font-weight: 700; }
.app-sub { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; }
.live-pill {
  display: flex; align-items: center; gap: 4px;
  background: var(--green-bg); border: 1px solid var(--green-dim);
  color: var(--green); font-size: 10px; font-weight: 500;
  padding: 4px 8px; border-radius: 20px;
  font-family: 'DM Mono', monospace;
}
.live-dot { width: 5px; height: 5px; background: var(--green); border-radius: 50%; animation: blink 2s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

.bottom-nav {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 480px;
  background: var(--surface);
  border-top: 1px solid var(--border);
  display: flex;
  z-index: 100;
}
.nav-btn {
  flex: 1; padding: 10px 0 14px;
  display: flex; flex-direction: column;
  align-items: center; gap: 3px;
  background: none; border: none;
  color: var(--text3); cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  transition: color 0.15s;
}
.nav-btn.active { color: var(--gold); }
.nav-icon { font-size: 18px; line-height: 1; }
.nav-label { font-size: 10px; font-weight: 600; letter-spacing: 0.04em; }

.page { display: none; padding: 16px; }
.page.active { display: block; }

.status-bar {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 10px; padding: 10px 14px;
  display: flex; align-items: center; gap: 8px;
  font-size: 11px; font-family: 'DM Mono', monospace;
  margin-bottom: 14px;
}
.sdot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.sdot.loading { background: var(--amber); animation: blink 1s infinite; }
.sdot.ok { background: var(--green); }
.sdot.err { background: var(--red); }
.stext { color: var(--text2); flex: 1; font-size: 11px; }

.sport-tabs {
  display: flex; gap: 6px; overflow-x: auto;
  padding-bottom: 2px; margin-bottom: 14px;
  scrollbar-width: none;
}
.sport-tabs::-webkit-scrollbar { display: none; }
.sport-tab {
  flex-shrink: 0; padding: 6px 14px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; color: var(--text2);
  font-size: 12px; font-weight: 600;
  cursor: pointer; white-space: nowrap;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.15s;
}
.sport-tab.active { background: var(--gold); border-color: var(--gold); color: #000; }

.game-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; margin-bottom: 10px;
  overflow: hidden;
}
.game-card.flagged { border-color: var(--amber-dim); }
.flag-bar { height: 2px; background: linear-gradient(90deg, var(--amber), transparent); }
.card-main { padding: 14px; }

.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.team-row { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.card-meta { font-size: 11px; color: var(--text3); font-family: 'DM Mono', monospace; margin-top: 4px; }
.spread-big { font-size: 22px; font-weight: 700; font-family: 'DM Mono', monospace; color: var(--amber); text-align: right; }
.spread-label { font-size: 9px; color: var(--text3); font-family: 'DM Mono', monospace; text-align: right; text-transform: uppercase; }

.lines-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 6px; margin-bottom: 12px;
}
.book-cell {
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 8px; padding: 8px 6px; text-align: center;
}
.book-cell.best { border-color: var(--green-dim); background: var(--green-bg); }
.book-cell.no-data { opacity: 0.35; }
.book-label { font-size: 9px; color: var(--text3); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 5px; }
.book-cell.best .book-label { color: var(--green); }
.line-val { font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; color: var(--text); line-height: 1.3; }
.book-cell.best .line-val { color: var(--green); }
.juice-val { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; }
.total-val { font-size: 10px; color: var(--blue); font-family: 'DM Mono', monospace; margin-top: 3px; }
.ml-val { font-size: 10px; color: var(--purple); font-family: 'DM Mono', monospace; }

.analyze-btn {
  width: 100%; padding: 13px;
  background: var(--gold); border: none; border-radius: 10px;
  color: #000; font-size: 14px; font-weight: 700;
  cursor: pointer; font-family: 'DM Sans', sans-serif;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.15s;
}
.analyze-btn:hover { background: #ffd466; }
.analyze-btn:disabled { background: var(--surface3); color: var(--text3); cursor: not-allowed; }
.spinner {
  width: 15px; height: 15px;
  border: 2px solid rgba(0,0,0,0.2);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

.analysis-result {
  margin-top: 12px; border-radius: 12px;
  overflow: hidden; border: 1px solid var(--border2);
}
.rating-header {
  padding: 14px; display: flex; align-items: center; gap: 12px;
}
.rh-5, .rh-4 { background: linear-gradient(135deg, #040f08, #071a0e); border-bottom: 1px solid var(--green-dim); }
.rh-35 { background: linear-gradient(135deg, #0d0600, #160a00); border-bottom: 1px solid var(--amber-dim); }
.rh-3, .rh-2 { background: linear-gradient(135deg, #0f0208, #170310); border-bottom: 1px solid var(--red-dim); }

.rating-circle {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 700;
  font-family: 'DM Mono', monospace; flex-shrink: 0;
}
.rc-green { background: var(--green-bg); border: 2px solid var(--green); color: var(--green); }
.rc-amber { background: var(--amber-bg); border: 2px solid var(--amber); color: var(--amber); }
.rc-red { background: var(--red-bg); border: 2px solid var(--red); color: var(--red); }

.rec-text { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 2px; }
.sizing-text { font-size: 12px; font-family: 'DM Mono', monospace; }
.sizing-green { color: var(--green); }
.sizing-amber { color: var(--amber); }
.sizing-red { color: var(--red); }

.analysis-body { padding: 14px; background: var(--surface2); }
.summary-text { font-size: 13px; color: var(--text2); line-height: 1.65; margin-bottom: 12px; }

.factors-label { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.factor-tag {
  display: inline-block; font-size: 11px;
  padding: 3px 8px; border-radius: 6px; margin: 2px 3px 2px 0;
}
.f-for { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-dim); }
.f-against { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-dim); }

.warning-box {
  background: var(--amber-bg); border: 1px solid var(--amber-dim);
  border-radius: 8px; padding: 8px 12px;
  font-size: 12px; color: var(--amber);
  font-family: 'DM Mono', monospace; margin-top: 10px;
}
.checklist-row {
  display: flex; align-items: center; justify-content: space-between;
  font-size: 11px; color: var(--text3);
  font-family: 'DM Mono', monospace;
  margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border);
}
.best-book-tag {
  font-size: 10px; padding: 2px 8px; border-radius: 6px;
  background: var(--blue-bg); border: 1px solid var(--blue-dim);
  color: var(--blue); font-family: 'DM Mono', monospace;
}

.section-hd {
  font-size: 10px; color: var(--text3);
  font-family: 'DM Mono', monospace;
  text-transform: uppercase; letter-spacing: 0.12em;
  margin-bottom: 10px; margin-top: 4px;
  display: flex; align-items: center; gap: 8px;
}
.section-hd::after { content:''; flex:1; height:1px; background: var(--border); }

.refresh-btn {
  width: 100%; padding: 11px;
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: 10px; color: var(--text2);
  font-size: 13px; font-weight: 600;
  cursor: pointer; font-family: 'DM Sans', sans-serif;
  margin-bottom: 14px; transition: all 0.15s;
}
.refresh-btn:hover { background: var(--border); color: var(--text); }

/* BETS PAGE */
.bet-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 14px; margin-bottom: 8px;
}
.bet-matchup { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.bet-pick { font-size: 13px; color: var(--gold); font-family: 'DM Mono', monospace; font-weight: 600; margin-bottom: 4px; }
.bet-meta { font-size: 11px; color: var(--text3); font-family: 'DM Mono', monospace; }
.bet-stake { font-size: 16px; font-weight: 700; font-family: 'DM Mono', monospace; }
.status-pill { font-size: 10px; padding: 3px 8px; border-radius: 20px; font-family: 'DM Mono', monospace; font-weight: 600; }
.s-pending { background: var(--amber-bg); color: var(--amber); border: 1px solid var(--amber-dim); }
.s-won { background: var(--green-bg); color: var(--green); border: 1px solid var(--green-dim); }
.s-lost { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-dim); }

/* BANKROLL PAGE */
.br-card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 14px; padding: 16px; margin-bottom: 10px;
}
.br-big { font-size: 38px; font-weight: 700; font-family: 'DM Mono', monospace; color: var(--gold); margin-bottom: 4px; }
.br-label { font-size: 10px; color: var(--text3); font-family: 'DM Mono', monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.br-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px; }
.br-stat { background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
.br-stat-val { font-size: 20px; font-weight: 700; font-family: 'DM Mono', monospace; }
.br-stat-val.pos { color: var(--green); }
.br-stat-val.neg { color: var(--red); }
.progress-wrap { margin-top: 14px; }
.progress-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--text3); font-family: 'DM Mono', monospace; margin-bottom: 6px; }
.progress-track { height: 6px; background: var(--surface3); border-radius: 6px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--gold), #ffd466); border-radius: 6px; }

.milestone-row {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; padding: 8px 0;
  border-bottom: 1px solid var(--border);
}
.milestone-row:last-child { border-bottom: none; }

.empty { text-align: center; padding: 40px 20px; color: var(--text3); font-size: 14px; line-height: 2; }

@media (max-width: 360px) {
  .lines-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
</head>
<body>

<div class="header">
  <div class="logo-row">
    <div class="logo">🎯</div>
    <div>
      <div class="app-name">Bet Scanner</div>
      <div class="app-sub" id="hd-sub">Loading...</div>
    </div>
  </div>
  <div class="live-pill"><div class="live-dot"></div>Live odds</div>
</div>

<!-- GAMES PAGE -->
<div class="page active" id="page-games">
  <div style="height:14px"></div>
  <div class="status-bar">
    <div class="sdot loading" id="sd"></div>
    <div class="stext" id="st">Fetching live odds...</div>
  </div>
  <div class="sport-tabs" id="sport-tabs"></div>
  <button class="refresh-btn" onclick="loadAll()">↻ Refresh odds</button>
  <div class="section-hd" id="flagged-hd" style="display:none">⚡ Large spreads — investigate</div>
  <div id="flagged-wrap"></div>
  <div class="section-hd" id="all-hd">All games</div>
  <div id="games-wrap"><div class="empty">Loading games...</div></div>
</div>

<!-- BETS PAGE -->
<div class="page" id="page-bets">
  <div style="height:14px"></div>
  <div class="section-hd">Active bets</div>
  <div id="bets-wrap"></div>
</div>

<!-- BANKROLL PAGE -->
<div class="page" id="page-bankroll">
  <div style="height:14px"></div>
  <div class="br-card">
    <div class="br-label">Total Bankroll</div>
    <div class="br-big">$95.66</div>
    <div class="progress-wrap">
      <div class="progress-label"><span>Progress to $200</span><span>48%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:48%"></div></div>
    </div>
    <div class="br-grid">
      <div class="br-stat"><div class="br-label">FanDuel Balance</div><div class="br-stat-val">$39.66</div></div>
      <div class="br-stat"><div class="br-label">On Field</div><div class="br-stat-val">$56.00</div></div>
      <div class="br-stat"><div class="br-label">Started</div><div class="br-stat-val">$100.00</div></div>
      <div class="br-stat"><div class="br-label">Net P/L</div><div class="br-stat-val neg">-$4.34</div></div>
    </div>
  </div>

  <div class="section-hd">Milestones</div>
  <div class="br-card">
    <div class="milestone-row"><span style="color:var(--text2)">$200 — Withdraw $100</span><span style="color:var(--gold);font-family:'DM Mono',monospace;font-weight:700">← Next</span></div>
    <div class="milestone-row"><span style="color:var(--text3)">$300 — Increase bet sizing</span><span style="color:var(--text3);font-family:'DM Mono',monospace">$204 away</span></div>
    <div class="milestone-row"><span style="color:var(--text3)">$500 — Serious income</span><span style="color:var(--text3);font-family:'DM Mono',monospace">$404 away</span></div>
    <div class="milestone-row"><span style="color:var(--text3)">$1,000 — Pro level</span><span style="color:var(--text3);font-family:'DM Mono',monospace">$904 away</span></div>
  </div>

  <div class="section-hd">Record (Mar 10–18)</div>
  <div class="br-card">
    <div style="display:flex;justify-content:space-around;text-align:center">
      <div><div class="br-stat-val pos">8</div><div class="br-label">Wins</div></div>
      <div><div class="br-stat-val neg">9</div><div class="br-label">Losses</div></div>
      <div><div class="br-stat-val" style="color:var(--text2)">47%</div><div class="br-label">Win rate</div></div>
    </div>
  </div>
</div>

<!-- BOTTOM NAV -->
<div class="bottom-nav">
  <button class="nav-btn active" id="nav-games" onclick="showPage('games')">
    <span class="nav-icon">🏀</span><span class="nav-label">Games</span>
  </button>
  <button class="nav-btn" id="nav-bets" onclick="showPage('bets')">
    <span class="nav-icon">🎫</span><span class="nav-label">My Bets</span>
  </button>
  <button class="nav-btn" id="nav-bankroll" onclick="showPage('bankroll')">
    <span class="nav-icon">💰</span><span class="nav-label">Bankroll</span>
  </button>
</div>

<script>
var SPORT_KEYS = ['basketball_ncaab','basketball_nba','baseball_mlb','icehockey_nhl'];
var SPORT_LABELS = { basketball_ncaab:'NCAAB', basketball_nba:'NBA', baseball_mlb:'MLB', icehockey_nhl:'NHL' };
var BOOKS = ['fanduel','draftkings','betmgm','williamhill_us'];
var BOOK_LABELS = { fanduel:'FD', draftkings:'DK', betmgm:'MGM', williamhill_us:'CZS' };

var liveOdds = [];
var activeSport = 'all';
var analysisCache = {};

var activeBets = [
  { matchup:'Miami OH vs SMU', pick:'Miami OH +7.5', stake:'$15.00', time:'Tonight 8:15PM CT', status:'pending' },
  { matchup:'Miami OH vs SMU', pick:'Miami OH ML +235 (30% boost)', stake:'$15.00', time:'Tonight 8:15PM CT', status:'pending' },
  { matchup:'Wake + NM Parlay', pick:'Wake -11.5 & NM -11.5', stake:'$5.50', time:'Tonight (NIT)', status:'pending' },
  { matchup:'Wake/NM/Murray Parlay', pick:'Wake -11.5 & NM -11.5 & Murray St ML', stake:'$5.50', time:'Tonight (NIT)', status:'pending' },
  { matchup:'McNeese vs Vanderbilt', pick:'McNeese +11.5', stake:'$15.00', time:'Thu 3/19 2:15PM CT', status:'pending' }
];

function showPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  document.getElementById('page-' + p).classList.add('active');
  document.getElementById('nav-' + p).classList.add('active');
  if (p === 'bets') renderBets();
}

function setStatus(state, msg) {
  document.getElementById('sd').className = 'sdot ' + state;
  document.getElementById('st').textContent = msg;
}

function fetchSportOdds(sportKey) {
  return fetch('/api/odds?sport=' + sportKey)
    .then(r => r.json())
    .then(res => {
      var games = res.data || res;
      if (!Array.isArray(games)) return [];
      return games.map(game => {
        var bookData = {};
        BOOKS.forEach(bk => {
          var bm = game.bookmakers && game.bookmakers.find(b => b.key === bk);
          if (!bm) { bookData[bk] = null; return; }
          var spreadMkt = bm.markets && bm.markets.find(m => m.key === 'spreads');
          var totalMkt = bm.markets && bm.markets.find(m => m.key === 'totals');
          var mlMkt = bm.markets && bm.markets.find(m => m.key === 'h2h');
          var spread = null, total = null, ml = null;
          if (spreadMkt && spreadMkt.outcomes) {
            var away = spreadMkt.outcomes.find(o => o.name === game.away_team);
            var home = spreadMkt.outcomes.find(o => o.name === game.home_team);
            if (away && home) spread = { awayPoint: away.point, awayPrice: away.price, homePoint: home.point, homePrice: home.price };
          }
          if (totalMkt && totalMkt.outcomes) {
            var over = totalMkt.outcomes.find(o => o.name === 'Over');
            var under = totalMkt.outcomes.find(o => o.name === 'Under');
            if (over) total = { line: over.point, overPrice: over.price, underPrice: under ? under.price : null };
          }
          if (mlMkt && mlMkt.outcomes) {
            var awayML = mlMkt.outcomes.find(o => o.name === game.away_team);
            var homeML = mlMkt.outcomes.find(o => o.name === game.home_team);
            if (awayML && homeML) ml = { awayPrice: awayML.price, homePrice: homeML.price };
          }
          bookData[bk] = { spread, total, ml };
        });
        var fdSpread = bookData['fanduel'] && bookData['fanduel'].spread;
        var spreadVal = fdSpread ? Math.abs(fdSpread.awayPoint) : null;
        var commenceTime = new Date(game.commence_time);
        var timeStr = commenceTime.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', timeZone:'America/Chicago' }) + ' CT';
        return {
          id: game.id, sport: sportKey, sportLabel: SPORT_LABELS[sportKey] || sportKey,
          home: game.home_team, away: game.away_team,
          time: timeStr, commenceTime: game.commence_time,
          books: bookData, spreadVal: spreadVal, isLargeSpread: spreadVal >= 10
        };
      }).filter(g => Object.values(g.books).some(b => b !== null));
    });
}

function loadAll() {
  liveOdds = []; analysisCache = {};
  setStatus('loading', 'Fetching live odds...');
  document.getElementById('games-wrap').innerHTML = '<div class="empty">Loading games...</div>';
  document.getElementById('flagged-wrap').innerHTML = '';
  var loaded = 0;
  SPORT_KEYS.forEach(sport => {
    fetchSportOdds(sport)
      .then(games => { liveOdds = liveOdds.concat(games); loaded++; if (loaded === SPORT_KEYS.length) onLoaded(); })
      .catch(err => { loaded++; console.error(sport, err); if (loaded === SPORT_KEYS.length) onLoaded(); });
  });
}

function onLoaded() {
  liveOdds.sort((a,b) => {
    if (a.isLargeSpread && !b.isLargeSpread) return -1;
    if (!a.isLargeSpread && b.isLargeSpread) return 1;
    return new Date(a.commenceTime) - new Date(b.commenceTime);
  });
  var total = liveOdds.length;
  var flagged = liveOdds.filter(g => g.isLargeSpread).length;
  setStatus(total > 0 ? 'ok' : 'err', total > 0 ? total + ' games · ' + flagged + ' large spreads flagged' : 'No games found — try refreshing');
  document.getElementById('hd-sub').textContent = total + ' games live';
  buildSportTabs();
  renderGames();
}

function buildSportTabs() {
  var sports = ['all', ...new Set(liveOdds.map(g => g.sport))];
  document.getElementById('sport-tabs').innerHTML = sports.map(s => {
    var lbl = s === 'all' ? 'All' : (SPORT_LABELS[s] || s);
    var cnt = s === 'all' ? liveOdds.length : liveOdds.filter(g => g.sport === s).length;
    return `<button class="sport-tab ${activeSport===s?'active':''}" onclick="setSport('${s}')">${lbl} ${cnt}</button>`;
  }).join('');
}

function setSport(s) { activeSport = s; buildSportTabs(); renderGames(); }

function renderGames() {
  var games = activeSport === 'all' ? liveOdds : liveOdds.filter(g => g.sport === activeSport);
  var flagged = games.filter(g => g.isLargeSpread);
  var regular = games.filter(g => !g.isLargeSpread);
  var flaggedHd = document.getElementById('flagged-hd');
  if (flagged.length) {
    flaggedHd.style.display = 'flex';
    document.getElementById('flagged-wrap').innerHTML = flagged.map(makeGameCard).join('');
    document.getElementById('all-hd').textContent = 'All other games';
  } else {
    flaggedHd.style.display = 'none';
    document.getElementById('flagged-wrap').innerHTML = '';
    document.getElementById('all-hd').textContent = 'All games';
  }
  document.getElementById('games-wrap').innerHTML = !games.length
    ? '<div class="empty">No games found.<br>Try a different sport or refresh.</div>'
    : regular.length ? regular.map(makeGameCard).join('') : '<div class="empty" style="padding:16px">No other games</div>';
  Object.keys(analysisCache).forEach(id => {
    var el = document.getElementById('analysis-' + id);
    if (el) el.innerHTML = analysisCache[id];
  });
}

function makeGameCard(g) {
  var booksHtml = BOOKS.map(bk => {
    var b = g.books[bk];
    var label = BOOK_LABELS[bk];
    if (!b) return `<div class="book-cell no-data"><div class="book-label">${label}</div><div class="line-val">—</div></div>`;
    var isBest = bk === 'fanduel';
    var spreadStr = b.spread ? `<div class="line-val">${b.spread.awayPoint > 0?'+':''}${b.spread.awayPoint}</div><div class="juice-val">${b.spread.awayPrice > 0?'+':''}${b.spread.awayPrice}</div>` : '<div class="line-val">—</div>';
    var totalStr = b.total ? `<div class="total-val">O/U ${b.total.line}</div>` : '';
    var mlStr = b.ml ? `<div class="ml-val">${b.ml.awayPrice > 0?'+':''}${b.ml.awayPrice}</div>` : '';
    return `<div class="book-cell ${isBest?'best':''}"><div class="book-label">${label}</div>${spreadStr}${totalStr}${mlStr}</div>`;
  }).join('');

  return `<div class="game-card ${g.isLargeSpread?'flagged':''}" id="card-${g.id}">
    ${g.isLargeSpread ? '<div class="flag-bar"></div>' : ''}
    <div class="card-main">
      <div class="card-header">
        <div>
          <div class="team-row">${g.away}</div>
          <div class="team-row" style="color:var(--text2)">@ ${g.home}</div>
          <div class="card-meta">${g.sportLabel} · ${g.time}</div>
        </div>
        ${g.spreadVal ? `<div><div class="spread-big">${g.spreadVal}</div><div class="spread-label">pt spread</div></div>` : ''}
      </div>
      <div class="lines-grid">${booksHtml}</div>
      <button class="analyze-btn" id="btn-${g.id}" onclick="analyzeGame('${g.id}')">🤖 Analyze with Claude</button>
      <div id="analysis-${g.id}"></div>
    </div>
  </div>`;
}

function analyzeGame(gameId) {
  var game = liveOdds.find(g => g.id === gameId);
  if (!game) return;
  var btn = document.getElementById('btn-' + gameId);
  btn.disabled = true;
  btn.innerHTML = '<div class="spinner"></div> Analyzing...';

  var booksData = {};
  BOOKS.forEach(bk => {
    var b = game.books[bk];
    if (b) booksData[BOOK_LABELS[bk]] = {
      spread: b.spread ? (b.spread.awayPoint > 0?'+':'') + b.spread.awayPoint + ' (' + (b.spread.awayPrice > 0?'+':'') + b.spread.awayPrice + ')' : null,
      total: b.total ? 'O/U ' + b.total.line : null,
      ml: b.ml ? (b.ml.awayPrice > 0?'+':'') + b.ml.awayPrice : null
    };
  });
  var fd = game.books['fanduel'];
  var spreadStr = fd && fd.spread ? game.away + ' ' + (fd.spread.awayPoint > 0?'+':'') + fd.spread.awayPoint : 'N/A';
  var totalStr = fd && fd.total ? 'O/U ' + fd.total.line : 'N/A';
  var mlStr = fd && fd.ml ? game.away + ' ' + (fd.ml.awayPrice > 0?'+':'') + fd.ml.awayPrice : 'N/A';

  fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      matchup: game.away + ' @ ' + game.home,
      sport: game.sportLabel, time: game.time,
      spread: spreadStr, total: totalStr, moneyline: mlStr, books: booksData
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.error) throw new Error(data.error);
    var html = renderAnalysis(data);
    analysisCache[gameId] = html;
    document.getElementById('analysis-' + gameId).innerHTML = html;
    btn.disabled = false;
    btn.innerHTML = '↻ Re-analyze';
    btn.onclick = () => { delete analysisCache[gameId]; btn.innerHTML = '🤖 Analyze with Claude'; btn.onclick = () => analyzeGame(gameId); analyzeGame(gameId); };
    document.getElementById('analysis-' + gameId).scrollIntoView({ behavior:'smooth', block:'nearest' });
  })
  .catch(err => {
    btn.disabled = false;
    btn.innerHTML = '⚠ Error — tap to retry';
    btn.onclick = () => { btn.innerHTML = '🤖 Analyze with Claude'; btn.onclick = () => analyzeGame(gameId); };
  });
}

function renderAnalysis(d) {
  var r = parseFloat(d.rating);
  var rhClass = r >= 4 ? 'rh-4' : r >= 3.5 ? 'rh-35' : 'rh-3';
  var rcClass = r >= 4 ? 'rc-green' : r >= 3.5 ? 'rc-amber' : 'rc-red';
  var szClass = r >= 4 ? 'sizing-green' : r >= 3.5 ? 'sizing-amber' : 'sizing-red';
  var forsHtml = (d.factors_for||[]).map(f => `<span class="factor-tag f-for">+ ${f}</span>`).join('');
  var againstHtml = (d.factors_against||[]).map(f => `<span class="factor-tag f-against">− ${f}</span>`).join('');
  var warningHtml = d.warning ? `<div class="warning-box">⚠ ${d.warning}</div>` : '';
  var bestBookHtml = d.best_book ? `<span class="best-book-tag">Best line: ${d.best_book}</span>` : '';
  return `<div class="analysis-result">
    <div class="rating-header ${rhClass}">
      <div class="rating-circle ${rcClass}">${d.rating}</div>
      <div>
        <div class="rec-text">${d.recommendation||'See analysis'}</div>
        <div class="sizing-text ${szClass}">${d.sizing||''}</div>
      </div>
    </div>
    <div class="analysis-body">
      <div class="summary-text">${d.summary||''}</div>
      ${forsHtml||againstHtml ? `<div class="factors-label">Factors</div><div style="margin-bottom:8px">${forsHtml}${againstHtml}</div>` : ''}
      ${warningHtml}
      <div class="checklist-row"><span>Checklist hits: ${d.checklist_hits||0}/7</span>${bestBookHtml}</div>
    </div>
  </div>`;
}

function renderBets() {
  document.getElementById('bets-wrap').innerHTML = activeBets.length
    ? activeBets.map(b => `<div class="bet-card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="bet-matchup">${b.matchup}</div>
            <div class="bet-pick">${b.pick}</div>
            <div class="bet-meta">${b.time}</div>
          </div>
          <div style="text-align:right">
            <div class="bet-stake">${b.stake}</div>
            <span class="status-pill s-${b.status}">${b.status}</span>
          </div>
        </div>
      </div>`).join('')
    : '<div class="empty">No active bets.<br>Go find some edges 👀</div>';
}

loadAll();
</script>
</body>
</html>
