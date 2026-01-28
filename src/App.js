import React, { useState, useEffect } from 'react';

// ==================== CONFIGURATION ====================
const DISCORD_LINK = 'https://discord.gg/ton-serveur';
const TWITCH_LINK = 'https://twitch.tv/ton-stream';
const SITE_CODE = 'FASTBONUS';

// ==================== DONNÉES CASINOS ====================
const CASINOS = [
  {
    id: 'shuffle',
    name: 'SHUFFLE',
    logo: '🎲',
    website: 'SHUFFLE.COM',
    rewards: ['3 FREE CASES', '+5% DEPOSIT BONUS'],
    link: 'https://shuffle.com/?r=FASTBONUS',
    featured: true
  },
  {
    id: 'stake',
    name: 'STAKE',
    logo: '💎',
    website: 'STAKE.COM',
    rewards: ['VIP ACCESS', '+10% RAKEBACK'],
    link: 'https://stake.com/?c=FASTBONUS',
    featured: true
  },
  {
    id: 'roobet',
    name: 'ROOBET',
    logo: '🦘',
    website: 'ROOBET.COM',
    rewards: ['$50 FREE', 'APRÈS 2000$ WAGER'],
    link: 'https://roobet.com/?ref=FASTBONUS',
    featured: true
  },
  {
    id: 'csgoroll',
    name: 'CSGOROLL',
    logo: '🎯',
    website: 'CSGOROLL.COM',
    rewards: ['3 FREE CASES', '+5% DEPOSIT BONUS'],
    link: 'https://csgoroll.com/r/FASTBONUS',
    featured: false
  },
  {
    id: 'empiredrop',
    name: 'EMPIREDROP',
    logo: '👑',
    website: 'EMPIREDROP.COM',
    rewards: ['5% BONUS', 'ON EVERY DEPOSIT'],
    link: 'https://empiredrop.com/?r=FASTBONUS',
    featured: false
  },
  {
    id: 'hypedrop',
    name: 'HYPEDROP',
    logo: '🔥',
    website: 'HYPEDROP.COM',
    rewards: ['3 FREE BOXES', '+5% DEPOSIT BONUS'],
    link: 'https://hypedrop.com/r/FASTBONUS',
    featured: false
  }
];

// 3 Cartes principales pour la page d'accueil
const MAIN_OFFERS = [
  {
    id: 'bonus',
    icon: 'roobet',
    title: '50€ OFFERT',
    subtitle: 'APRÈS 2.000$ DE WAGER',
    features: [
      { text: 'Inscris-toi avec le code', highlight: SITE_CODE, isCode: true },
      { text: 'Wager', highlight: '2.000$', isLink: false },
      { text: 'Contacte-nous sur', highlight: 'Discord', isLink: true }
    ],
    btnText: 'Rejoindre Roobet',
    btnLink: 'https://roobet.com/?ref=FASTBONUS'
  },
  {
    id: 'leaderboard',
    icon: 'roobet',
    title: 'CLASSEMENT MENSUEL',
    subtitle: '15.000$ À GAGNER',
    features: [
      { text: 'Inscris-toi avec le code', highlight: SITE_CODE, isCode: true },
      { text: 'Mise sur', highlight: '2.000$', isLink: false },
      { text: 'Consulte le', highlight: 'classement en temps réel', isLink: true }
    ],
    btnText: 'Voir le classement',
    btnLink: '#race'
  },
  {
    id: 'codedrop',
    icon: 'roobet',
    title: 'CODE DROP & FREE SPINS',
    subtitle: 'OFFERTS RÉGULIÈREMENT',
    features: [
      { text: 'Inscris-toi avec le code', highlight: SITE_CODE, isCode: true },
      { text: 'Des centaines de', highlight: 'codes Roobet', isLink: true },
      { text: 'Des centaines de', highlight: 'free spins', isLink: true }
    ],
    btnText: 'Rejoindre le Discord',
    btnLink: DISCORD_LINK
  }
];

const LEADERBOARD = [
  { rank: 1, name: 'xQcOW', wagered: 2855075, prize: 2000 },
  { rank: 2, name: 'Trainwreck', wagered: 1759458, prize: 1000 },
  { rank: 3, name: 'Roshtein', wagered: 1233861, prize: 500 },
  { rank: 4, name: 'AyeZee', wagered: 921503, prize: 250 },
  { rank: 5, name: 'Yassuo', wagered: 718924, prize: 150 },
  { rank: 6, name: 'xposed', wagered: 587412, prize: 100 },
  { rank: 7, name: 'Foss', wagered: 445891, prize: 75 },
  { rank: 8, name: 'Cooks', wagered: 298734, prize: 50 },
  { rank: 9, name: 'DDK', wagered: 256482, prize: 40 },
  { rank: 10, name: 'JuicyJ', wagered: 184251, prize: 35 }
];

