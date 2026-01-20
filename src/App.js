import React, { useState, useEffect } from 'react';

const API_URL = 'https://casino-elite-backend-production.up.railway.app';

// ==================== DONNÉES ====================
const CASINOS = [
  { id: 'shuffle', name: 'Shuffle', logo: '🎲', bonus: '$500 + 100% Rakeback', detail: 'Code: ELITE', badges: ['hot', 'exclusive'], features: ['Rakeback', 'Races €100k', 'VIP', 'Crypto'], rating: 4.9 },
  { id: 'stake', name: 'Stake', logo: '💎', bonus: '200% → $3000', detail: '1er dépôt', badges: ['hot'], features: ['Originaux', 'Races Daily', 'Stream', 'VIP'], rating: 4.8 },
  { id: 'betbolt', name: 'Betbolt', logo: '⚡', bonus: '150% + 50 FS', detail: 'Sans wager', badges: ['new', 'exclusive'], features: ['No Wager', 'Instant', 'Cashback 15%'], rating: 4.7 },
  { id: 'cosmobet', name: 'Cosmobet', logo: '🌌', bonus: '100% → €1000', detail: '+200 FS', badges: ['exclusive'], features: ['Races Hebdo', '4000+ Jeux', 'Live Casino'], rating: 4.6 }
];

const MINI_GAMES = [
  { id: 'wheel', name: 'Roue Fortune', icon: '🎡', reward: 'x2-x10', desc: 'Multipliez vos coins!' },
  { id: 'dice', name: 'Dice Roll', icon: '🎲', reward: 'x2', desc: 'Under ou Over?' },
  { id: 'coinflip', name: 'Pile ou Face', icon: '🪙', reward: 'x2', desc: '50/50 pour doubler!' }
];

const REWARDS = [
  { id: 1, name: '$10 Shuffle', price: 5000, icon: '🎲' },
  { id: 2, name: '$10 Stake', price: 5000, icon: '💎' },
  { id: 3, name: '$10 Betbolt', price: 5000, icon: '⚡' },
  { id: 4, name: '$10 Cosmobet', price: 5000, icon: '🌌' },
  { id: 5, name: '500 XP Boost', price: 2000, icon: '⭐' },
  { id: 6, name: 'Badge VIP', price: 3000, icon: '👑' }
];

const LEVELS = ['Débutant', 'Novice', 'Amateur', 'Joueur', 'Régulier', 'Confirmé', 'Expert', 'Pro', 'Elite', 'Master', 'Legend', 'Champion', 'High Roller', 'VIP', 'Diamond'];
const XP_PER_LEVEL = 1000;

