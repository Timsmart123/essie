import { useState, useEffect } from 'react'
import ecLogo from './imports/Essie_chops.png'

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP = 'https://wa.me/447700000000?text=Hello%20Essie%20Chops!%20I%27d%20like%20to%20place%20an%20order'
const PHONE = 'tel:+447700000000'

const IMGS = {
  hero:       'https://images.unsplash.com/photo-1762918988304-97d4a5840a4a?w=1600&h=900&fit=crop&auto=format',
  cake1:      'https://images.unsplash.com/photo-1617959587603-60cd216906c9?w=800&h=900&fit=crop&auto=format',
  cake2:      'https://images.unsplash.com/photo-1758739012177-be3412cf865a?w=800&h=900&fit=crop&auto=format',
  platter:    'https://images.unsplash.com/photo-1576842546422-60562b9242ae?w=800&h=600&fit=crop&auto=format',
  pastry:     'https://images.unsplash.com/photo-1545668855-b923f0176935?w=800&h=600&fit=crop&auto=format',
  catering:   'https://images.unsplash.com/photo-1651964060295-ef9e1ee08667?w=1200&h=700&fit=crop&auto=format',
  founder:    'https://images.unsplash.com/photo-1709837167686-a2e33aad1bf0?w=700&h=900&fit=crop&auto=format',
  chef2:      'https://images.unsplash.com/photo-1709837167684-47d7ccf0ed89?w=700&h=900&fit=crop&auto=format',
  puffpuff:   'https://images.unsplash.com/photo-1725517561537-defd6a13b174?w=800&h=600&fit=crop&auto=format',
  dumplings:  'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop&auto=format',
  bread:      'https://images.unsplash.com/photo-1608039783021-6116a558f0c5?w=800&h=600&fit=crop&auto=format',
  pie:        'https://images.unsplash.com/photo-1546024664-9226c2d3819b?w=800&h=600&fit=crop&auto=format',
  restaurant: 'https://images.unsplash.com/photo-1779265298717-e3b21e7973e7?w=1200&h=700&fit=crop&auto=format',
  desserts:   'https://images.unsplash.com/photo-1769812343628-81300c21753c?w=800&h=600&fit=crop&auto=format',
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function BtnPrimary({ children, href = WHATSAPP, onClick, className = '' }) {
  const cls = `inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98] ${className}`
  const style = { backgroundColor: '#C75D3A' }
  if (onClick) return <button onClick={onClick} className={cls} style={style}>{children}</button>
  return <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>{children}</a>
}

function BtnSecondary({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide border-2 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] ${className}`}
      style={{ borderColor: '#3A241B', color: '#3A241B' }}
    >
      {children}
    </button>
  )
}

function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <div className={center ? 'text-center max-w-2xl mx-auto' : 'max-w-xl'}>
      {label && (
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>{label}</p>
      )}
      <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#3A241B' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed" style={{ color: '#8B7A6F' }}>{subtitle}</p>
      )}
    </div>
  )
}

function Img({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      style={{ backgroundColor: '#EDE7D9' }}
      onError={(e) => { e.currentTarget.style.opacity = '0.3' }}
    />
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({ current, onNav }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'Celebrations', page: 'celebrations' },
    { label: 'About', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Contact', page: 'contact' },
  ]

  const go = (p) => { onNav(p); setMenuOpen(false); window.scrollTo(0, 0) }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: menuOpen ? '#F6F1E9' : scrolled ? 'rgba(246,241,233,0.97)' : 'transparent',
          backdropFilter: (!menuOpen && scrolled) ? 'blur(12px)' : 'none',
          boxShadow: (!menuOpen && scrolled) ? '0 1px 24px rgba(58,36,27,0.08)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <button onClick={() => go('home')} className="flex items-center gap-3 z-10">
            <img src={ecLogo} alt="Essie Chops" className="h-12 w-auto" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button
                key={l.page}
                onClick={() => go(l.page)}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: current === l.page ? '#C75D3A' : 'rgb(212, 168, 83)' }}
                // style={{ color: current === l.page ? '#C75D3A' : 'rgb(147 125 103)' }}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <BtnPrimary>
              <WhatsAppIcon /> Order on WhatsApp
            </BtnPrimary>
          </div>

          {/* Mobile hamburger — large tap target */}
          <button
            className="md:hidden relative z-10 w-12 h-12 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300 origin-center"
              style={{
                backgroundColor: '#3A241B',
                transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                backgroundColor: '#3A241B',
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? 'scaleX(0)' : 'none',
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300 origin-center"
              style={{
                backgroundColor: '#3A241B',
                transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu — slides down from nav bar */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300"
        style={{
          backgroundColor: '#F6F1E9',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Spacer for nav bar height */}
        <div className="h-20 flex-shrink-0" />
        <div className="flex flex-col items-center flex-1 gap-8 px-8 nav-spacer"> {/* changed gap-2 to gap-10, px-6 to px-8, removed justify-center,py-12 */}
          <img src={ecLogo} alt="Essie Chops" className="h-16 mb-8 nav-img" />
          {links.map(l => (
            <button
              key={l.page}
              onClick={() => go(l.page)}
              className="w-full text-center py-4 text-3xl font-semibold border-b transition-colors"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                color: current === l.page ? '#C75D3A' : '#3A241B',
                borderColor: '#EDE7D9',
              }}
            >
              {l.label}
            </button>
          ))}
          <div className="mt-8 w-full">
            <BtnPrimary className="w-full justify-center">
              <WhatsAppIcon /> Order on WhatsApp
            </BtnPrimary>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ onNav }) {
  const go = (p) => { onNav(p); window.scrollTo(0, 0) }

  return (
    <footer style={{ backgroundColor: '#3A241B', color: '#F6F1E9', paddingBottom: 'calc(env(safe-area-inset-bottom) + 64px)' }} className="md:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <img src={ecLogo} alt="Essie Chops" className="h-14 mb-7 " />
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#D4A853', opacity: 0.8 }}>
            Handcrafted Nigerian celebration food for life's most meaningful moments.
          </p>
          <div className="flex gap-4">
            {['Instagram', 'Facebook', 'TikTok'].map(s => (
              <a key={s} href="#" className="text-xs font-medium hover:opacity-70 transition-opacity" style={{ color: '#D4A853' }}>{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: '#D4A853' }}>Pages</h4>
          {['home', 'menu', 'celebrations', 'about', 'gallery', 'contact'].map(p => (
            <button key={p} onClick={() => go(p)} className="block text-sm mb-3 capitalize hover:opacity-70 transition-opacity text-left" style={{ color: '#F6F1E9' }}>
              {p}
            </button>
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: '#D4A853' }}>Services</h4>
          {['Celebration Cakes', 'Nigerian Pastries', 'Surprise Platters', 'Small Chops', 'Catering & Events', 'Birthday Packages'].map(s => (
            <p key={s} className="text-sm mb-3" style={{ color: '#F6F1E9', opacity: 0.75 }}>{s}</p>
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: '#D4A853' }}>Contact</h4>
          <div className="space-y-3 text-sm" style={{ color: '#F6F1E9', opacity: 0.8 }}>
            <p className="flex items-center gap-2"><MapPinIcon /> London, United Kingdom</p>
            <p className="flex items-center gap-2"><PhoneIcon /> +44 (0)7700 000000</p>
            <p className="flex items-center gap-2"><MailIcon /> hello@essiechops.co.uk</p>
            <p className="flex items-center gap-2"><ClockIcon /> Mon–Sat: 9am–7pm</p>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: '#25D366', color: '#fff' }}>
            <WhatsAppIcon /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="border-t px-6 py-5 text-center text-xs" style={{ borderColor: 'rgba(246,241,233,0.1)', color: 'rgba(246,241,233,0.4)' }}>
        © 2025 Essie Chops. All rights reserved. Pastries, Cakes & Party Platters.
      </div>
    </footer>
  )
}

// ─── Floating WhatsApp ─────────────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 md:bottom-8"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.524 5.849L.057 23.428a.5.5 0 00.614.614l5.58-1.467A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.021-1.384l-.36-.214-3.722.978.993-3.622-.234-.373A9.818 9.818 0 012.182 12C2.182 6.56 6.56 2.182 12 2.182S21.818 6.56 21.818 12 17.44 21.818 12 21.818z"/>
      </svg>
    </a>
  )
}

// Mobile sticky bar
function StickyMobileBar({ onContact }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex border-t"
      style={{ backgroundColor: '#F6F1E9', borderColor: '#EDE7D9', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={PHONE} className="flex-1 flex flex-col items-center py-3.5 text-xs font-medium gap-1.5" style={{ color: '#3A241B' }}>
        <PhoneIcon /> Call
      </a>
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center py-3.5 text-xs font-semibold gap-1.5 text-white"
        style={{ backgroundColor: '#C75D3A' }}>
        <WhatsAppIcon /> WhatsApp
      </a>
      <button onClick={onContact} className="flex-1 flex flex-col items-center py-3.5 text-xs font-medium gap-1.5" style={{ color: '#3A241B' }}>
        <MailIcon /> Enquire
      </button>
    </div>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.524 5.849L.057 23.428a.5.5 0 00.614.614l5.58-1.467A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.021-1.384l-.36-.214-3.722.978.993-3.622-.234-.373A9.818 9.818 0 012.182 12C2.182 6.56 6.56 2.182 12 2.182S21.818 6.56 21.818 12 17.44 21.818 12 21.818z"/>
    </svg>
  )
}

function PhoneIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>
}

function MailIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}

function StarIcon({ filled = true }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#D4A853' : 'none'} stroke="#D4A853" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}

function CheckIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
}

function LeafIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16Z" /><path d="M4 20c4-4 8-6 13-7" /></svg>
}

function BowlIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16" /><path d="M6 10a6 6 0 0 0 12 0" /><path d="M8 20h8" /><path d="M9 6c0-1 .8-1.4.8-2.2" /><path d="M14 6c0-1 .8-1.4.8-2.2" /></svg>
}

function SparkIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></svg>
}

function MapPinIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
}

function HandshakeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 12 3-3 2 2 3-3 4 4" /><path d="m2 12 4-4 5 5" /><path d="m7 13 3 3c1 1 2.4 1 3.4 0l4.6-4" /><path d="M3 17h4" /><path d="M17 17h4" /></svg>
}

function TrophyIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 4h8v5a4 4 0 0 1-8 0V4Z" /><path d="M8 7H4a4 4 0 0 0 4 4" /><path d="M16 7h4a4 4 0 0 1-4 4" /><path d="M12 13v5" /><path d="M9 21h6" /><path d="M10 18h4" /></svg>
}

function HeartIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /></svg>
}

function VanIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7z" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>
}

function ClockIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
}

function IconMark({ name, size = 'md' }) {
  const icons = {
    fresh: LeafIcon,
    recipe: BowlIcon,
    presentation: SparkIcon,
    uk: MapPinIcon,
    authenticity: HandshakeIcon,
    joy: SparkIcon,
    craft: TrophyIcon,
    community: HeartIcon,
    integrity: CheckIcon,
    excellence: StarIcon,
    email: MailIcon,
    location: MapPinIcon,
    delivery: VanIcon,
    hours: ClockIcon,
    success: CheckIcon,
  }
  const Icon = icons[name] || SparkIcon
  const className = size === 'lg'
    ? 'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'
    : size === 'sm'
      ? 'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0'
      : 'w-12 h-12 rounded-xl flex items-center justify-center mb-5'

  return (
    <span className={className} style={{ backgroundColor: 'rgba(212,168,83,0.15)', color: '#D4A853', border: '1px solid rgba(212,168,83,0.25)' }}>
      <Icon />
    </span>
  )
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ onNav }) {
  const [openFaq, setOpenFaq] = useState(null)

  const categories = [
    { title: 'Celebration Cakes', desc: 'Custom tiered cakes for birthdays, weddings, and every milestone worth marking.', img: IMGS.cake1, page: 'menu' },
    { title: 'Surprise Platters', desc: 'Beautifully curated birthday platters — the perfect gift that says everything.', img: IMGS.platter, page: 'celebrations' },
    { title: 'Nigerian Pastries', desc: 'Puff Puff, Meat Pies, Chin Chin — made fresh to authentic family recipes.', img: IMGS.pastry, page: 'menu' },
    { title: 'Catering & Events', desc: 'Full-service catering for corporate events, weddings, and family gatherings.', img: IMGS.catering, page: 'celebrations' },
  ]

  const trustCards = [
    { icon: 'fresh', title: 'Freshly Made to Order', desc: 'Every item is prepared fresh when your order is confirmed — never pre-packaged.' },
    { icon: 'recipe', title: 'Authentic Nigerian Recipes', desc: 'Traditional family recipes passed down with love and made with the finest ingredients.' },
    { icon: 'presentation', title: 'Beautiful Presentation', desc: 'Your celebration deserves to look as good as it tastes. Every order is styled to impress.' },
    { icon: 'uk', title: 'Reliable UK Service', desc: 'Based in London, serving across the UK with care, punctuality, and pride.' },
  ]

  const favourites = [
    { name: 'Puff Puff', desc: 'Light, airy fried dough balls dusted in cinnamon sugar. Addictive from the first bite.', price: '£18', img: IMGS.puffpuff },
    { name: 'Meat Pies', desc: 'Buttery shortcrust pastry filled with seasoned minced beef, potatoes, and carrots.', price: '£24', img: IMGS.pastry },
    { name: 'Celebration Cake', desc: 'Bespoke layered cakes in your chosen flavour, beautifully decorated to order.', price: '£85', img: IMGS.cake1 },
    { name: 'Small Chops Platter', desc: 'The ultimate party starter — a generous selection of our most-loved Nigerian snacks.', price: '£45', img: IMGS.dumplings },
  ]

  const testimonials = [
    { name: 'Adaeze O.', occasion: 'Birthday Party', review: 'Essie Chops made my 30th birthday unforgettable. The cake was a showstopper and the puff puff had my guests begging for the recipe!', stars: 5 },
    { name: 'Sarah M.', occasion: 'Corporate Event', review: "We used Essie Chops for our company's Diversity Day and the feedback was incredible. Professional, punctual, and absolutely delicious.", stars: 5 },
    { name: 'Tunde A.', occasion: 'Family Gathering', review: 'Nothing beats authentic Nigerian food at a family occasion. Essie delivered exactly that — the meat pies were divine.', stars: 5 },
  ]

  const faqs = [
    { q: 'How far in advance should I place my order?', a: 'We recommend placing orders at least 5–7 days in advance for cakes and large platters. For smaller pastry orders, 48–72 hours notice is usually sufficient.' },
    { q: 'Do you deliver across the UK?', a: 'We are based in London and currently deliver within Greater London. For orders outside London, please contact us to discuss arrangements.' },
    { q: 'Can I customise the flavour and design of my cake?', a: 'Absolutely. Every celebration cake is made to order. Share your vision via WhatsApp and we will create something truly special.' },
    { q: 'Do you cater for dietary requirements?', a: 'Yes. We can accommodate many dietary needs including gluten-free and nut-free options. Please mention your requirements when placing your enquiry.' },
    { q: 'How do I place an order?', a: "Simply send us a WhatsApp message or fill in the contact form. We'll discuss your needs, send a quote, and confirm your booking upon receipt of a deposit." },
  ]

  const galleryImgs = [IMGS.cake1, IMGS.platter, IMGS.pastry, IMGS.puffpuff, IMGS.cake2, IMGS.desserts]

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Img src={IMGS.hero} alt="Elegant celebration cake" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(58,36,27,0.85) 0%, rgba(58,36,27,0.5) 60%, rgba(58,36,27,0.2) 100%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              {['Freshly Made', 'Custom Orders', 'UK-Based'].map(t => (
                <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(212,168,83,0.6)', color: '#D4A853' }}>{t}</span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              Celebrations<br />
              <em className="font-normal" style={{ color: '#D4A853' }}>Taste Better</em><br />
              with Essie Chops
            </h1>
            <p className="text-base md:text-lg text-white/80 mb-10 leading-relaxed max-w-md">
              Handcrafted Nigerian pastries, celebration cakes, and authentic comfort food — made fresh for your most meaningful moments.
            </p>
            <div className="flex flex-wrap gap-4">
              <BtnPrimary>
                <WhatsAppIcon /> Order on WhatsApp
              </BtnPrimary>
              <button
                onClick={() => { onNav('menu'); window.scrollTo(0, 0) }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white border-2 border-white/40 hover:border-white transition-all duration-200 hover:scale-[1.03]"
              >
                Explore Menu →
              </button>
            </div>
          </div>
        </div>

        <a href="#categories" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce text-xs flex flex-col items-center gap-1">
          <span>Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
        </a>
      </section>

      {/* Featured Categories */}
      <section id="categories" className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="What We Do" title="Made for Every Celebration" subtitle="From intimate birthdays to grand corporate events — we bring Nigerian hospitality to your table." center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {categories.map(c => (
              <div
                key={c.title}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => { onNav(c.page); window.scrollTo(0, 0) }}
                style={{ boxShadow: '0 4px 24px rgba(58,36,27,0.08)' }}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <Img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(58,36,27,0.9) 0%, rgba(58,36,27,0.1) 60%, transparent 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{c.title}</h3>
                  <p className="text-xs text-white/70 mb-4 leading-relaxed">{c.desc}</p>
                  <span className="text-xs font-semibold tracking-wider" style={{ color: '#D4A853' }}>Learn More →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6" style={{ backgroundColor: '#3A241B' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>Why Essie Chops</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              The Business You Can Trust<br />
              <em className="font-normal" style={{ color: '#D4A853' }}>with Your Celebration</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCards.map(c => (
              <div key={c.title} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(246,241,233,0.06)', border: '1px solid rgba(212,168,83,0.2)' }}>
                <IconMark name={c.icon} />
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,233,0.6)' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Favourites */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
            <SectionHeader label="Bestsellers" title={"Signature\nFavourites"} subtitle="The dishes that keep our customers coming back." />
            <button onClick={() => { onNav('menu'); window.scrollTo(0, 0) }} className="text-sm font-medium hover:opacity-70 transition-opacity flex items-center gap-1" style={{ color: '#C75D3A' }}>
              View full menu →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favourites.map(f => (
              <div key={f.name} className="group bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(58,36,27,0.07)' }}>
                <div className="aspect-square overflow-hidden">
                  <Img src={f.img} alt={f.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>{f.name}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: '#8B7A6F' }}>{f.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: '#3A241B' }}>From {f.price}</span>
                    <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
                      style={{ backgroundColor: '#FEF0EA', color: '#C75D3A' }}>
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-6" style={{ backgroundColor: '#EDE7D9' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <Img src={IMGS.founder} alt="Essie Chops founder" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-xl overflow-hidden border-4 border-white hidden md:block" style={{ boxShadow: '0 4px 20px rgba(58,36,27,0.15)' }}>
              <Img src={IMGS.cake2} alt="Celebration" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#D4A853' }}>Our Story</p>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
              Born from a<br />
              <em className="font-normal">Love of Celebration</em>
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#5C3D2E' }}>
              Essie Chops was born from a simple belief: that food is the heart of every celebration. Rooted in the rich culinary traditions of Nigeria, we bring authentic flavours and handcrafted quality to tables across the UK.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#8B7A6F' }}>
              Every Puff Puff, every cake, every platter is made with the same care and love as if it were for our own family. Because to us, your celebration matters.
            </p>
            <BtnSecondary onClick={() => { onNav('about'); window.scrollTo(0, 0) }}>
              Read Our Story →
            </BtnSecondary>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <SectionHeader label="Gallery" title="A Taste of What We Create" />
            <button onClick={() => { onNav('gallery'); window.scrollTo(0, 0) }} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: '#C75D3A' }}>
              View full gallery →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImgs.map((img, i) => (
              <div key={i} className={`group overflow-hidden rounded-xl ${i === 0 ? 'md:row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '3/4' : '1/1' }}>
                <Img src={img} alt={`Gallery image ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6" style={{ backgroundColor: '#3A241B' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="What Customers Say" title="Celebrations Remembered" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {testimonials.map(t => (
              <div key={t.name} className="p-8 rounded-2xl" style={{ backgroundColor: 'rgba(246,241,233,0.07)', border: '1px solid rgba(212,168,83,0.15)' }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-base leading-relaxed mb-6 italic" style={{ color: 'rgba(246,241,233,0.85)', fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
                  "{t.review}"
                </p>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs mt-1" style={{ color: '#D4A853' }}>{t.occasion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-3xl mx-auto">
          <SectionHeader label="FAQ" title="Frequently Asked Questions" center />
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl overflow-hidden border" style={{ borderColor: '#EDE7D9', backgroundColor: '#fff' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-medium text-sm"
                  style={{ color: '#3A241B' }}
                >
                  <span>{f.q}</span>
                  <span className="flex-shrink-0 text-lg transition-transform duration-200" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none', color: '#C75D3A' }}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#8B7A6F' }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'linear-gradient(135deg, #C75D3A 0%, #A8461F 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-white/70">Ready to Order?</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Let's Make Your Celebration<br />
            <em className="font-normal">Truly Unforgettable</em>
          </h2>
          <p className="text-white/80 mb-10 leading-relaxed">
            Message us on WhatsApp to discuss your order. We'll respond quickly and guide you through every step.
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 hover:shadow-xl"
            style={{ backgroundColor: '#fff', color: '#C75D3A' }}>
            <WhatsAppIcon /> Start My Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}

// ─── MENU PAGE ────────────────────────────────────────────────────────────────

function MenuPage() {
  const [active, setActive] = useState('All')

  const items = [
    { name: 'Puff Puff', desc: 'Light, golden fried dough balls with a hint of nutmeg. A Nigerian classic.', price: '£18', img: IMGS.puffpuff, cat: 'Pastries' },
    { name: 'Meat Pies', desc: 'Buttery shortcrust pastry filled with spiced minced beef and vegetables.', price: '£24', img: IMGS.pastry, cat: 'Pastries' },
    { name: 'Chin Chin', desc: 'Crunchy fried pastry snacks, lightly sweetened. Great for parties.', price: '£15', img: IMGS.bread, cat: 'Pastries' },
    { name: 'Small Chops Platter', desc: 'A generous selection of puff puff, samosas, spring rolls, and more.', price: '£45', img: IMGS.dumplings, cat: 'Small Chops' },
    { name: 'Party Samosas', desc: 'Crispy pastry triangles filled with spiced mince or vegetables.', price: '£22', img: IMGS.pastry, cat: 'Small Chops' },
    { name: 'Spring Rolls', desc: 'Crispy golden rolls stuffed with seasoned vegetables and noodles.', price: '£20', img: IMGS.dumplings, cat: 'Small Chops' },
    { name: 'Celebration Cake', desc: 'Bespoke tiered cakes in your chosen flavour and design. Made fresh to order.', price: '£85', img: IMGS.cake1, cat: 'Cakes' },
    { name: 'Birthday Cake', desc: 'Single-tier birthday cakes beautifully decorated to your specification.', price: '£55', img: IMGS.cake2, cat: 'Cakes' },
    { name: 'Cupcake Tower', desc: 'Elegant towers of 12–48 individually decorated cupcakes for events.', price: '£65', img: IMGS.desserts, cat: 'Cakes' },
    { name: 'Birthday Surprise Platter', desc: 'The ultimate birthday gift — a lavish platter styled with treats and florals.', price: '£75', img: IMGS.platter, cat: 'Platters' },
    { name: 'Grazing Board', desc: 'Artisan grazing boards loaded with savouries, fruits, and pastries.', price: '£60', img: IMGS.platter, cat: 'Platters' },
    { name: 'Jollof Rice Pot', desc: 'Authentic party jollof rice, smoky and perfectly spiced. Serves 10–15.', price: '£70', img: IMGS.catering, cat: 'Comfort Food' },
    { name: 'Egusi Soup', desc: 'Rich, nutty egusi soup with assorted meats. A true celebration dish.', price: '£55', img: IMGS.catering, cat: 'Comfort Food' },
  ]

  const cats = ['All', 'Pastries', 'Small Chops', 'Cakes', 'Platters', 'Comfort Food']

  const filtered = active === 'All' ? items : items.filter(i => i.cat === active)

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: '#F6F1E9' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>Our Menu</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
            Handcrafted with Love
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#8B7A6F' }}>
            Every item is freshly made to order. No shopping cart needed — simply enquire via WhatsApp and we'll handle everything.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={active === c
                ? { backgroundColor: '#3A241B', color: '#F6F1E9' }
                : { backgroundColor: '#fff', color: '#3A241B', border: '1px solid #EDE7D9' }}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(item => (
            <div key={item.name} className="group bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(58,36,27,0.07)' }}>
              <div className="aspect-[4/3] overflow-hidden">
                <Img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>{item.name}</h3>
                  <span className="text-sm font-semibold flex-shrink-0 mt-0.5" style={{ color: '#C75D3A' }}>From {item.price}</span>
                </div>
                <p className="text-xs leading-relaxed mb-5" style={{ color: '#8B7A6F' }}>{item.desc}</p>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: '#FEF0EA', color: '#C75D3A' }}>
                  <WhatsAppIcon /> Enquire via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-20 p-10 rounded-2xl text-center" style={{ backgroundColor: '#3A241B' }}>
          <h3 className="text-3xl font-semibold text-white mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Don't see what you're looking for?</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(246,241,233,0.7)' }}>We offer bespoke orders — just ask. We love a creative challenge.</p>
          <BtnPrimary><WhatsAppIcon /> Chat with Us</BtnPrimary>
        </div>
      </div>
    </div>
  )
}

// ─── CELEBRATIONS PAGE ────────────────────────────────────────────────────────

function CelebrationsPage() {
  const steps = [
    { n: '01', title: 'Enquire', desc: 'Send us a WhatsApp message or fill in our contact form.' },
    { n: '02', title: 'Receive Quote', desc: 'We discuss your needs and send a detailed quote within 24 hours.' },
    { n: '03', title: 'Confirm Booking', desc: 'Secure your date with a deposit and share your design brief.' },
    { n: '04', title: 'Celebrate', desc: 'Your order is delivered fresh, beautifully presented, and on time.' },
  ]

  const services = [
    {
      title: 'Celebration Cakes',
      desc: 'Your cake is the centrepiece of your celebration. We design and bake bespoke tiered cakes in your chosen flavour — from classic vanilla sponge to rich red velvet and moist chocolate fudge. Every cake is finished by hand with intricate decorations.',
      benefits: ['Custom flavour and design', 'Tiered or single-tier options', 'Fresh on your celebration day', 'Serves 10–200+ guests'],
      img: IMGS.cake1,
    },
    {
      title: 'Birthday Surprise Platters',
      desc: "Give the gift of joy with one of our signature birthday surprise platters. Each platter is artfully styled with a curated selection of treats, florals, and personalised touches that make the recipient feel truly special.",
      benefits: ['Fully customised styling', 'Named and personalised messages', 'Same-day or next-day delivery available', 'Perfect for all ages'],
      img: IMGS.platter,
    },
    {
      title: 'Catering & Events',
      desc: "From corporate lunches to wedding receptions and family gatherings, our catering service brings the warmth of Nigerian hospitality to your event. We handle the food — you enjoy the celebration.",
      benefits: ['Full-service catering', 'Menu tailored to your event', 'Corporate and private events', 'Staffed service available'],
      img: IMGS.catering,
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#F6F1E9' }}>
      {/* Header */}
      <div className="px-6 text-center mb-20">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>Celebrations</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
            Every Occasion<br />
            <em className="font-normal" style={{ color: '#C75D3A' }}>Deserves to be Special</em>
          </h1>
          <p className="text-base" style={{ color: '#8B7A6F' }}>
            Whether it's a birthday, wedding, or corporate event, Essie Chops brings authentic Nigerian hospitality to your celebration.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {services.map((s, i) => (
          <div key={s.title} className={`grid grid-cols-1 md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
            <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <Img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className={i % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>0{i + 1}</p>
              <h2 className="text-4xl font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>{s.title}</h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#8B7A6F' }}>{s.desc}</p>
              <ul className="space-y-2 mb-8">
                {s.benefits.map(b => (
                  <li key={b} className="flex items-center gap-3 text-sm" style={{ color: '#5C3D2E' }}>
                    <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: '#D4A85333' }}>
                      <span className="block w-full h-full rounded-full scale-50" style={{ backgroundColor: '#D4A853' }} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <BtnPrimary><WhatsAppIcon /> Enquire Now</BtnPrimary>
            </div>
          </div>
        ))}
      </div>

      {/* Process */}
      <section className="mt-32 py-24 px-6" style={{ backgroundColor: '#3A241B' }}>
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>How It Works</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Simple. Seamless. Special.
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.n} className="text-center relative">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', backgroundColor: 'rgba(212,168,83,0.15)', color: '#D4A853', border: '1px solid rgba(212,168,83,0.3)' }}>
                {s.n}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px" style={{ backgroundColor: 'rgba(212,168,83,0.25)' }} />
              )}
              <h3 className="font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(246,241,233,0.6)' }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <BtnPrimary><WhatsAppIcon /> Start Your Celebration</BtnPrimary>
        </div>
      </section>
    </div>
  )
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────