const BJ_TABLEAU = [
  { player: '5-8', dealer: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'] },
  { player: '9', dealer: ['D', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'] },
  { player: '10', dealer: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'] },
  { player: '11', dealer: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D'] },
  { player: '12', dealer: ['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'] },
  { player: '13-14', dealer: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'] },
  { player: '15', dealer: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'] },
  { player: '16', dealer: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'] },
  { player: '17+', dealer: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'] },
];

const BONUS_HUNTS = [
  { id: 1, name: 'MEGA HUNT #127', status: 'live', slots: 45, totalBuy: 12500, currentValue: 8750 },
  { id: 2, name: 'HUNT #126', status: 'completed', slots: 38, totalBuy: 9800, currentValue: 15420, date: '27/01' },
  { id: 3, name: 'HUNT #125', status: 'completed', slots: 52, totalBuy: 15000, currentValue: 22350, date: '26/01' },
];

// ==================== COULEURS ====================
const COLORS = {
  bg: '#0a0a0a',
  cardBg: '#111111',
  cardBorder: '#1a1a1a',
  gold: '#FFB800', // Or Roobet principal
  goldLight: '#FFDF00', // Or clair
  goldDark: '#FF8C00', // Or foncé/orange
  text: '#ffffff',
  textMuted: '#6b7280',
  textDark: '#4a4a4a'
};

// ==================== COMPOSANTS ====================

// Countdown Component
const Countdown = () => {
  const [time, setTime] = useState({ days: 15, hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) days = 30;
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
      {[
        { val: time.days, label: 'JOURS' },
        { val: time.hours, label: 'HEURES' },
        { val: time.minutes, label: 'MINUTES' },
        { val: time.seconds, label: 'SECONDES' }
      ].map((item, i) => (
        <div key={i} style={{
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          borderRadius: 8,
          padding: '1rem 1.5rem',
          textAlign: 'center',
          minWidth: 80
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: COLORS.text }}>
            {String(item.val).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '0.6rem', color: COLORS.textMuted, letterSpacing: '1px', marginTop: '0.25rem' }}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Offer Card (Style Wasted - pour la page d'accueil)
const MainOfferCard = ({ offer }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      style={{
        background: COLORS.cardBg,
        borderRadius: 12,
        border: `1px solid ${hover ? COLORS.gold + '40' : COLORS.cardBorder}`,
        padding: '2rem 1.5rem',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Featured Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        <span style={{ color: '#FFB800', fontSize: '0.7rem' }}>★</span>
        <span style={{ 
          color: COLORS.textMuted, 
          fontSize: '0.7rem', 
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>Featured</span>
        <span style={{ color: '#FFB800', fontSize: '0.7rem' }}>★</span>
      </div>
      
      {/* Icon - Roobet Kangourou */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: '#1a1a1a',
          border: '2px solid #FFB800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          boxShadow: '0 0 15px rgba(255, 184, 0, 0.3)'
        }}>
          <img 
            src="/roobet-icon.png" 
            alt="Roobet" 
            style={{ 
              height: '45px', 
              width: 'auto'
            }}
          />
        </div>
      </div>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.4rem',
          fontWeight: 800,
          background: 'linear-gradient(180deg, #FFDF00 0%, #FFB800 50%, #FF8C00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.25rem',
          letterSpacing: '1px'
        }}>{offer.title}</h3>
        <p style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: COLORS.text,
          letterSpacing: '1px'
        }}>{offer.subtitle}</p>
      </div>
      
      {/* Rewards Label */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <span style={{
          color: '#FFB800',
          fontSize: '0.65rem',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>- Rewards -</span>
      </div>
      
      {/* Features */}
      <div style={{ marginBottom: '1.5rem', flex: 1 }}>
        {offer.features.map((feature, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.6rem',
            color: COLORS.textMuted,
            fontSize: '0.85rem'
          }}>
            <span style={{ color: '#FFB800' }}>▪</span>
            <span>
              {feature.text}{' '}
              {feature.isCode ? (
                <span style={{
                  background: '#1f2937',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 4,
                  color: COLORS.text,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  fontFamily: 'monospace'
                }}>{feature.highlight}</span>
              ) : feature.isLink ? (
                <span style={{ color: '#FFB800', cursor: 'pointer' }}>{feature.highlight}</span>
              ) : (
                <span style={{ color: '#FFB800' }}>{feature.highlight}</span>
              )}
            </span>
          </div>
        ))}
      </div>
      
      {/* Button */}
      <button
        style={{
          width: '100%',
          padding: '0.9rem 1.5rem',
          background: 'linear-gradient(180deg, #FFDF00 0%, #FFB800 50%, #FF8C00 100%)',
          border: 'none',
          borderRadius: 8,
          color: '#000',
          fontSize: '0.95rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease',
          boxShadow: hover ? '0 5px 20px rgba(255, 184, 0, 0.5)' : 'none'
        }}
        onClick={() => {
          if (offer.btnLink.startsWith('#')) {
            // Navigation interne
          } else {
            window.open(offer.btnLink, '_blank');
          }
        }}
      >
        {offer.btnText} <span>›</span>
      </button>
      
      {/* Code */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${COLORS.cardBorder}`
      }}>
        <span style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>
          Use Code "<span style={{ color: COLORS.text, fontWeight: 600 }}>{SITE_CODE}</span>"
        </span>
      </div>
      
      {/* Disclaimer */}
      <p style={{
        fontSize: '0.55rem',
        color: COLORS.textDark,
        textAlign: 'center',
        marginTop: '0.75rem',
        lineHeight: 1.4
      }}>
        Use of the code will automatically enters you into FastBonus2.0's leaderboards when wagering on this code.
      </p>
    </div>
  );
};

// Casino Bonus Card (Style Wasted - pour page Nos Offres)
const BonusCard = ({ casino }) => {
  const [hover, setHover] = useState(false);
  
  return (
    <div
      style={{
        background: COLORS.cardBg,
        borderRadius: 12,
        border: `1px solid ${hover ? COLORS.gold + '40' : COLORS.cardBorder}`,
        padding: '1.5rem',
        transition: 'all 0.3s ease',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.5)' : 'none'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Featured Badge */}
      {casino.featured && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          <span style={{ color: COLORS.gold, fontSize: '0.75rem' }}>★</span>
          <span style={{ 
            color: COLORS.textMuted, 
            fontSize: '0.75rem', 
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>Featured</span>
          <span style={{ color: COLORS.gold, fontSize: '0.75rem' }}>★</span>
        </div>
      )}
      
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem',
          filter: 'drop-shadow(0 0 10px rgba(201, 169, 98, 0.3))'
        }}>
          {casino.logo}
        </div>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: COLORS.text,
          letterSpacing: '3px',
          marginBottom: '0.25rem'
        }}>{casino.name}</h3>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: COLORS.cardBorder,
          padding: '0.25rem 0.75rem',
          borderRadius: 20,
          fontSize: '0.65rem',
          color: COLORS.textMuted
        }}>
          <span>🔗</span>
          <span>{casino.website}</span>
        </div>
      </div>
      
      {/* Rewards Label */}
      <div style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
        <span style={{
          color: COLORS.gold,
          fontSize: '0.7rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>- Rewards -</span>
      </div>
      
      {/* Rewards */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        {casino.rewards.map((reward, i) => (
          <div key={i} style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: COLORS.text,
            marginBottom: '0.25rem'
          }}>{reward}</div>
        ))}
      </div>
      
      {/* Claim Button */}
      <button
        style={{
          width: '100%',
          padding: '0.75rem 1.5rem',
          background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
          border: 'none',
          borderRadius: 6,
          color: '#000',
          fontSize: '0.85rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s ease',
          boxShadow: hover ? `0 5px 20px ${COLORS.gold}40` : 'none'
        }}
        onClick={() => window.open(casino.link, '_blank')}
      >
        Claim Bonuses <span>›</span>
      </button>
      
      {/* Code */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${COLORS.cardBorder}`
      }}>
        <span style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>
          Use Code "<span style={{ color: COLORS.text, fontWeight: 600 }}>{SITE_CODE}</span>"
        </span>
      </div>
      
      {/* Disclaimer */}
      <p style={{
        fontSize: '0.6rem',
        color: COLORS.textDark,
        textAlign: 'center',
        marginTop: '0.75rem',
        lineHeight: 1.4
      }}>
        Use of the code will automatically enters you into FastBonus2.0's leaderboards when wagering on this code.
      </p>
    </div>
  );
};

// Section Title Component
const SectionTitle = ({ icon, title, subtitle }) => (
  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
    <h2 style={{
      fontSize: '2.5rem',
      fontWeight: 900,
      color: COLORS.text,
      letterSpacing: '4px',
      marginBottom: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem'
    }}>
      <span style={{ color: COLORS.gold }}>{icon}</span>
      {title}
    </h2>
    {subtitle && (
      <p style={{ color: COLORS.textMuted, fontSize: '0.9rem' }}>{subtitle}</p>
    )}
  </div>
);

// ==================== PAGES ====================

// Page Accueil
const AccueilPage = ({ setActiveTab }) => (
  <div>
    {/* Hero Section */}
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 300,
        color: COLORS.text,
        marginBottom: '1rem',
        lineHeight: 1.2
      }}>
        Les meilleures offres par{' '}
        <span style={{ 
          background: 'linear-gradient(180deg, #FFDF00 0%, #FFB800 50%, #FF8C00 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          filter: 'drop-shadow(0 0 10px rgba(255, 184, 0, 0.4))'
        }}>Roobet</span>
      </h1>
      <p style={{
        color: COLORS.textMuted,
        fontSize: '1rem',
        maxWidth: 700,
        margin: '0 auto 3rem',
        lineHeight: 1.6
      }}>
        Découvrez en détail l'offre qui vous est réservée et lancez-vous dans l'aventure du jeu avec des bonus exclusifs soigneusement conçus pour vous offrir une expérience encore plus enrichissante.
      </p>
    </div>

    {/* 3 Main Offer Cards - Style Wasted */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '4rem'
    }}>
      {MAIN_OFFERS.map(offer => (
        <MainOfferCard key={offer.id} offer={offer} />
      ))}
    </div>

    {/* Discord Banner */}
    <div style={{
      background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
      borderRadius: 16,
      padding: '2rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '4rem',
      flexWrap: 'wrap',
      gap: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <svg width="50" height="50" viewBox="0 0 127.14 96.36" fill="#fff">
          <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
        </svg>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>
            50€ à gagner tous les jours
          </div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
            sur notre serveur Discord
          </div>
        </div>
      </div>
      <button
        style={{
          padding: '1rem 2.5rem',
          background: '#fff',
          border: 'none',
          borderRadius: 50,
          color: '#5865F2',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'transform 0.2s ease'
        }}
        onClick={() => window.open(DISCORD_LINK, '_blank')}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        Rejoindre
      </button>
    </div>

    {/* RACE $15,000 Section - Attractive Design */}
    <div style={{
      background: 'linear-gradient(180deg, rgba(201, 169, 98, 0.1) 0%, rgba(201, 169, 98, 0.02) 100%)',
      border: `1px solid ${COLORS.gold}30`,
      borderRadius: 20,
      padding: '3rem 2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '400px',
        background: `radial-gradient(ellipse, ${COLORS.gold}15 0%, transparent 70%)`,
        pointerEvents: 'none'
      }} />
      
      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: `${COLORS.gold}20`,
        border: `1px solid ${COLORS.gold}40`,
        padding: '0.5rem 1.25rem',
        borderRadius: 50,
        marginBottom: '1.5rem'
      }}>
        <span style={{ fontSize: '1rem' }}>🔥</span>
        <span style={{ 
          color: COLORS.gold, 
          fontSize: '0.8rem', 
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>Race en cours</span>
      </div>
      
      {/* Main Title */}
      <div style={{ marginBottom: '1rem', position: 'relative' }}>
        <div style={{ fontSize: '1rem', color: COLORS.textMuted, marginBottom: '0.5rem', letterSpacing: '3px' }}>
          PRIZE POOL
        </div>
        <h2 style={{
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '2px',
          lineHeight: 1,
          filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))'
        }}>
          $15,000
        </h2>
        <div style={{ 
          fontSize: '1.2rem', 
          color: COLORS.text, 
          marginTop: '0.5rem',
          fontWeight: 600
        }}>
          à partager ce mois-ci ! 🎉
        </div>
      </div>
      
      {/* Subtitle */}
      <p style={{
        color: COLORS.textMuted,
        fontSize: '1rem',
        maxWidth: 500,
        margin: '0 auto 2rem',
        lineHeight: 1.6
      }}>
        Joue avec le code <span style={{
          background: '#1f2937',
          padding: '0.2rem 0.6rem',
          borderRadius: 4,
          color: COLORS.text,
          fontWeight: 600,
          fontFamily: 'monospace'
        }}>{SITE_CODE}</span> et grimpe dans le classement pour gagner ta part !
      </p>
      
      {/* Countdown */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: COLORS.textMuted, 
          marginBottom: '1rem',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          ⏰ Se termine dans
        </div>
        <Countdown />
      </div>
      
      {/* Mini Podium Preview */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { place: '🥇', prize: '$5,000', label: '1er' },
          { place: '🥈', prize: '$3,000', label: '2ème' },
          { place: '🥉', prize: '$1,500', label: '3ème' }
        ].map((item, i) => (
          <div key={i} style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 12,
            padding: '1rem 1.5rem',
            minWidth: 100
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{item.place}</div>
            <div style={{ 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              color: '#FFD700',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
            }}>{item.prize}</div>
            <div style={{ fontSize: '0.7rem', color: COLORS.textMuted }}>{item.label}</div>
          </div>
        ))}
      </div>
      
      {/* CTA Button */}
      <button 
        onClick={() => setActiveTab('race')}
        style={{
          padding: '1rem 3rem',
          background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.goldDark} 100%)`,
          border: 'none',
          borderRadius: 50,
          color: '#000',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          boxShadow: `0 10px 30px ${COLORS.gold}30`,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        🏆 Voir le classement complet
      </button>
      
      {/* Stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        marginTop: '2rem',
        flexWrap: 'wrap'
      }}>
        {[
          { value: '127', label: 'Participants' },
          { value: '$85K+', label: 'Total Wagered' },
          { value: '10', label: 'Gagnants' }
        ].map((stat, i) => (
          <div key={i}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLORS.text }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Page Race (Leaderboard) - ROOBET $15,000 Race
const RacePage = () => {
  // Leaderboard avec les bons prix
  const RACE_LEADERBOARD = [
    { rank: 1, name: 'xQcOW', wagered: 2855075, prize: 2500 },
    { rank: 2, name: 'Trainwreck', wagered: 1759458, prize: 1500 },
    { rank: 3, name: 'Roshtein', wagered: 1233861, prize: 1000 },
    { rank: 4, name: 'AyeZee', wagered: 921503, prize: 700 },
    { rank: 5, name: 'Yassuo', wagered: 718924, prize: 500 },
    { rank: 6, name: 'xposed', wagered: 587412, prize: 400 },
    { rank: 7, name: 'Foss', wagered: 445891, prize: 350 },
    { rank: 8, name: 'Cooks', wagered: 298734, prize: 250 },
    { rank: 9, name: 'DDK', wagered: 256482, prize: 175 },
    { rank: 10, name: 'JuicyJ', wagered: 184251, prize: 125 }
  ];
  
  return (
    <div>
      {/* Header avec logo Roobet */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img 
          src="/roobet-logo.png" 
          alt="Roobet" 
          style={{ 
            height: '120px', 
            width: 'auto', 
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 0 20px rgba(255, 149, 0, 0.5))'
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          fontWeight: 900,
          color: COLORS.text,
          marginBottom: '0.5rem'
        }}>
          RACE <span style={{ 
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))'
          }}>$15,000</span>
        </h1>
        
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(255, 215, 0, 0.15)',
          border: '1px solid rgba(255, 215, 0, 0.4)',
          padding: '0.5rem 1.25rem',
          borderRadius: 50,
          marginBottom: '1rem'
        }}>
          <span style={{ fontSize: '0.9rem' }}>💰</span>
          <span style={{ 
            color: '#FFD700', 
            fontSize: '0.9rem', 
            fontWeight: 600
          }}>2x $7,500 Bi-weekly</span>
        </div>
        
        <p style={{ color: COLORS.textMuted, fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>
          Joue sur Roobet avec le code <span style={{
            background: '#1f2937',
            padding: '0.2rem 0.6rem',
            borderRadius: 4,
            color: COLORS.text,
            fontWeight: 600,
            fontFamily: 'monospace'
          }}>{SITE_CODE}</span> et grimpe dans le classement !
        </p>
      </div>

      {/* Countdown */}
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ textAlign: 'center', color: COLORS.textMuted, marginBottom: '1rem', fontSize: '0.85rem', letterSpacing: '2px' }}>
          ⏰ PROCHAINE DISTRIBUTION DANS :
        </p>
        <Countdown />
      </div>

      {/* Prize Pool Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        maxWidth: 600,
        margin: '0 auto 3rem'
      }}>
        {[
          { label: 'Prize Pool Total', value: '$15,000', icon: '💰' },
          { label: 'Par période', value: '$7,500', icon: '🗓️' },
          { label: 'Top gagnants', value: '10', icon: '🏆' }
        ].map((item, i) => (
          <div key={i} style={{
            background: COLORS.cardBg,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: 12,
            padding: '1.25rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: 800, 
              color: '#FFD700',
              textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
            }}>{item.value}</div>
            <div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Podium Top 3 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        {[RACE_LEADERBOARD[1], RACE_LEADERBOARD[0], RACE_LEADERBOARD[2]].map((player, i) => {
          const heights = [180, 220, 160];
          const colors = ['#C0C0C0', '#FFD700', '#CD7F32'];
          const ranks = [2, 1, 3];
          const prizes = [1500, 2500, 1000];
          
          return (
            <div key={i} style={{
              background: COLORS.cardBg,
              borderRadius: 16,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${colors[i]}40`,
              minHeight: heights[i],
              width: i === 1 ? 180 : 150,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              boxShadow: i === 1 ? `0 10px 40px ${colors[i]}30` : 'none'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {i === 1 ? '👑' : i === 0 ? '🥈' : '🥉'}
              </div>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: 900, 
                color: colors[i],
                textShadow: `0 0 20px ${colors[i]}50`
              }}>#{ranks[i]}</div>
              <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: '0.25rem', fontSize: '1rem' }}>
                {player.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: COLORS.textMuted, marginBottom: '0.75rem' }}>
                ${player.wagered.toLocaleString()} wagered
              </div>
              <div style={{
                padding: '0.6rem 1rem',
                background: `linear-gradient(135deg, ${colors[i]} 0%, ${colors[i]}cc 100%)`,
                borderRadius: 25,
                fontWeight: 800,
                color: i === 1 ? '#000' : '#fff',
                fontSize: '1.1rem',
                boxShadow: `0 4px 15px ${colors[i]}50`
              }}>${prizes[i]}</div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div style={{
        background: COLORS.cardBg,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${COLORS.cardBorder}`,
        maxWidth: 900,
        margin: '0 auto'
      }}>
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '80px 1fr 1fr 120px',
          padding: '1.25rem 2rem',
          background: COLORS.cardBorder,
          fontWeight: 700,
          color: COLORS.textMuted,
          fontSize: '0.8rem',
          letterSpacing: '1px',
          textTransform: 'uppercase'
        }}>
          <div>Rang</div>
          <div>Joueur</div>
          <div>Wagered</div>
          <div>Gains</div>
        </div>
        
        {/* Table Rows */}
        {RACE_LEADERBOARD.map((player, i) => {
          const isTop3 = i < 3;
          const colors = ['#FFD700', '#C0C0C0', '#CD7F32'];
          
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr 1fr 120px',
              padding: '1rem 2rem',
              borderTop: `1px solid ${COLORS.cardBorder}`,
              alignItems: 'center',
              transition: 'background 0.2s ease',
              background: isTop3 ? `${colors[i]}08` : 'transparent'
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.cardBorder}
            onMouseLeave={e => e.currentTarget.style.background = isTop3 ? `${colors[i]}08` : 'transparent'}
            >
              <div style={{ 
                fontWeight: 700, 
                color: isTop3 ? colors[i] : COLORS.textMuted,
                fontSize: isTop3 ? '1.1rem' : '1rem'
              }}>
                {isTop3 ? ['🥇', '🥈', '🥉'][i] : `#${player.rank}`}
              </div>
              <div style={{ 
                color: COLORS.text, 
                fontSize: '0.95rem',
                fontWeight: isTop3 ? 600 : 400
              }}>{player.name}</div>
              <div style={{ 
                color: '#FFD700', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                textShadow: '0 0 8px rgba(255, 215, 0, 0.4)'
              }}>${player.wagered.toLocaleString()}</div>
              <div style={{ 
                color: '#4ade80', 
                fontWeight: 700, 
                fontSize: '1rem',
                background: 'rgba(74, 222, 128, 0.1)',
                padding: '0.4rem 0.75rem',
                borderRadius: 20,
                textAlign: 'center'
              }}>${player.prize}</div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button
          style={{
            padding: '1.25rem 3rem',
            background: 'linear-gradient(135deg, #ff9500 0%, #ff6b00 100%)',
            border: 'none',
            borderRadius: 50,
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 30px rgba(255, 149, 0, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onClick={() => window.open('https://roobet.com/?ref=FASTBONUS', '_blank')}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img src="/roobet-logo.png" alt="Roobet" style={{ height: '24px', width: 'auto' }} /> Rejoindre Roobet maintenant
        </button>
        <p style={{ color: COLORS.textMuted, fontSize: '0.85rem', marginTop: '1rem' }}>
          Utilise le code <strong style={{ color: COLORS.text }}>{SITE_CODE}</strong> pour participer
        </p>
      </div>
    </div>
  );
};

// Page Bonus
const BonusPage = () => (
  <div>
    <SectionTitle 
      icon="🎁" 
      title="BONUS EXCLUSIFS" 
      subtitle="Des offres négociées spécialement pour notre communauté" 
    />

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem'
    }}>
      {[
        { icon: '🎁', title: 'Welcome Bonus', desc: 'Jusqu\'à €1000 + 100 Free Spins', casino: 'Tous' },
        { icon: '💸', title: 'Cashback Weekly', desc: '10% de cashback chaque semaine', casino: 'Stake' },
        { icon: '🎰', title: 'Free Spins', desc: '50 Free Spins offerts chaque lundi', casino: 'Shuffle' },
        { icon: '👑', title: 'VIP Program', desc: 'Rakeback jusqu\'à 25%', casino: 'CSGORoll' },
        { icon: '🔄', title: 'Reload Bonus', desc: '50% sur les dépôts weekend', casino: 'Roobet' },
        { icon: '💎', title: 'High Roller', desc: 'Bonus spécial dépôts +€1000', casino: 'Tous' }
      ].map((bonus, i) => (
        <div key={i} style={{
          background: COLORS.cardBg,
          borderRadius: 12,
          padding: '1.5rem',
          border: `1px solid ${COLORS.cardBorder}`,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = COLORS.gold + '40';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = COLORS.cardBorder;
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{bonus.icon}</div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: COLORS.text }}>{bonus.title}</h3>
          <p style={{ color: COLORS.textMuted, marginBottom: '1rem', fontSize: '0.85rem' }}>{bonus.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              padding: '0.3rem 0.75rem',
              background: COLORS.cardBorder,
              borderRadius: 20,
              fontSize: '0.7rem',
              color: COLORS.textMuted
            }}>{bonus.casino}</span>
            <button style={{
              padding: '0.5rem 1rem',
              background: COLORS.gold,
              border: 'none',
              borderRadius: 6,
              color: '#000',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}>Claim</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Page Nos Offres - Style Fast-Bonus avec tableau
const OffresPage = () => {
  const OFFERS_LIST = [
    {
      id: 'cosmobet1',
      name: 'CosmoBet',
      logo: 'https://cosmobet.com/assets/logo.svg',
      logoColor: '#6366f1',
      bonus: '100%',
      bonusDetail: "jusqu'à 500$",
      freeSpins: '1000 FS',
      wager: 'x30',
      link: 'https://cosmobet.com/?ref=FASTBONUS'
    },
    {
      id: 'shuffle',
      name: 'Shuffle',
      logo: 'https://shuffle.com/logo.svg',
      logoColor: '#8b5cf6',
      bonus: '200%',
      bonusDetail: "jusqu'à 3.000$",
      freeSpins: '-',
      wager: 'x35',
      link: 'https://shuffle.com/?r=FASTBONUS'
    },
    {
      id: 'betbolt',
      name: 'Betbolt',
      logo: 'https://betbolt.com/logo.svg',
      logoColor: '#3b82f6',
      bonus: 'Race',
      bonusDetail: '3.000$',
      freeSpins: '-',
      wager: 'x35',
      link: 'https://betbolt.com/?ref=FASTBONUS'
    },
    {
      id: 'cosmobet2',
      name: 'CosmoBet',
      logo: 'https://cosmobet.com/assets/logo.svg',
      logoColor: '#6366f1',
      bonus: '100%',
      bonusDetail: "jusqu'à 500$",
      freeSpins: '1000 FS',
      wager: 'x30',
      link: 'https://cosmobet.com/?ref=FASTBONUS'
    },
    {
      id: 'razed',
      name: 'Razed',
      logo: 'https://razed.com/logo.svg',
      logoColor: '#10b981',
      bonus: '300%',
      bonusDetail: "jusqu'à 15.000$",
      freeSpins: '-',
      wager: 'x40',
      link: 'https://razed.com/?ref=FASTBONUS'
    }
  ];

  // Logo components pour chaque casino
  const CasinoLogo = ({ name, color }) => {
    const logos = {
      'CosmoBet': (
        <div style={{ 
          width: 45, 
          height: 45, 
          borderRadius: 10,
          background: `linear-gradient(135deg, ${color} 0%, ${color}99 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          fontWeight: 800,
          color: '#fff'
        }}>
          Cosmo
        </div>
      ),
      'Shuffle': (
        <div style={{ 
          width: 45, 
          height: 45, 
          borderRadius: 10,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
      ),
      'Betbolt': (
        <div style={{ 
          width: 45, 
          height: 45, 
          borderRadius: 10,
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.6rem',
          fontWeight: 800,
          color: '#fff'
        }}>
          BetB•It
        </div>
      ),
      'Razed': (
        <div style={{ 
          width: 45, 
          height: 45, 
          borderRadius: 10,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontWeight: 800,
          color: '#fff',
          fontStyle: 'italic'
        }}>
          RAZED
        </div>
      )
    };
    return logos[name] || <div style={{ width: 45, height: 45, background: color, borderRadius: 10 }} />;
  };

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 300,
          color: COLORS.text,
          marginBottom: '1rem'
        }}>
          Les meilleurs casinos en ligne en <span style={{ fontWeight: 700 }}>2026</span>
        </h1>
        <p style={{
          color: COLORS.textMuted,
          fontSize: '1rem',
          maxWidth: 800,
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          Dans le contexte effervescent des casinos en ligne en 2024, il est crucial de s'aligner avec les meilleurs pour assurer une expérience de jeu exceptionnelle. Nos partenaires ont été sélectionnés avec une attention minutieuse afin de vous offrir des avantages exclusifs et une diversité de jeux répondant à tous les goûts.
        </p>
      </div>

      {/* Offers Table */}
      <div style={{
        background: COLORS.cardBg,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${COLORS.cardBorder}`
      }}>
        {OFFERS_LIST.map((offer, i) => (
          <div 
            key={offer.id + i}
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 150px 120px 80px 180px',
              alignItems: 'center',
              padding: '1.25rem 2rem',
              borderBottom: i < OFFERS_LIST.length - 1 ? `1px solid ${COLORS.cardBorder}` : 'none',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.cardBorder + '50'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Casino Name & Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CasinoLogo name={offer.name} color={offer.logoColor} />
              <div>
                <div style={{ fontWeight: 700, color: COLORS.text, fontSize: '1.1rem' }}>{offer.name}</div>
                <div style={{ fontSize: '0.8rem', color: COLORS.textMuted }}>{offer.name}</div>
              </div>
            </div>

            {/* Bonus */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: COLORS.text, fontSize: '1.1rem' }}>{offer.bonus}</div>
              <div style={{ fontSize: '0.8rem', color: COLORS.textMuted }}>{offer.bonusDetail}</div>
            </div>

            {/* Free Spins */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontWeight: 700, 
                color: offer.freeSpins !== '-' ? COLORS.gold : COLORS.textMuted,
                fontSize: '1rem'
              }}>{offer.freeSpins}</div>
            </div>

            {/* Wager */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: COLORS.text, fontSize: '1rem' }}>{offer.wager}</div>
              <div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>wager</div>
            </div>

            {/* CTA Button */}
            <div style={{ textAlign: 'right' }}>
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  color: '#000',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => window.open(offer.link, '_blank')}
                onMouseEnter={e => {
                  e.currentTarget.style.background = COLORS.gold;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fff';
                }}
              >
                Récupérer mon bonus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Discord Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
        borderRadius: 16,
        padding: '2rem 3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '3rem',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <svg width="50" height="50" viewBox="0 0 127.14 96.36" fill="#fff">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
          </svg>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff' }}>
              50€ à gagner tous les jours
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem' }}>
              sur notre serveur Discord
            </div>
          </div>
        </div>
        <button
          style={{
            padding: '1rem 2.5rem',
            background: '#fff',
            border: 'none',
            borderRadius: 50,
            color: '#5865F2',
            fontSize: '1.1rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
          onClick={() => window.open(DISCORD_LINK, '_blank')}
        >
          Rejoindre
        </button>
      </div>
    </div>
  );
};

// Page Bonus Hunt
const BonusHuntPage = () => (
  <div>
    <SectionTitle 
      icon="🎰" 
      title="BONUS HUNT" 
      subtitle="Suivez nos sessions en direct" 
    />

    {/* Live Hunt */}
    <div style={{
      background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
      borderRadius: 12,
      padding: '2rem',
      marginBottom: '2rem',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: '#ef4444',
        padding: '0.4rem 1rem',
        borderRadius: 20,
        fontWeight: 700,
        fontSize: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{
          width: 8,
          height: 8,
          background: '#fff',
          borderRadius: '50%',
          animation: 'pulse 1s infinite'
        }}></span>
        LIVE
      </div>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        🎰 {BONUS_HUNTS[0].name}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {[
          { label: 'SLOTS', value: BONUS_HUNTS[0].slots },
          { label: 'TOTAL BUY', value: `€${BONUS_HUNTS[0].totalBuy.toLocaleString()}`, color: '#fca5a5' },
          { label: 'CURRENT', value: `€${BONUS_HUNTS[0].currentValue.toLocaleString()}`, color: '#86efac' },
          { label: 'MULTI', value: `${(BONUS_HUNTS[0].currentValue / BONUS_HUNTS[0].totalBuy).toFixed(2)}x`, color: '#fcd34d' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 8,
            padding: '0.75rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: stat.color || '#fff' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <button style={{
        padding: '0.75rem 1.5rem',
        background: '#fff',
        border: 'none',
        borderRadius: 6,
        color: '#991b1b',
        fontWeight: 700,
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}>
        📺 Watch on Twitch
      </button>
    </div>

    {/* History */}
    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem', color: COLORS.textMuted }}>
      Historique
    </h3>
    
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {BONUS_HUNTS.slice(1).map((hunt, i) => (
        <div key={i} style={{
          background: COLORS.cardBg,
          borderRadius: 8,
          padding: '1rem 1.25rem',
          border: `1px solid ${COLORS.cardBorder}`,
          display: 'grid',
          gridTemplateColumns: '1fr repeat(4, auto)',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '0.85rem'
        }}>
          <div>
            <div style={{ fontWeight: 600, color: COLORS.text }}>{hunt.name}</div>
            <div style={{ fontSize: '0.75rem', color: COLORS.textMuted }}>{hunt.date}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: COLORS.textMuted }}>SLOTS</div>
            <div style={{ fontWeight: 600, color: COLORS.text }}>{hunt.slots}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: COLORS.textMuted }}>BUY</div>
            <div style={{ fontWeight: 600, color: '#f87171' }}>€{hunt.totalBuy.toLocaleString()}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: COLORS.textMuted }}>RESULT</div>
            <div style={{ fontWeight: 600, color: hunt.currentValue > hunt.totalBuy ? '#4ade80' : '#f87171' }}>
              €{hunt.currentValue.toLocaleString()}
            </div>
          </div>
          <div style={{
            padding: '0.3rem 0.6rem',
            background: hunt.currentValue > hunt.totalBuy ? '#064e3b' : '#7f1d1d',
            borderRadius: 4,
            fontSize: '0.75rem',
            fontWeight: 600,
            color: hunt.currentValue > hunt.totalBuy ? '#4ade80' : '#fca5a5'
          }}>
            {((hunt.currentValue / hunt.totalBuy - 1) * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Page BJ Tableau
const BJTableauPage = () => (
  <div>
    <SectionTitle 
      icon="🃏" 
      title="BLACKJACK" 
      subtitle="Tableau de stratégie de base" 
    />

    {/* Legend */}
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      flexWrap: 'wrap'
    }}>
      {[
        { letter: 'H', label: 'Hit', color: '#3b82f6' },
        { letter: 'S', label: 'Stand', color: '#10b981' },
        { letter: 'D', label: 'Double', color: '#f59e0b' },
        { letter: 'P', label: 'Split', color: '#8b5cf6' }
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: item.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.8rem'
          }}>{item.letter}</div>
          <span style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>{item.label}</span>
        </div>
      ))}
    </div>

    {/* Table */}
    <div style={{
      overflowX: 'auto',
      background: COLORS.cardBg,
      borderRadius: 12,
      border: `1px solid ${COLORS.cardBorder}`
    }}>
      <table style={{ width: '100%', minWidth: 550, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '0.75rem', background: COLORS.cardBorder, textAlign: 'left', fontWeight: 600, color: COLORS.textMuted, fontSize: '0.8rem' }}>Main</th>
            {['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A'].map(card => (
              <th key={card} style={{ padding: '0.75rem', background: COLORS.cardBorder, textAlign: 'center', fontWeight: 600, color: COLORS.textMuted, fontSize: '0.8rem' }}>{card}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BJ_TABLEAU.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '0.5rem 0.75rem', borderTop: `1px solid ${COLORS.cardBorder}`, fontWeight: 600, color: COLORS.text, background: COLORS.cardBorder, fontSize: '0.85rem' }}>{row.player}</td>
              {row.dealer.map((action, j) => {
                const colors = { H: '#3b82f6', S: '#10b981', D: '#f59e0b', P: '#8b5cf6' };
                return (
                  <td key={j} style={{ padding: '0.4rem', borderTop: `1px solid ${COLORS.cardBorder}`, textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      width: 28,
                      height: 28,
                      borderRadius: 4,
                      background: colors[action],
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.75rem'
                    }}>{action}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ==================== APP ====================
export default function App() {
  const [activeTab, setActiveTab] = useState('accueil');
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fastbonus2User');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const tabs = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'race', label: 'Race' },
    { id: 'bonus', label: 'Bonus' },
    { id: 'bonushunt', label: 'Bonus hunt' },
    { id: 'bjtableau', label: 'Blackjack' }
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: COLORS.bg,
      color: COLORS.text,
      minHeight: '100vh'
    }}>
      {/* CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.cardBg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.gold}; border-radius: 3px; }
        button:hover { opacity: 0.9; }
      `}</style>

      {/* Login Modal */}
      {showLogin && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowLogin(false)}>
          <div style={{
            background: COLORS.cardBg, borderRadius: 16, padding: '2.5rem',
            width: '90%', maxWidth: 380, border: `1px solid ${COLORS.cardBorder}`
          }} onClick={e => e.stopPropagation()}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Connexion</h2>
            <button onClick={() => {
              setUser({ name: 'Player#1234' });
              localStorage.setItem('fastbonus2User', JSON.stringify({ name: 'Player#1234' }));
              setShowLogin(false);
            }} style={{
              width: '100%', padding: '0.9rem', background: '#5865F2',
              border: 'none', borderRadius: 8, color: '#fff',
              fontWeight: 600, cursor: 'pointer', marginBottom: '0.75rem', fontSize: '0.9rem'
            }}>
              🎮 Continuer avec Discord
            </button>
            <button onClick={() => {
              setUser({ name: 'User' });
              localStorage.setItem('fastbonus2User', JSON.stringify({ name: 'User' }));
              setShowLogin(false);
            }} style={{
              width: '100%', padding: '0.9rem', background: '#fff',
              border: 'none', borderRadius: 8, color: '#333',
              fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem'
            }}>
              🔵 Continuer avec Google
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: COLORS.bg, 
        borderBottom: `1px solid ${COLORS.cardBorder}`, 
        padding: '1rem 2rem'
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.text }}>Fast.</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: COLORS.gold }}>Bonus</span>
            <span style={{ fontSize: '0.7rem', color: COLORS.gold, marginLeft: '2px' }}>2.0</span>
          </div>

          {/* Nav */}
          <nav style={{
            display: 'flex',
            background: COLORS.cardBg,
            borderRadius: 8,
            padding: '0.25rem',
            border: `1px solid ${COLORS.cardBorder}`
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.6rem 1.25rem',
                  background: activeTab === tab.id ? COLORS.cardBorder : 'transparent',
                  border: 'none',
                  borderRadius: 6,
                  color: activeTab === tab.id ? COLORS.text : COLORS.textMuted,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: COLORS.textMuted }}>{user.name}</span>
              <button onClick={() => { setUser(null); localStorage.removeItem('fastbonus2User'); }} style={{
                padding: '0.5rem 1rem', background: COLORS.cardBg,
                border: `1px solid ${COLORS.cardBorder}`, borderRadius: 6,
                color: COLORS.textMuted, fontSize: '0.8rem', cursor: 'pointer'
              }}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{
              width: 40, height: 40, borderRadius: '50%',
              background: COLORS.cardBg, border: `1px solid ${COLORS.cardBorder}`,
              color: COLORS.textMuted, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.2rem'
            }}>
              👤
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {activeTab === 'accueil' && <AccueilPage setActiveTab={setActiveTab} />}
        {activeTab === 'race' && <RacePage />}
        {activeTab === 'bonus' && <BonusPage />}
        {activeTab === 'bonushunt' && <BonusHuntPage />}
        {activeTab === 'bjtableau' && <BJTableauPage />}
      </main>

      {/* Footer */}
      <footer style={{
        background: COLORS.bg, borderTop: `1px solid ${COLORS.cardBorder}`,
        padding: '3rem 2rem', marginTop: '4rem'
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: COLORS.text }}>Fast.</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: COLORS.gold }}>Bonus</span>
              <span style={{ fontSize: '0.6rem', color: COLORS.gold, marginLeft: '2px' }}>2.0</span>
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>
              Copyrights © 2024 – All Rights Reserved
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>Besoin d'aide ?</h4>
            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>Téléphone: 0808 8020 133</p>
            <p style={{ color: COLORS.textMuted, fontSize: '0.8rem' }}>Site: begambleaware.org</p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem' }}>FastBonus2.0</h4>
            <a href="#" style={{ color: COLORS.gold, fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem', textDecoration: 'none' }}>Mentions légales</a>
            <a href="#" style={{ color: COLORS.gold, fontSize: '0.8rem', display: 'block', textDecoration: 'none' }}>Politique de confidentialité</a>
          </div>
        </div>
        
        <div style={{
          maxWidth: 1200, margin: '2rem auto 0', paddingTop: '1.5rem',
          borderTop: `1px solid ${COLORS.cardBorder}`, textAlign: 'center'
        }}>
          <span style={{
            background: '#dc2626', padding: '0.2rem 0.5rem',
            borderRadius: 3, fontWeight: 700, fontSize: '0.7rem', marginRight: '0.5rem'
          }}>18+</span>
          <span style={{ color: COLORS.textMuted, fontSize: '0.75rem' }}>
            Jouez responsable. BeGambleAware.org
          </span>
        </div>
      </footer>
    </div>
  );
}