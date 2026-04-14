import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MessageCircle, 
  Mail, 
  Instagram, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import { APPS, FAQS, CONTACT_INFO } from './constants';
import { AppProduct } from './types';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(APPS.map(app => app.category))];
  const filteredApps = filter === 'All' ? APPS : APPS.filter(app => app.category === filter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const openOrderModal = (appName?: string) => {
    if (appName) setSelectedApp(appName);
    setIsModalOpen(true);
  };

  const sendWhatsAppOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const message = `*🛒 ORDER - ALIXEN APPS*

*Instagram:* ${data.ig}
*App Name:* ${data.app}
*App Type:* ${data.type}
*Duration:* ${data.duration}
*Email Account:* ${data.email}
*Device + Country:* ${data.device}
*Payment Via:* ${data.payment}
${data.notes ? `*Notes:* ${data.notes}\n` : ''}
_I have read and agree to the Terms & Conditions._`;

    const encodedMsg = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}&text=${encodedMsg}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass h-16 flex items-center justify-between px-6 md:px-12">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActivePage('home')}
        >
          <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center font-display text-xl group-hover:scale-110 transition-transform">
            AX
          </div>
          <span className="font-display text-2xl tracking-widest uppercase hidden sm:block">Alixen Apps</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['home', 'apps', 'about', 'faq', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`text-xs font-mono uppercase tracking-widest transition-colors ${
                activePage === page ? 'text-brand-blue' : 'text-gray-400 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => openOrderModal()}
            className="bg-brand-blue hover:bg-brand-blue-dark text-white px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-widest transition-all hover:translate-y-[-2px]"
          >
            Order Now
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-brand-black pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['home', 'apps', 'about', 'faq', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setActivePage(page);
                    setIsMenuOpen(false);
                  }}
                  className={`text-2xl font-display uppercase tracking-widest text-left ${
                    activePage === page ? 'text-brand-blue' : 'text-gray-400'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => {
                  openOrderModal();
                  setIsMenuOpen(false);
                }}
                className="bg-brand-blue text-white py-4 rounded-xl font-display text-xl uppercase tracking-widest"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        {activePage === 'home' && <HomeSection onBrowse={() => setActivePage('apps')} onOrder={() => openOrderModal()} />}
        {activePage === 'apps' && (
          <AppsSection 
            filter={filter} 
            setFilter={setFilter} 
            categories={categories} 
            apps={filteredApps} 
            onOrder={openOrderModal} 
          />
        )}
        {activePage === 'about' && <AboutSection />}
        {activePage === 'faq' && <FAQSection />}
        {activePage === 'contact' && <ContactSection />}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/5 pt-16 pb-8 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center font-display text-lg">AX</div>
              <span className="font-display text-xl tracking-widest uppercase">Alixen Apps</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Unlock more, pay less. Premium app subscriptions at the most competitive prices. 100% legal, fast delivery, trusted service.
            </p>
            <div className="flex gap-4">
              <a href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`} target="_blank" className="w-10 h-10 bg-white/5 hover:bg-brand-blue/20 rounded-lg flex items-center justify-center transition-colors">
                <MessageCircle size={20} className="text-brand-blue" />
              </a>
              <a href="https://instagram.com/alikesstore" target="_blank" className="w-10 h-10 bg-white/5 hover:bg-brand-blue/20 rounded-lg flex items-center justify-center transition-colors">
                <Instagram size={20} className="text-brand-blue" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-6">Navigation</h4>
            <div className="flex flex-col gap-3">
              {['home', 'apps', 'about', 'faq', 'contact'].map(page => (
                <button key={page} onClick={() => setActivePage(page)} className="text-sm text-gray-400 hover:text-white text-left capitalize">
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-6">Support</h4>
            <div className="flex flex-col gap-3">
              <button onClick={() => setActivePage('faq')} className="text-sm text-gray-400 hover:text-white text-left">FAQ</button>
              <button onClick={() => setActivePage('about')} className="text-sm text-gray-400 hover:text-white text-left">Privacy Policy</button>
              <a href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`} target="_blank" className="text-sm text-gray-400 hover:text-white">WhatsApp Support</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-white mb-6">Contact</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-brand-blue" />
                <span className="text-sm text-gray-400">{CONTACT_INFO.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle size={16} className="text-brand-blue" />
                <span className="text-sm text-gray-400">+{CONTACT_INFO.whatsapp}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-brand-blue" />
                <span className="text-sm text-gray-400">{CONTACT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2025 Alixen Apps. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setActivePage('about')} className="text-xs text-gray-500 hover:text-white">Privacy Policy</button>
            <button onClick={() => setActivePage('faq')} className="text-xs text-gray-500 hover:text-white">Terms of Service</button>
          </div>
        </div>
      </footer>

      {/* Order Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-display uppercase tracking-wider mb-1">Order Now</h2>
                    <p className="text-gray-400 text-sm">Fill in the details. You'll be redirected to WhatsApp.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={sendWhatsAppOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Instagram Username *</label>
                      <input name="ig" required type="text" placeholder="@username" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Order Date</label>
                      <input readOnly value={new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-500 outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">App Name *</label>
                      <select name="app" required defaultValue={selectedApp} className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors appearance-none">
                        <option value="">Select App...</option>
                        {APPS.map(app => <option key={app.id} value={app.name}>{app.name}</option>)}
                        <option value="Other">Other (Specify in notes)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">App Type</label>
                      <select name="type" className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors appearance-none">
                        <option value="Personal (PPJ)">Personal (PPJ)</option>
                        <option value="Team/Family">Team/Family</option>
                        <option value="Shared Account">Shared Account</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Duration *</label>
                      <select name="duration" required className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors appearance-none">
                        <option value="1 Month">1 Month</option>
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="1 Year">1 Year</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Payment Method</label>
                      <select name="payment" className="w-full bg-brand-dark border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors appearance-none">
                        <option value="Dana">Dana</option>
                        <option value="Shopeepay">Shopeepay</option>
                        <option value="OVO">OVO</option>
                        <option value="Gopay">Gopay</option>
                        <option value="QRIS">QRIS</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Email Account *</label>
                    <input name="email" required type="email" placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Device + Country</label>
                    <input name="device" type="text" placeholder="e.g. iPhone 13, Indonesia" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Notes</label>
                    <textarea name="notes" rows={2} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-brand-blue outline-none transition-colors resize-none" />
                  </div>

                  <button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all hover:translate-y-[-2px] mt-4">
                    Send via WhatsApp →
                  </button>
                  
                  <p className="text-[10px] text-gray-500 text-center leading-relaxed">
                    By ordering, you agree to our Terms & Conditions. Payment must be completed to confirm order.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Sub-sections ---

function HomeSection({ onBrowse, onOrder }: { onBrowse: () => void, onOrder: () => void }) {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue-light text-[10px] font-mono uppercase tracking-widest mb-8"
          >
            <span className="w-1.5 h-1.5 bg-brand-blue-light rounded-full animate-pulse" />
            Trusted Premium App Reseller
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display uppercase leading-[0.9] mb-8"
          >
            Unlock <br />
            <span className="text-brand-blue">More,</span> <br />
            Pay Less
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed"
          >
            Get premium subscriptions for your favorite apps at prices that won't break the bank. Fast delivery, 100% legal, guaranteed service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={onBrowse} className="bg-brand-blue hover:bg-brand-blue-dark text-white px-10 py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-2px]">
              Browse Apps
            </button>
            <button onClick={onOrder} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-widest transition-all hover:translate-y-[-2px]">
              Order Now
            </button>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl">
          {[
            { label: 'Premium Apps', value: '50+' },
            { label: 'Legal & Trusted', value: '100%' },
            { label: 'Instant Delivery', value: 'Fast' },
            { label: 'Support Daily', value: '7/7' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="text-4xl font-display text-brand-blue mb-1">{stat.value}</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="py-12 bg-brand-dark border-y border-white/5 overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 animate-marquee">
          {[...APPS, ...APPS].map((app, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-2xl">{app.icon}</span>
              <span className="font-display text-2xl uppercase tracking-widest text-gray-400">{app.name}</span>
              <span className="text-brand-blue">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-blue mb-4 block">Why Choose Us</span>
            <h2 className="text-5xl md:text-6xl font-display uppercase mb-6">Built for your digital life</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We provide the best value for premium subscriptions with a focus on speed and reliability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="text-brand-blue" />, title: 'Lightning Fast', desc: 'Orders processed instantly during operating hours. No long waits.' },
              { icon: <ShieldCheck className="text-brand-blue" />, title: '100% Legal', desc: 'All subscriptions are legitimate and fully compliant with app terms.' },
              { icon: <Star className="text-brand-blue" />, title: 'Best Prices', desc: 'We offer the most competitive rates in the market, guaranteed.' },
            ].map((feat, i) => (
              <div key={i} className="p-10 bg-brand-dark border border-white/5 rounded-3xl hover:border-brand-blue/30 transition-colors group">
                <div className="w-14 h-14 bg-brand-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-2xl font-display uppercase mb-4">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 pb-32">
        <div className="max-w-7xl mx-auto bg-brand-blue rounded-[40px] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-display uppercase text-white leading-none mb-6">Ready to unlock <br /> premium?</h2>
            <p className="text-white/70 text-lg max-w-md">Browse all available apps and get the best prices. Fast delivery guaranteed.</p>
          </div>
          <button onClick={onBrowse} className="relative z-10 bg-white text-brand-blue px-12 py-5 rounded-2xl font-mono text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all hover:translate-y-[-2px] whitespace-nowrap">
            View Pricelist <ArrowRight className="inline-block ml-2" size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function AppsSection({ filter, setFilter, categories, apps, onOrder }: any) {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-blue mb-4 block">Pricelist</span>
        <h2 className="text-5xl md:text-7xl font-display uppercase mb-8">All Available Apps</h2>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-mono uppercase tracking-widest border transition-all ${
                filter === cat 
                  ? 'bg-brand-blue border-brand-blue text-white' 
                  : 'bg-transparent border-white/10 text-gray-400 hover:border-brand-blue/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app: AppProduct) => (
          <motion.div
            layout
            key={app.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-dark border border-white/5 rounded-3xl p-8 flex flex-col hover:border-brand-blue/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="text-4xl group-hover:scale-110 transition-transform">{app.icon}</div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full border border-brand-blue/20">
                {app.category}
              </span>
            </div>
            
            <h3 className="text-2xl font-display uppercase mb-3">{app.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">{app.description}</p>
            
            <div className="space-y-2 mb-8">
              {app.prices.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">{p.duration}</span>
                  <span className="text-lg font-display text-brand-blue-light">{p.amount}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onOrder(app.name)}
              className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white py-3.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all group-hover:translate-y-[-2px]"
            >
              Order This App →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-square bg-brand-dark border border-white/10 rounded-[40px] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-brand-blue/5 blur-[100px] rounded-full" />
            <div className="text-8xl font-display text-white mb-4 relative z-10">ALI<span className="text-brand-blue">X</span>EN</div>
            <div className="text-xs font-mono uppercase tracking-[0.4em] text-brand-blue-light relative z-10">Unlock More · Pay Less</div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-blue rounded-3xl -z-10 rotate-12 opacity-20" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-blue mb-4 block">Our Story</span>
          <h2 className="text-5xl md:text-7xl font-display uppercase mb-8">Who We Are</h2>
          <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
            <p>Alixen Apps is a trusted premium app subscription reseller dedicated to making world-class digital tools accessible to everyone. We believe that premium software shouldn't cost a premium price.</p>
            <p>Our mission is simple: connect people with the apps they need at prices they can actually afford — without compromising on quality, legality, or service.</p>
            <p>Operating 7 days a week, we offer fast response, transparent pricing, and a smooth ordering experience via WhatsApp. Every transaction is legitimate and backed by our service guarantee.</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            {[
              { title: 'Fast Delivery', desc: 'Orders processed quickly in queue.' },
              { title: '100% Legal', desc: 'Legitimate and compliant subscriptions.' },
              { title: 'Friendly Support', desc: 'Available daily for your questions.' },
              { title: 'Best Prices', desc: 'Most competitive rates in the market.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-brand-dark border border-white/5 rounded-2xl">
                <h4 className="text-white font-display uppercase text-lg mb-2">{item.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-blue mb-4 block">Help Center</span>
        <h2 className="text-5xl md:text-7xl font-display uppercase mb-6">Common Questions</h2>
        <p className="text-gray-400">Everything you need to know before ordering. Can't find an answer? Contact us on WhatsApp.</p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div key={i} className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-lg font-medium pr-8">{faq.question}</span>
              <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>
                <X size={16} className="text-brand-blue" />
              </div>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-blue mb-4 block">Get In Touch</span>
        <h2 className="text-5xl md:text-7xl font-display uppercase mb-6">Contact Us</h2>
        <p className="text-gray-400">Reach out via WhatsApp for orders or Gmail for other inquiries. We respond fast.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-10 bg-brand-dark border border-white/5 rounded-[32px]">
            <h3 className="text-3xl font-display uppercase mb-8">Direct Channels</h3>
            <div className="space-y-4">
              <a href={`https://api.whatsapp.com/send?phone=${CONTACT_INFO.whatsapp}`} target="_blank" className="flex items-center gap-6 p-6 bg-white/5 hover:bg-brand-blue/10 border border-white/5 hover:border-brand-blue/30 rounded-2xl transition-all group">
                <div className="w-14 h-14 bg-[#25D366] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">WhatsApp Business</div>
                  <div className="text-xl font-medium">+{CONTACT_INFO.whatsapp}</div>
                </div>
              </a>
              
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-6 p-6 bg-white/5 hover:bg-brand-blue/10 border border-white/5 hover:border-brand-blue/30 rounded-2xl transition-all group">
                <div className="w-14 h-14 bg-[#EA4335] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Mail size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Email Support</div>
                  <div className="text-xl font-medium">{CONTACT_INFO.email}</div>
                </div>
              </a>

              <a href="https://instagram.com/alikesstore" target="_blank" className="flex items-center gap-6 p-6 bg-white/5 hover:bg-brand-blue/10 border border-white/5 hover:border-brand-blue/30 rounded-2xl transition-all group">
                <div className="w-14 h-14 bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Instagram size={28} />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-1">Instagram</div>
                  <div className="text-xl font-medium">{CONTACT_INFO.instagram}</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="p-10 bg-brand-dark border border-white/5 rounded-[32px] flex flex-col">
          <h3 className="text-3xl font-display uppercase mb-8">Operating Hours</h3>
          <div className="space-y-4 flex-grow">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                <span className="text-gray-400">{day}</span>
                <span className="font-mono text-sm text-brand-blue-light">08:00 – 22:00</span>
              </div>
            ))}
          </div>
          <div className="mt-12 p-6 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl flex items-center gap-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-brand-blue-light">Open 7 Days a Week</span>
          </div>
        </div>
      </div>
    </section>
  );
}