function AboutPage() {
  const values = [
    { icon: 'authenticity', title: 'Authenticity', desc: 'We cook from the heart, using time-honoured Nigerian recipes that honour our heritage.' },
    { icon: 'joy', title: 'Joy', desc: 'Food is a celebration in itself. Every product we make is designed to bring people together.' },
    { icon: 'craft', title: 'Craftsmanship', desc: 'Quality is non-negotiable. We take immense pride in every detail, from ingredients to presentation.' },
    { icon: 'community', title: 'Community', desc: "We're part of the communities we serve — sharing culture through food, one celebration at a time." },
    { icon: 'integrity', title: 'Integrity', desc: 'We are honest, reliable, and transparent. If we say it will be done, it will be done — and done beautifully.' },
    { icon: 'excellence', title: 'Excellence', desc: 'Good enough is never our standard. We push for extraordinary in everything we create.' },
  ]

  const timeline = [
    { year: '2018', event: 'The Beginning', desc: 'Essie started baking from her home kitchen in London, gifting friends and family with her beloved Nigerian pastries.' },
    { year: '2020', event: 'Growing Demand', desc: 'Word spread quickly. Essie formalised Essie Chops as a business, taking orders from across London.' },
    { year: '2022', event: 'Expanding Services', desc: 'Celebration cakes, platters, and catering were added. Essie Chops became the go-to for Nigerian celebration food in London.' },
    { year: '2024', event: 'Today', desc: 'Serving hundreds of families across the UK, Essie Chops continues to grow — one unforgettable celebration at a time.' },
  ]

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#F6F1E9' }}>
      {/* Hero */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#D4A853' }}>Our Story</p>
            <h1 className="text-5xl md:text-6xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
              Food Is How<br />
              <em className="font-normal" style={{ color: '#C75D3A' }}>We Celebrate</em>
            </h1>
            <p className="text-base leading-relaxed mb-4" style={{ color: '#5C3D2E' }}>
              Essie Chops was founded by Esther — a passionate baker whose love for Nigerian food and celebration runs as deep as her roots. Growing up in a household where food was the language of love, Esther learned to cook authentic Nigerian recipes at her mother's side.
            </p>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#8B7A6F' }}>
              When she moved to the UK, she realised something was missing at every celebration: the warmth, the flavour, and the authenticity of home. So she decided to bring it herself.
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#8B7A6F' }}>
              Today, Essie Chops serves families, businesses, and communities across the UK — creating food that doesn't just taste incredible, but carries the spirit of celebration itself.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>500+</p>
                <p className="text-xs" style={{ color: '#8B7A6F' }}>Orders Fulfilled</p>
              </div>
              <div className="w-px" style={{ backgroundColor: '#EDE7D9' }} />
              <div className="text-center">
                <p className="text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>6+</p>
                <p className="text-xs" style={{ color: '#8B7A6F' }}>Years of Craft</p>
              </div>
              <div className="w-px" style={{ backgroundColor: '#EDE7D9' }} />
              <div className="text-center">
                <p className="text-4xl font-semibold" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>100%</p>
                <p className="text-xs" style={{ color: '#8B7A6F' }}>Made Fresh</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <Img src={IMGS.founder} alt="Esther, founder of Essie Chops" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl p-5 hidden md:block" style={{ backgroundColor: '#3A241B', boxShadow: '0 8px 32px rgba(58,36,27,0.25)' }}>
              <p className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Esther — Founder</p>
              <p className="text-xs" style={{ color: '#D4A853' }}>"Every order is made with love."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6" style={{ backgroundColor: '#EDE7D9' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#D4A853' }}>Our Mission</p>
          <blockquote className="text-3xl md:text-4xl font-semibold italic leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
            "To bring the warmth of Nigerian hospitality and the joy of authentic food to every celebration across the United Kingdom."
          </blockquote>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Our Values" title="What We Stand For" center />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {values.map(v => (
              <div key={v.title} className="p-8 rounded-2xl bg-white" style={{ boxShadow: '0 2px 16px rgba(58,36,27,0.06)' }}>
                <IconMark name={v.icon} />
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8B7A6F' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6" style={{ backgroundColor: '#3A241B' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="Our Journey" title="How We Got Here" />
          <div className="mt-12 space-y-8">
            {timeline.map((t, i) => (
              <div key={t.year} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-sm" style={{ backgroundColor: '#D4A853', color: '#3A241B' }}>{t.year}</div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 mt-2" style={{ backgroundColor: 'rgba(212,168,83,0.2)' }} />}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t.event}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,241,233,0.65)' }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the scenes */}
      <section className="py-24 px-6" style={{ backgroundColor: '#F6F1E9' }}>
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="Behind the Scenes" title="Where the Magic Happens" center />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            {[IMGS.chef2, IMGS.cake1, IMGS.pastry, IMGS.founder, IMGS.cake2, IMGS.desserts].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                <Img src={img} alt="Essie Chops behind the scenes" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────

function GalleryPage() {
  const [filter, setFilter] = useState('All')

  const images = [
    { src: IMGS.cake1, caption: 'White & Rose Birthday Cake', cat: 'Cakes' },
    { src: IMGS.cake2, caption: 'Wedding Celebration Cake', cat: 'Cakes' },
    { src: IMGS.desserts, caption: 'Gold Dessert Tower', cat: 'Cakes' },
    { src: IMGS.platter, caption: 'Grazing Platter for 20', cat: 'Platters' },
    { src: IMGS.dumplings, caption: 'Small Chops Selection', cat: 'Platters' },
    { src: IMGS.pastry, caption: 'Fresh Meat Pies', cat: 'Pastries' },
    { src: IMGS.bread, caption: 'Artisan Baked Goods', cat: 'Pastries' },
    { src: IMGS.puffpuff, caption: 'Golden Puff Puff', cat: 'Pastries' },
    { src: IMGS.catering, caption: 'Corporate Catering Buffet', cat: 'Catering' },
    { src: IMGS.restaurant, caption: 'Private Dining Setup', cat: 'Events' },
    { src: IMGS.founder, caption: 'The Kitchen — Where It All Begins', cat: 'Events' },
    { src: IMGS.chef2, caption: 'Fresh from the Oven', cat: 'Events' },
  ]

  const filters = ['All', 'Cakes', 'Platters', 'Pastries', 'Catering', 'Events']

  const filtered = filter === 'All' ? images : images.filter(i => i.cat === filter)

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ backgroundColor: '#F6F1E9' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>Gallery</p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
            A Taste of Our Work
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: '#8B7A6F' }}>
            Browse our portfolio of celebration cakes, platters, catering, and everything in between.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
              style={filter === f
                ? { backgroundColor: '#3A241B', color: '#F6F1E9' }
                : { backgroundColor: '#fff', color: '#3A241B', border: '1px solid #EDE7D9' }}>
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div key={i} className="group break-inside-avoid rounded-xl overflow-hidden relative">
              <Img src={img.src} alt={img.caption} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(58,36,27,0.8) 0%, transparent 60%)' }}>
                <p className="text-sm text-white font-medium">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-sm mb-6" style={{ color: '#8B7A6F' }}>
            See more on our Instagram. New creations added weekly.
          </p>
          <BtnSecondary>Follow on Instagram</BtnSecondary>
        </div>
      </div>
    </div>
  )
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', occasion: '', date: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const inputCls = "w-full px-4 py-3.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition-all"
  const inputStyle = { backgroundColor: '#fff', borderColor: '#EDE7D9', color: '#2B2522' }
  const occasions = ['Birthday', 'Wedding', 'Corporate Event', 'Family Gathering', 'Other']

  return (
    <div className="min-h-screen pt-28 pb-20" style={{ backgroundColor: '#F6F1E9' }}>
      {/* Header */}
      <div className="px-6 text-center mb-16">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: '#D4A853' }}>Get in Touch</p>
        <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>
          Start Your Order
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: '#8B7A6F' }}>
          Ready to plan something special? Reach out via WhatsApp for the quickest response, or fill in the form below.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div className="bg-white rounded-2xl p-8 md:p-10" style={{ boxShadow: '0 4px 32px rgba(58,36,27,0.08)' }}>
          <h2 className="text-2xl font-semibold mb-8" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>Send an Enquiry</h2>
          {sent ? (
            <div className="text-center py-12">
              <IconMark name="success" size="lg" />
              <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>Enquiry Received!</h3>
              <p className="text-sm" style={{ color: '#8B7A6F' }}>We'll be in touch within 24 hours. For a faster response, message us on WhatsApp.</p>
              <div className="mt-6">
                <BtnPrimary><WhatsAppIcon /> Also message us on WhatsApp</BtnPrimary>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Full Name *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="hello@email.com" className={inputCls} style={inputStyle} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Phone Number</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+44 ..." className={inputCls} style={inputStyle} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Occasion</label>
                  <select value={form.occasion} onChange={e => setForm({ ...form, occasion: e.target.value })}
                    className={inputCls} style={inputStyle}>
                    <option value="">Select occasion</option>
                    {occasions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Preferred Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                  className={inputCls} style={inputStyle} />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#5C3D2E' }}>Your Message *</label>
                <textarea required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your order — what you need, how many guests, any special requests..."
                  className={inputCls + ' resize-none'} style={inputStyle} />
              </div>

              <BtnPrimary className="w-full justify-center">
                Send Enquiry →
              </BtnPrimary>
            </form>
          )}
        </div>

        {/* Contact details */}
        <div className="space-y-8">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#3A241B' }}>
            <h3 className="text-xl font-semibold text-white mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Quickest Response</h3>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl mb-4 transition-all hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}>
              <div className="w-10 h-10 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.118 1.524 5.849L.057 23.428a.5.5 0 00.614.614l5.58-1.467A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.793 9.793 0 01-5.021-1.384l-.36-.214-3.722.978.993-3.622-.234-.373A9.818 9.818 0 012.182 12C2.182 6.56 6.56 2.182 12 2.182S21.818 6.56 21.818 12 17.44 21.818 12 21.818z"/></svg>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">WhatsApp Us</p>
                <p className="text-white/80 text-xs">+44 (0)7700 000000 — We typically reply within 1 hour</p>
              </div>
            </a>
            <a href={PHONE} className="flex items-center gap-4 p-4 rounded-xl transition-all hover:opacity-90" style={{ backgroundColor: 'rgba(246,241,233,0.08)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(212,168,83,0.2)' }}>
                <PhoneIcon />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Call Us</p>
                <p className="text-xs" style={{ color: 'rgba(246,241,233,0.6)' }}>+44 (0)7700 000000</p>
              </div>
            </a>
          </div>

          <div className="p-8 rounded-2xl bg-white" style={{ boxShadow: '0 2px 16px rgba(58,36,27,0.06)' }}>
            <h3 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#3A241B' }}>Details</h3>
            <div className="space-y-5 text-sm">
              {[
                { icon: 'email', label: 'Email', val: 'hello@essiechops.co.uk' },
                { icon: 'location', label: 'Based in', val: 'London, United Kingdom' },
                { icon: 'delivery', label: 'Delivery Areas', val: 'Greater London (nationwide on request)' },
                { icon: 'hours', label: 'Business Hours', val: 'Monday–Saturday, 9am–7pm' },
              ].map(d => (
                <div key={d.label} className="flex gap-3">
                  <IconMark name={d.icon} size="sm" />
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: '#8B7A6F' }}>{d.label}</p>
                    <p style={{ color: '#3A241B' }}>{d.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="rounded-2xl overflow-hidden h-48 flex items-center justify-center" style={{ backgroundColor: '#EDE7D9' }}>
            <div className="text-center">
              <div className="flex justify-center"><IconMark name="location" /></div>
              <p className="text-sm font-medium" style={{ color: '#3A241B' }}>London, United Kingdom</p>
              <p className="text-xs mt-1" style={{ color: '#8B7A6F' }}>Map coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (p) => {
    setPage(p)
  }

  return (
    <div style={{ backgroundColor: '#F6F1E9', minHeight: '100vh', paddingBottom: 0 }}>
      <Nav current={page} onNav={navigate} />
      <main>
        {page === 'home'         && <HomePage onNav={navigate} />}
        {page === 'menu'         && <MenuPage />}
        {page === 'celebrations' && <CelebrationsPage />}
        {page === 'about'        && <AboutPage />}
        {page === 'gallery'      && <GalleryPage />}
        {page === 'contact'      && <ContactPage />}
      </main>
      <Footer onNav={navigate} />
      <FloatingWhatsApp />
      <StickyMobileBar onContact={() => { navigate('contact'); window.scrollTo(0, 0) }} />
    </div>
  )
}
