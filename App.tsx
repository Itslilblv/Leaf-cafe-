import { useState, useRef, useEffect, createContext, useContext, ReactNode } from 'react';

/* ═══════════════════════════════════════════
   بيانات المنيو
═══════════════════════════════════════════ */
interface MenuItem {
  id: number; name: string; nameEn: string; price: string; img: string; badge?: string; badgeColor?: string;
}
interface MenuCategory {
  id: string; label: string; labelAr: string; icon: string; items: MenuItem[];
}

const MENU: MenuCategory[] = [
  {
    id: 'hot', label: 'Hot', labelAr: 'حار', icon: '☕',
    items: [
      { id: 1, name: 'اسبريسو', nameEn: 'Espresso', price: '8', img: 'images/espresso.jpg', badge: 'Classic', badgeColor: 'bg-amber-600' },
      { id: 2, name: 'ميكياتو', nameEn: 'Macchiato', price: '10', img: 'images/cappuccino.jpg' },
      { id: 3, name: 'كورتادو', nameEn: 'Cortado', price: '12', img: 'images/espresso.jpg' },
      { id: 4, name: 'فلات وايت', nameEn: 'Flat White', price: '12', img: 'images/cappuccino.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 5, name: 'كابتشينو', nameEn: 'Cappuccino', price: '14', img: 'images/cappuccino.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 6, name: 'لاتيه', nameEn: 'Latte', price: '14', img: 'images/cappuccino.jpg' },
      { id: 7, name: 'سبانش لاتيه', nameEn: 'Spanish Latte', price: '14', img: 'images/cappuccino.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 8, name: 'كراميل لاتيه', nameEn: 'Caramel Latte', price: '14', img: 'images/cappuccino.jpg' },
      { id: 9, name: 'هوت شوكليت', nameEn: 'Hot Chocolate', price: '14', img: 'images/hot-chocolate.jpg' },
      { id: 10, name: 'هوت موكا', nameEn: 'Hot Mocha', price: '14', img: 'images/hot-chocolate.jpg' },
      { id: 11, name: 'هوت ماتشا', nameEn: 'Hot Matcha', price: '12', img: 'images/matcha.jpg' },
      { id: 12, name: 'أمريكانو', nameEn: 'Americano', price: '10', img: 'images/espresso.jpg' },
    ]
  },
  {
    id: 'cold', label: 'Cold', labelAr: 'بارد', icon: '🧊',
    items: [
      { id: 20, name: 'آيس لاتيه', nameEn: 'Iced Latte', price: '16', img: 'images/iced-latte.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 21, name: 'آيس سبانش', nameEn: 'Iced Spanish', price: '16', img: 'images/iced-latte.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 22, name: 'آيس وايت موكا', nameEn: 'Iced White Mocha', price: '16', img: 'images/iced-latte.jpg' },
      { id: 23, name: 'آيس كراميل', nameEn: 'Iced Caramel', price: '16', img: 'images/iced-latte.jpg' },
      { id: 24, name: 'آيس شوكليت', nameEn: 'Iced Chocolate', price: '16', img: 'images/iced-latte.jpg' },
      { id: 25, name: 'آيس موكا', nameEn: 'Iced Mocha', price: '16', img: 'images/iced-latte.jpg' },
      { id: 26, name: 'كلاسيك ماتشا', nameEn: 'Classic Matcha', price: '14', img: 'images/matcha.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 27, name: 'آيس أمريكانو', nameEn: 'Iced Americano', price: '12', img: 'images/iced-latte.jpg' },
      { id: 28, name: 'كركديه باشن فروت', nameEn: 'Hibiscus Passion', price: '13', img: 'images/mojito.jpg', badge: '✨ جديد', badgeColor: 'bg-sky-600' },
      { id: 29, name: 'كركديه عادي', nameEn: 'Classic Hibiscus', price: '10', img: 'images/mojito.jpg' },
    ]
  },
  {
    id: 'drip', label: 'Drip', labelAr: 'مقطرة', icon: '⏳',
    items: [
      { id: 30, name: 'قهوة اليوم', nameEn: 'Coffee of the Day', price: '8 / 10', img: 'images/v60.jpg', badge: 'حار | بارد', badgeColor: 'bg-orange-600' },
      { id: 31, name: 'V60 إثيوبي', nameEn: 'V60 Ethiopian', price: '14 / 16', img: 'images/v60.jpg', badge: '⭐ مختص', badgeColor: 'bg-purple-600' },
      { id: 32, name: 'V60 كولومبي', nameEn: 'V60 Colombian', price: '14 / 16', img: 'images/v60.jpg', badge: '⭐ مختص', badgeColor: 'bg-purple-600' },
    ]
  },
  {
    id: 'mojito', label: 'Mojito', labelAr: 'موهيتو', icon: '🍹',
    items: [
      { id: 40, name: 'شيري', nameEn: 'Cherry', price: '12 / 15', img: 'images/mojito.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 41, name: 'فروتيكا', nameEn: 'Frutica', price: '12 / 15', img: 'images/mojito.jpg', badge: '🍃 منعش', badgeColor: 'bg-emerald-600' },
      { id: 42, name: 'فروتيفا', nameEn: 'Frutiva', price: '12 / 15', img: 'images/mojito.jpg', badge: '✨ جديد', badgeColor: 'bg-sky-600' },
    ]
  },
  {
    id: 'dessert', label: 'Dessert', labelAr: 'حلى', icon: '🍰',
    items: [
      { id: 50, name: 'كوكوت مانجو', nameEn: 'Mango Cocotte', price: '16', img: 'images/dessert.jpg' },
      { id: 51, name: 'كوكوت فراولة', nameEn: 'Strawberry Cocotte', price: '16', img: 'images/dessert.jpg' },
      { id: 52, name: 'ليزي كات', nameEn: 'Lazy Cat', price: '16', img: 'images/dessert.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 53, name: 'ماتيلدا كيك', nameEn: 'Matilda Cake', price: '16', img: 'images/dessert.jpg' },
      { id: 54, name: 'بودينغ تراميسيو', nameEn: 'Tiramisu Pudding', price: '18', img: 'images/dessert.jpg', badge: '🔥 الأكثر طلباً', badgeColor: 'bg-red-600' },
      { id: 55, name: 'سان سباستيان', nameEn: 'San Sebastian', price: '18', img: 'images/dessert.jpg', badge: '⭐ مميز', badgeColor: 'bg-purple-600' },
      { id: 56, name: 'شيز بيكان', nameEn: 'Cheese Pecan', price: '16', img: 'images/dessert.jpg' },
      { id: 57, name: 'كوكيز بيكان', nameEn: 'Pecan Cookies', price: '10', img: 'images/dessert.jpg' },
    ]
  },
];

const GALLERY = [
  { src: 'images/hero-bg.jpg', title: 'أجواء ليف كافيه' },
  { src: 'images/cappuccino.jpg', title: 'كابتشينو مميز' },
  { src: 'images/espresso.jpg', title: 'اسبريسو فاخر' },
  { src: 'images/iced-latte.jpg', title: 'آيس لاتيه' },
  { src: 'images/v60.jpg', title: 'V60 مقطرة' },
  { src: 'images/matcha.jpg', title: 'ماتشا طازجة' },
  { src: 'images/hot-chocolate.jpg', title: 'هوت شوكليت' },
  { src: 'images/mojito.jpg', title: 'موهيتو منعش' },
  { src: 'images/dessert.jpg', title: 'حلويات فاخرة' },
  { src: 'images/leaf-logo.jpg', title: 'ليف كافيه' },
];

const PHONE = '966508720657';
const MAP_URL = 'https://maps.app.goo.gl/ptdiH2jH2dqnnHif6?g_st=ic';
const TIKTOK = 'https://www.tiktok.com/@leaf.cafe1';
const DEV_IG = 'https://www.instagram.com/_itlulp';

/* ═══════════════════════════════════════════
   سلة المشتريات Context
═══════════════════════════════════════════ */
interface CartItem { id: number; name: string; price: string; img: string; qty: number; }
interface CartCtx {
  items: CartItem[];
  add: (item: MenuItem) => void;
  remove: (id: number) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  clear: () => void;
  total: number;
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const CartContext = createContext<CartCtx | null>(null);
const useCart = () => useContext(CartContext)!;

function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  const add = (m: MenuItem) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === m.id);
      if (exists) return prev.map(i => i.id === m.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...m, qty: 1 }];
    });
  };
  const remove = (id: number) => setItems(p => p.filter(i => i.id !== id));
  const inc = (id: number) => setItems(p => p.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i));
  const dec = (id: number) => setItems(p => p.map(i => i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i));
  const clear = () => setItems([]);
  const total = items.reduce((s, i) => s + (parseFloat(i.price) || 0) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, inc, dec, clear, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

/* ═══════════════════════════════════════════
   Navbar
═══════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'الرئيسية', href: '#hero' },
    { label: 'المنيو', href: '#menu' },
    { label: 'من نحن', href: '#about' },
    { label: 'المعرض', href: '#gallery' },
    { label: 'تواصل', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-3 h-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-1.5">
          <img src="images/leaf-logo.jpg" alt="Leaf" className="w-8 h-8 rounded-full object-cover border border-[#C8A96E]/30" />
          <span className="text-sm font-bold text-gold-gradient">ليف كافيه</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-xs text-gray-300 hover:text-[#C8A96E] transition-colors">{l.label}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => cart.setOpen(true)} className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition">
            <svg className="w-4 h-4 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
            {cart.count > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C8A96E] text-black text-[9px] font-bold rounded-full flex items-center justify-center">{cart.count}</span>}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/5">
            {menuOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass anim-slideDown border-t border-white/5">
          <div className="px-4 py-2 flex flex-col gap-1">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm py-2 text-gray-300 hover:text-[#C8A96E] transition">{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   Hero Section - فيديو خلفية
═══════════════════════════════════════════ */
function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="hero" className="relative h-screen min-h-[500px] max-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="images/hero-bg.jpg"
      >
        <source src="https://videos.pexels.com/video-files/4816585/4816585-uhd_1440_2560_30fps.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <div className="anim-fadeUp">
          <img src="images/leaf-logo.jpg" alt="Leaf Cafe" className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-[#C8A96E]/40 shadow-lg shadow-[#C8A96E]/20 mb-4" />
          <h1 className="text-2xl sm:text-3xl font-black mb-2 text-gold-gradient leading-tight">ليف كافيه</h1>
          <p className="text-sm text-gray-300 mb-5">تجربة القهوة بمفهوم مختلف · فرع بحرة</p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#C8A96E] to-[#A68B4B] text-black font-bold text-sm py-2.5 px-5 rounded-full hover:shadow-lg hover:shadow-[#C8A96E]/30 transition-all active:scale-95">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.313 0-4.461-.764-6.186-2.054l-.432-.338-3.15 1.055 1.055-3.15-.338-.432A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
              اطلب عبر الواتساب
            </a>
            <a href={MAP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#C8A96E]/50 text-[#C8A96E] font-semibold text-sm py-2.5 px-5 rounded-full hover:bg-[#C8A96E]/10 transition-all active:scale-95">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              موقعنا على الخرائط
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 anim-scroll opacity-50">
        <svg className="w-5 h-5 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Menu Section
═══════════════════════════════════════════ */
function MenuSection() {
  const [activeTab, setActiveTab] = useState('hot');
  const cart = useCart();
  const [addedId, setAddedId] = useState<number | null>(null);

  const activeCategory = MENU.find(c => c.id === activeTab)!;

  const handleAdd = (item: MenuItem) => {
    cart.add(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 800);
  };

  return (
    <section id="menu" className="py-8 px-3 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-gold-gradient">MENU</span>
        </h2>
        <p className="text-[11px] text-gray-500 mt-1">قائمة المشروبات والحلى</p>
        <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96E] to-transparent mx-auto mt-2" />
      </div>

      {/* Tabs - بارزة واحترافية ومريحة للمس */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2 justify-start sm:justify-center px-1">
        {MENU.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`flex-shrink-0 flex flex-col items-center gap-0.5 min-w-[72px] py-3 px-4 rounded-2xl text-center font-bold transition-all duration-300 active:scale-95 ${
              activeTab === cat.id
                ? 'bg-gradient-to-b from-[#C8A96E] to-[#A68B4B] text-black shadow-lg shadow-[#C8A96E]/25 scale-105'
                : 'bg-white/[0.06] text-gray-400 hover:bg-white/10 border border-white/[0.06]'
            }`}
          >
            <span className="text-xl leading-none">{cat.icon}</span>
            <span className="text-[11px] font-extrabold tracking-wide">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {activeCategory.items.map((item, idx) => (
          <div
            key={item.id}
            className="glass rounded-xl overflow-hidden hover:border-[#C8A96E]/30 transition-all group"
            style={{ animation: `fadeUp .4s ease ${idx * 0.05}s both` }}
          >
            {/* Image */}
            <div className="relative h-28 sm:h-32 overflow-hidden bg-[#111]">
              <img
                src={item.img}
                alt={item.name}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop`;
                }}
              />
              {item.badge && (
                <span className={`absolute top-1.5 right-1.5 ${item.badgeColor || 'bg-[#C8A96E]'} text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg backdrop-blur-sm`}>
                  {item.badge}
                </span>
              )}
            </div>

            {/* Info - اسم عربي فوق وإنجليزي تحت */}
            <div className="p-2.5">
              <h3 className="text-[13px] font-bold text-white leading-tight">{item.name}</h3>
              <p className="text-[10px] text-gray-500 mt-0.5" dir="ltr" style={{ fontFamily: "'Inter', sans-serif", textAlign: 'right' }}>{item.nameEn}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[#C8A96E] text-sm font-black">{item.price} <span className="text-[9px] text-gray-500 font-normal">ر.س</span></span>
                <button
                  onClick={() => handleAdd(item)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 active:scale-75 ${
                    addedId === item.id
                      ? 'bg-green-500 text-white scale-110'
                      : 'bg-[#C8A96E] text-black hover:bg-[#E0C992] hover:shadow-md hover:shadow-[#C8A96E]/20'
                  }`}
                >
                  {addedId === item.id ? '✓' : '+'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   About Section
═══════════════════════════════════════════ */
function About() {
  const stats = [
    { num: '500+', label: 'فنجان يومياً', icon: '☕' },
    { num: '2000+', label: 'عميل سعيد', icon: '😊' },
    { num: '3+', label: 'سنوات خبرة', icon: '⭐' },
    { num: '30+', label: 'صنف متنوع', icon: '📋' },
  ];

  return (
    <section id="about" className="py-8 px-3 max-w-5xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-xl font-black text-gold-gradient">من نحن</h2>
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96E] to-transparent mx-auto mt-1.5" />
      </div>

      <div className="glass rounded-xl p-4 sm:p-6 mb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <img src="images/leaf-logo.jpg" alt="Leaf" className="w-20 h-20 rounded-xl object-cover border border-[#C8A96E]/20 flex-shrink-0" />
          <div className="text-center sm:text-right">
            <h3 className="text-base font-bold text-[#C8A96E] mb-1.5">ليف كافيه - فرع بحرة</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              نقدم لكم تجربة قهوة استثنائية بأجود أنواع البُن المختص. نحمص حبوبنا بعناية فائقة ونحضّر كل فنجان بشغف وإتقان. من الإسبريسو الكلاسيكي إلى المشروبات الباردة المنعشة والحلويات الفاخرة، كل شيء صُنع ليمنحك لحظة مميزة.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-lg p-2 text-center hover:border-[#C8A96E]/30 transition">
            <span className="text-lg">{s.icon}</span>
            <p className="text-sm font-black text-[#C8A96E] mt-0.5">{s.num}</p>
            <p className="text-[9px] text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Gallery / المعرض
═══════════════════════════════════════════ */
function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <section id="gallery" className="py-8 px-3 max-w-5xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-xl font-black text-gold-gradient">معرض الصور</h2>
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96E] to-transparent mx-auto mt-1.5" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {GALLERY.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setLightbox(idx)}
            className={`relative rounded-xl overflow-hidden cursor-pointer group ${
              idx === 0 ? 'col-span-2 row-span-2' : ''
            }`}
            style={{ animation: `fadeUp .4s ease ${idx * 0.06}s both` }}
          >
            <div className={`${idx === 0 ? 'h-48 sm:h-64' : 'h-24 sm:h-32'} overflow-hidden bg-[#111]`}>
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] font-bold text-white">{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 anim-fadeIn" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xl z-10" onClick={() => setLightbox(null)}>✕</button>
          <img src={GALLERY[lightbox].src} alt="" className="max-w-full max-h-[80vh] rounded-xl object-contain" onClick={e => e.stopPropagation()} />
          <p className="absolute bottom-6 text-sm font-bold text-[#C8A96E]">{GALLERY[lightbox].title}</p>

          {/* Nav */}
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition" onClick={e => { e.stopPropagation(); setLightbox(lightbox > 0 ? lightbox - 1 : GALLERY.length - 1); }}>›</button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition" onClick={e => { e.stopPropagation(); setLightbox(lightbox < GALLERY.length - 1 ? lightbox + 1 : 0); }}>‹</button>
        </div>
      )}
    </section>
  );
}

/* ═══════════════════════════════════════════
   Contact Section
═══════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" className="py-8 px-3 max-w-5xl mx-auto">
      <div className="text-center mb-5">
        <h2 className="text-xl font-black text-gold-gradient">تواصل معنا</h2>
        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent via-[#C8A96E] to-transparent mx-auto mt-1.5" />
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <a href={MAP_URL} target="_blank" rel="noreferrer" className="glass rounded-xl p-3 text-center hover:border-[#C8A96E]/30 transition group">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#C8A96E]/10 flex items-center justify-center mb-1.5 group-hover:bg-[#C8A96E]/20 transition">
            <svg className="w-5 h-5 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <p className="text-[10px] font-bold text-white">الموقع</p>
          <p className="text-[9px] text-gray-500">بحرة</p>
        </a>

        <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="glass rounded-xl p-3 text-center hover:border-[#C8A96E]/30 transition group">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-500/10 flex items-center justify-center mb-1.5 group-hover:bg-green-500/20 transition">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </div>
          <p className="text-[10px] font-bold text-white">واتساب</p>
          <p className="text-[9px] text-gray-500 direction-ltr" dir="ltr">050 872 0657</p>
        </a>

        <div className="glass rounded-xl p-3 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-[#C8A96E]/10 flex items-center justify-center mb-1.5">
            <svg className="w-5 h-5 text-[#C8A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p className="text-[10px] font-bold text-white">ساعات العمل</p>
          <p className="text-[9px] text-gray-500">٦ص - ١٢م</p>
        </div>
      </div>

      {/* CTA */}
      <a
        href={`https://wa.me/${PHONE}?text=${encodeURIComponent('السلام عليكم، أبغى أطلب من ليف كافيه 🍃')}`}
        target="_blank"
        rel="noreferrer"
        className="block w-full glass rounded-xl p-3 text-center hover:border-green-500/30 transition group"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center anim-pulse">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-green-400">اطلب الآن عبر الواتساب</p>
            <p className="text-[9px] text-gray-500">نرد عليك بأسرع وقت</p>
          </div>
        </div>
      </a>
    </section>
  );
}

/* ═══════════════════════════════════════════
   Cart Drawer
═══════════════════════════════════════════ */
function CartDrawer() {
  const cart = useCart();

  const sendWhatsApp = () => {
    let msg = '🍃 *طلب جديد من ليف كافيه*\n\n';
    cart.items.forEach(i => {
      msg += `• ${i.name} × ${i.qty} — ${(parseFloat(i.price) || 0) * i.qty} ر.س\n`;
    });
    msg += `\n💰 *الإجمالي: ${cart.total} ر.س*`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {cart.open && <div className="fixed inset-0 z-[90] bg-black/60" onClick={() => cart.setOpen(false)} />}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 z-[95] h-full w-full max-w-sm bg-[#111] border-l border-white/5 shadow-2xl transition-transform duration-300 ${cart.open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/5">
          <h3 className="text-sm font-bold text-[#C8A96E]">🛒 السلة ({cart.count})</h3>
          <button onClick={() => cart.setOpen(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition">✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {cart.items.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl">🛒</span>
              <p className="text-xs text-gray-500 mt-2">السلة فاضية</p>
            </div>
          ) : (
            cart.items.map(item => (
              <div key={item.id} className="glass rounded-lg p-2 flex items-center gap-2">
                <img src={item.img} alt={item.name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{item.name}</p>
                  <p className="text-[10px] text-[#C8A96E]">{(parseFloat(item.price) || 0) * item.qty} ر.س</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => cart.dec(item.id)} className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs hover:bg-white/10 transition">-</button>
                  <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => cart.inc(item.id)} className="w-6 h-6 rounded-full bg-[#C8A96E]/20 flex items-center justify-center text-xs text-[#C8A96E] hover:bg-[#C8A96E]/30 transition">+</button>
                </div>
                <button onClick={() => cart.remove(item.id)} className="w-6 h-6 rounded-full flex items-center justify-center text-red-400 hover:bg-red-400/10 transition text-xs">🗑</button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="absolute bottom-0 inset-x-0 p-3 border-t border-white/5 bg-[#111] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">الإجمالي</span>
              <span className="text-base font-black text-[#C8A96E]">{cart.total} ر.س</span>
            </div>
            <button onClick={sendWhatsApp} className="w-full py-2.5 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-bold transition active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              إرسال الطلب عبر واتساب
            </button>
            <button onClick={cart.clear} className="w-full py-1.5 text-xs text-red-400 hover:text-red-300 transition">إفراغ السلة</button>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   Footer
═══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-6 px-3 mt-4">
      <div className="max-w-5xl mx-auto">
        {/* Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <img src="images/leaf-logo.jpg" alt="Leaf" className="w-8 h-8 rounded-full object-cover border border-[#C8A96E]/20" />
            <span className="text-sm font-bold text-gold-gradient">ليف كافيه</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            <a href={TIKTOK} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition" title="TikTok">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.28 8.28 0 004.76 1.5v-3.4a4.85 4.85 0 01-1-.28z"/></svg>
            </a>
            <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition" title="WhatsApp">
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center border-t border-white/5 pt-3">
          <p className="text-[10px] text-gray-600">© {new Date().getFullYear()} ليف كافيه · جميع الحقوق محفوظة</p>
          <a href={DEV_IG} target="_blank" rel="noreferrer" className="text-[10px] text-gray-600 hover:text-[#C8A96E] transition mt-0.5 inline-block">
            تطوير: <span className="text-[#C8A96E]">_itlulp</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   Floating WhatsApp Button
═══════════════════════════════════════════ */
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95 anim-pulse"
    >
      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.313 0-4.461-.764-6.186-2.054l-.432-.338-3.15 1.055 1.055-3.15-.338-.432A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
    </a>
  );
}

/* ═══════════════════════════════════════════
   App - الرئيسي
═══════════════════════════════════════════ */
function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">
        <Navbar />
        <Hero />
        <MenuSection />
        <About />
        <Gallery />
        <Contact />
        <Footer />
        <CartDrawer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}

export default App;