// ==================== STYLES ====================
const styles = {
  app: { fontFamily: "'Segoe UI', sans-serif", background: '#0a0a0f', color: '#fff', minHeight: '100vh' },
  header: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0.75rem 1.5rem', background: 'rgba(10,10,15,0.95)', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem', fontWeight: 800, background: 'linear-gradient(135deg, #ffd700, #ff8c00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
  nav: { display: 'flex', gap: '0.5rem' },
  navBtn: { padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer', borderRadius: 8, fontSize: '0.9rem' },
  navBtnActive: { background: 'linear-gradient(135deg, #ffd700, #ff8c00)', color: '#000' },
  loginBtn: { padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #ffd700, #ff8c00)', border: 'none', borderRadius: 8, color: '#000', fontWeight: 700, cursor: 'pointer' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '1rem' },
  currency: { padding: '0.4rem 0.8rem', background: '#1a1a25', borderRadius: 6, fontSize: '0.85rem' },
  main: { paddingTop: 80, maxWidth: 1200, margin: '0 auto', padding: '80px 1rem 2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' },
  card: { background: '#1a1a25', border: '1px solid #27272a', borderRadius: 16, padding: '1.25rem', transition: '0.3s' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  casinoLogo: { width: 50, height: 50, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
  badge: { padding: '0.2rem 0.5rem', borderRadius: 4, fontSize: '0.65rem', fontWeight: 700 },
  bonusBox: { background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 10, padding: '0.9rem', marginBottom: '1rem', textAlign: 'center' },
  btn: { width: '100%', padding: '0.8rem', background: 'linear-gradient(135deg, #ffd700, #ff8c00)', border: 'none', borderRadius: 8, color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' },
  gameCard: { background: '#1a1a25', border: '1px solid #27272a', borderRadius: 16, overflow: 'hidden' },
  gamePreview: { height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' },
  gameInfo: { padding: '1rem' },
  modal: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { background: '#1a1a25', borderRadius: 20, padding: '2rem', width: '90%', maxWidth: 400, position: 'relative' },
  closeBtn: { position: 'absolute', top: 10, right: 15, background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' },
  input: { width: '100%', padding: '0.75rem', background: '#12121a', border: '1px solid #27272a', borderRadius: 8, color: '#fff', marginBottom: '0.75rem' },
  notification: { position: 'fixed', top: 80, right: 20, padding: '1rem', background: '#1a1a25', border: '1px solid #27272a', borderRadius: 10, zIndex: 1001 }
};

// ==================== COMPOSANTS ====================
function Notification({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: '#10b981', error: '#ef4444', coins: '#ffd700', xp: '#8b5cf6' };
  return <div style={{ ...styles.notification, borderColor: colors[type] }}>{message}</div>;
}

function LoginModal({ onClose, onLogin }) {
  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🎰 Connexion</h2>
        {['google', 'discord', 'twitter'].map(provider => (
          <button key={provider} onClick={() => onLogin(provider)} style={{ ...styles.btn, marginBottom: '0.75rem', background: provider === 'google' ? '#4285f4' : provider === 'discord' ? '#5865F2' : '#000', color: '#fff' }}>
            {provider === 'google' ? '🔵 Google' : provider === 'discord' ? '🎮 Discord' : '🐦 Twitter'}
          </button>
        ))}
        <p style={{ textAlign: 'center', marginTop: '1rem', color: '#ffd700' }}>🎁 Bonus: 500 Coins + 100 XP</p>
      </div>
    </div>
  );
}

function GameModal({ game, user, onClose, onResult }) {
  const [bet, setBet] = useState(50);
  const [playing, setPlaying] = useState(false);
  const [result, setResult] = useState(null);

  const play = async () => {
    if (user.coins < bet || playing) return;
    setPlaying(true);
    setResult(null);
    
    // Simulation locale du jeu
    setTimeout(() => {
      let win = false;
      let multiplier = 0;
      
      if (game === 'wheel') {
        const mults = [0, 0.5, 1, 1.5, 2, 3, 5, 10];
        multiplier = mults[Math.floor(Math.random() * mults.length)];
        win = multiplier > 1;
      } else if (game === 'dice') {
        win = Math.random() > 0.5;
        multiplier = win ? 2 : 0;
      } else {
        win = Math.random() > 0.5;
        multiplier = win ? 2 : 0;
      }
      
      const winAmount = Math.floor(bet * multiplier);
      setResult({ win, multiplier, winAmount });
      onResult(win ? winAmount - bet : -bet, win ? 20 : 5);
      setPlaying(false);
    }, 1500);
  };

  return (
    <div style={styles.modal} onClick={onClose}>
      <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>×</button>
        <h2 style={{ textAlign: 'center' }}>{game === 'wheel' ? '🎡 Roue' : game === 'dice' ? '🎲 Dice' : '🪙 Coinflip'}</h2>
        <p style={{ textAlign: 'center', color: '#ffd700' }}>🪙 {user.coins} coins</p>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '1.5rem 0' }}>
          <button onClick={() => setBet(Math.max(10, bet - 10))} style={{ ...styles.btn, width: 40 }}>-</button>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{bet}</span>
          <button onClick={() => setBet(Math.min(user.coins, bet + 10))} style={{ ...styles.btn, width: 40 }}>+</button>
        </div>
        
        <button onClick={play} disabled={playing || user.coins < bet} style={{ ...styles.btn, opacity: playing ? 0.5 : 1 }}>
          {playing ? '⏳ En cours...' : '🎮 Jouer!'}
        </button>
        
        {result && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: result.win ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)', borderRadius: 10, textAlign: 'center' }}>
            {result.win ? `🎉 Gagné! x${result.multiplier} = +${result.winAmount} coins!` : '😢 Perdu!'}
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== APP PRINCIPAL ====================
export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('casinos');
  const [showLogin, setShowLogin] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('casinoUser');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (u) => { setUser(u); localStorage.setItem('casinoUser', JSON.stringify(u)); };
  
  const notify = (message, type = 'success') => setNotification({ message, type });

  const handleLogin = (provider) => {
    const newUser = {
      id: Date.now(),
      name: provider === 'google' ? 'Jean Dupont' : provider === 'discord' ? 'GamerPro#1234' : '@CasinoFan',
      provider,
      xp: 100,
      coins: 500,
      level: 1,
      games: 0
    };
    saveUser(newUser);
    setShowLogin(false);
    notify('🎉 Bienvenue! +500 Coins +100 XP', 'success');
  };

  const handleLogout = () => { setUser(null); localStorage.removeItem('casinoUser'); };

  const handleGameResult = (coinsChange, xpGain) => {
    if (!user) return;
    const newCoins = Math.max(0, user.coins + coinsChange);
    const newXp = user.xp + xpGain;
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;
    saveUser({ ...user, coins: newCoins, xp: newXp, level: newLevel, games: user.games + 1 });
    if (coinsChange > 0) notify(`🪙 +${coinsChange} Coins!`, 'coins');
    else notify(`😢 -${Math.abs(coinsChange)} Coins`, 'error');
  };

  const handleClaim = () => {
    if (!user) { setShowLogin(true); return; }
    saveUser({ ...user, xp: user.xp + 50, coins: user.coins + 25 });
    notify('🎁 +50 XP +25 Coins!', 'success');
  };

  return (
    <div style={styles.app}>
      {notification && <Notification {...notification} onClose={() => setNotification(null)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      {activeGame && <GameModal game={activeGame} user={user} onClose={() => setActiveGame(null)} onResult={handleGameResult} />}

      <header style={styles.header}>
        <div style={styles.logo}>🎰 CasinoElite</div>
        <nav style={styles.nav}>
          {['casinos', 'jeux', 'shop'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...styles.navBtn, ...(activeTab === tab ? styles.navBtnActive : {}) }}>
              {tab === 'casinos' ? '🎰 Casinos' : tab === 'jeux' ? '🎮 Jeux' : '🛒 Shop'}
            </button>
          ))}
        </nav>
        <div style={styles.userInfo}>
          {user ? (
            <>
              <span style={{ ...styles.currency, borderLeft: '3px solid #8b5cf6' }}>⭐ {user.xp} XP</span>
              <span style={{ ...styles.currency, borderLeft: '3px solid #ffd700' }}>🪙 {user.coins}</span>
              <span>👤 {user.name}</span>
              <button onClick={handleLogout} style={{ ...styles.loginBtn, background: '#333' }}>Déconnexion</button>
            </>
          ) : (
            <button onClick={() => setShowLogin(true)} style={styles.loginBtn}>🔐 Connexion</button>
          )}
        </div>
      </header>

      <main style={styles.main}>
        {activeTab === 'casinos' && (
          <>
            <h2 style={{ marginBottom: '1.5rem' }}>🎰 Nos Casinos Partenaires</h2>
            <div style={styles.grid}>
              {CASINOS.map(casino => (
                <div key={casino.id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <div style={{ ...styles.casinoLogo, background: `linear-gradient(135deg, ${casino.id === 'shuffle' ? '#8b5cf6, #06b6d4' : casino.id === 'stake' ? '#1e3a5f, #3b82f6' : casino.id === 'betbolt' ? '#f97316, #fbbf24' : '#ec4899, #8b5cf6'})` }}>{casino.logo}</div>
                    <div>{casino.badges.map(b => <span key={b} style={{ ...styles.badge, background: b === 'hot' ? '#ef4444' : b === 'new' ? '#8b5cf6' : '#ffd700', color: b === 'exclusive' ? '#000' : '#fff', marginLeft: 5 }}>{b}</span>)}</div>
                  </div>
                  <h3>{casino.name}</h3>
                  <p style={{ color: '#ffd700' }}>{'★'.repeat(5)} {casino.rating}</p>
                  <div style={styles.bonusBox}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{casino.bonus}</div>
                    <div style={{ color: '#a1a1aa', fontSize: '0.85rem' }}>{casino.detail}</div>
                  </div>
                  <button onClick={handleClaim} style={styles.btn}>Récupérer le Bonus</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'jeux' && (
          <>
            <h2 style={{ marginBottom: '1.5rem' }}>🎮 Mini-Jeux</h2>
            <div style={styles.grid}>
              {MINI_GAMES.map(game => (
                <div key={game.id} style={styles.gameCard}>
                  <div style={{ ...styles.gamePreview, background: `linear-gradient(135deg, ${game.id === 'wheel' ? '#8b5cf6, #ec4899' : game.id === 'dice' ? '#10b981, #06b6d4' : '#ffd700, #ff8c00'})` }}>{game.icon}</div>
                  <div style={styles.gameInfo}>
                    <h3>{game.name}</h3>
                    <p style={{ color: '#a1a1aa', marginBottom: '0.75rem' }}>{game.desc}</p>
                    <p style={{ color: '#ffd700', marginBottom: '0.75rem' }}>🪙 Récompense: {game.reward}</p>
                    <button onClick={() => user ? setActiveGame(game.id) : setShowLogin(true)} style={styles.btn}>🎮 Jouer</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'shop' && (
          <>
            <h2 style={{ marginBottom: '1.5rem' }}>🛒 Boutique</h2>
            <div style={styles.grid}>
              {REWARDS.map(reward => (
                <div key={reward.id} style={styles.card}>
                  <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{reward.icon}</div>
                  <h3 style={{ textAlign: 'center' }}>{reward.name}</h3>
                  <p style={{ textAlign: 'center', color: '#ffd700', fontSize: '1.2rem', margin: '0.75rem 0' }}>🪙 {reward.price}</p>
                  <button onClick={() => {
                    if (!user) { setShowLogin(true); return; }
                    if (user.coins >= reward.price) {
                      saveUser({ ...user, coins: user.coins - reward.price });
                      notify(`🎁 ${reward.name} acheté!`, 'success');
                    } else {
                      notify('❌ Pas assez de coins!', 'error');
                    }
                  }} style={{ ...styles.btn, opacity: user && user.coins >= reward.price ? 1 : 0.5 }}>Acheter</button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <footer style={{ background: '#12121a', padding: '1rem', textAlign: 'center', marginTop: '2rem' }}>
        <span style={{ background: '#ef4444', padding: '0.25rem 0.5rem', borderRadius: 4, fontWeight: 700, marginRight: 10 }}>18+</span>
        Jouez responsable © 2026 CasinoElite
      </footer>
    </div>
  );
}