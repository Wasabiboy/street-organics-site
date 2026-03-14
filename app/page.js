'use client';
import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Coffee, 
  Utensils, 
  Heart,
  ShoppingBag,
  ArrowRight,
  Star,
  Send,
  CheckCircle2,
  Trash2,
  Plus,
  Minus,
  Search
} from 'lucide-react';

// --- Components ---

const Navbar = ({ scrolled, cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* LOGO SECTION */}
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          <img 
            src="/logo.png" 
            alt="Street Organics Logo" 
            className={`h-12 md:h-16 w-auto transition-all ${!scrolled ? 'brightness-0 invert' : ''}`}
            onError={(e) => {
              // Fallback if logo.png isn't found yet
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Temporary Fallback UI if logo isn't in public folder yet */}
          <div className="hidden items-center gap-2 group">
            <div className="bg-emerald-600 p-2 rounded-full group-hover:rotate-12 transition-transform">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              STREET <span className="text-emerald-500">ORGANICS</span>
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className={`hidden md:flex gap-8 font-medium ${scrolled ? 'text-gray-700' : 'text-white'}`}>
          {['Menu', 'Story', 'Reservations', 'Catering', 'Locations', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-emerald-500 transition-colors uppercase text-xs tracking-widest">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="hidden md:block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg uppercase text-xs tracking-wider">
            Order Online
          </button>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className={scrolled ? 'text-black' : 'text-white'} /> : <MenuIcon className={scrolled ? 'text-black' : 'text-white'} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col p-6 gap-4 animate-in slide-in-from-top duration-300">
          {['Menu', 'Story', 'Reservations', 'Catering', 'Locations', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-800 text-lg font-medium border-b border-gray-100 pb-2" onClick={() => setIsOpen(false)}>
              {item}
            </a>
          ))}
          <button className="bg-emerald-600 text-white p-3 rounded-lg font-bold w-full mt-2">Order Online</button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const bannerImages = [
    "/Hero/banner-01.jpg",
    "/Hero/banner-02.jpg",
    "/Hero/banner-03.jpg"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [bannerImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fading Banner Images */}
      <div className="absolute inset-0 z-0">
        {bannerImages.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={src} 
              className="w-full h-full object-cover brightness-[0.4]"
              alt={`Street Organics Banner ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-emerald-600/20 backdrop-blur-md text-emerald-400 px-4 py-2 rounded-full mb-6 border border-emerald-500/30 animate-pulse">
          <Leaf size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">Pristine. Organic. Local.</span>
        </div>
        <h1 className="text-[2.4rem] md:text-[4.8rem] font-black text-white mb-6 leading-tight">
          STREET ORGANICS <br />
          <span className="text-emerald-400 italic font-serif">REAL FOOR FOR</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Serving Takapuna with high-quality, organic meals that fuel your body. From cold-pressed juices to wholesome bowls, every bite is a step toward wellness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group">
            Today's Menu <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
          <a href="#locations" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-emerald-900 transition-all text-center">
            Find Us
          </a>
        </div>
      </div>
    </section>
  );
};

const OurStory = () => (
  <section id="story" className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="md:w-1/2 relative">
          {/* Main Image: Nicky P */}
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-50">
            <img src="/Story/NickyP.jpg" alt="Nicky Partridge - Owner" className="w-full h-auto" />
          </div>
          {/* Secondary Floating Image: The Kitchen scene */}
          <div className="absolute -bottom-10 -right-10 w-48 h-64 md:w-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl border-8 border-white z-20 hidden lg:block">
            <img src="/Story/image_8bd4db.jpg" alt="Kitchen Prep" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-emerald-600/20 rounded-full -z-0"></div>
        </div>
        <div className="md:w-1/2">
          <span className="text-emerald-600 font-bold uppercase tracking-[0.3em] text-sm block mb-4">Meet the Owner</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 uppercase leading-tight">Hi, I’m <span className="text-emerald-600 italic font-serif capitalize">Nicky Partridge</span></h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-8">Owner of Street Organics</p>
          
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              I’m so pleased you’ve found us! We opened on 11 January 2017, with a great crew, passionate about quality, organic whole foods, real customer service and caring for our planet with sustainable practices.
            </p>
            <p>
              Our beautiful café was born from a genuine love of serving people and a deep appreciation of the benefits of organic, real food. I describe myself as a US-born, Aussie-raised, Kiwi Girl, and I’ve called New Zealand home since 2009.
            </p>
            <p>
              I’m a hospo girl from way back – from Hilton Hotels to a pivot into the fitness industry in 2002, where I learned the importance of nutrition and a balanced lifestyle. Now, I’m fulfilling a life-long dream with a talented, dedicated team.
            </p>
            
            {/* Highlight Section */}
            <div className="bg-emerald-50 p-6 rounded-2xl border-l-4 border-emerald-600 mt-8">
              <h4 className="font-black text-gray-900 uppercase mb-2">A Touch of History</h4>
              <p className="italic text-emerald-900 text-base">
                "Jars from my grandmother’s pantry became lights in my cafe. Nannie lived to nearly 110 and her simple, delicious cooking is one of my great memories. You’ll find her empty jars hanging above the bar leaner – a little bit of her inspiration with me always."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MenuSection = ({ onAddToCart }) => {
  const categories = ['All', 'Bowls', 'Coffee & Drinks', 'Sweets', 'Breakfast'];
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const menuItems = [
    { id: 1, name: "Super Green Bowl", price: 18.50, category: "Bowls", desc: "Kale, quinoa, avocado, hemp seeds, lemon tahini dressing.", popular: true },
    { id: 6, name: "Buddha Bowl", price: 17.50, category: "Bowls", desc: "Roasted sweet potato, chickpeas, spinach, and beet kraut.", popular: true },
    { id: 10, name: "Mexican Fiesta Bowl", price: 19.50, category: "Bowls", desc: "Brown rice, black beans, corn salsa, guacamole, coconut yogurt." },
    { id: 11, name: "Organic Flat White", price: 5.50, category: "Coffee & Drinks", desc: "Certified organic fair-trade house blend. Silky micro-foam.", popular: true },
    { id: 18, name: "Organic Latte", price: 5.50, category: "Coffee & Drinks", desc: "Double shot of espresso with steamed velvety milk." },
    { id: 19, name: "Cappuccino", price: 5.50, category: "Coffee & Drinks", desc: "Dusting of organic raw cacao over thick froth." },
    { id: 14, name: "Long Black", price: 5.00, category: "Coffee & Drinks", desc: "Double shot of organic espresso over hot filtered water." },
    { id: 20, name: "Dirty Chai Latte", price: 6.50, category: "Coffee & Drinks", desc: "Organic chai spices with a single shot of espresso." },
    { id: 21, name: "Mocha", price: 6.00, category: "Coffee & Drinks", desc: "House organic coffee blended with premium raw cacao." },
    { id: 5, name: "Turmeric Latte", price: 6.00, category: "Coffee & Drinks", desc: "House blend of ginger, turmeric, and cinnamon with oat milk." },
    { id: 15, name: "Organic Matcha Latte", price: 6.50, category: "Coffee & Drinks", desc: "Ceremonial grade matcha with steamed coconut milk." },
    { id: 2, name: "Acai Energy Blast", price: 14.00, category: "Coffee & Drinks", desc: "Organic acai, blueberries, banana, almond milk, maca powder." },
    { id: 12, name: "Immunity Cold Pressed Juice", price: 9.50, category: "Coffee & Drinks", desc: "Orange, carrot, ginger, turmeric, and lemon." },
    { id: 13, name: "Ginger & Lemon Kombucha", price: 8.00, category: "Coffee & Drinks", desc: "Locally brewed, probiotic-rich fermented tea." },
    { id: 3, name: "Paleo Choc Brownie", price: 6.50, category: "Sweets", desc: "Refined sugar free, made with almond meal and raw cacao." },
    { id: 8, name: "Raw Snickers Slice", price: 7.50, category: "Sweets", desc: "Dates, peanuts, and raw chocolate. Vegan & GF." },
    { id: 16, name: "Lemon & Blueberry Muffin", price: 5.50, category: "Sweets", desc: "Gluten-free, dairy-free, and naturally sweetened." },
    { id: 4, name: "Truffle Mushrooms", price: 19.00, category: "Breakfast", desc: "Wild mushrooms on sourdough with truffle oil and poached eggs." },
    { id: 7, name: "Keto Omelette", price: 18.00, category: "Breakfast", desc: "Three egg omelette with spinach, feta, and pumpkin seeds." },
    { id: 17, name: "Overnight Oats", price: 14.50, category: "Breakfast", desc: "Soaked in almond milk with chia seeds and seasonal fruit compote." }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeTab === 'All' || item.category === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-24 bg-gray-50 min-h-[800px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase">Our Full Menu</h2>
          <div className="h-1 w-20 bg-emerald-600 mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-xl mx-auto italic">Explore our fresh, organic range of wholesome meals and specialty beverages.</p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search for coffee, bowls, or ingredients..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-100 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all text-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${activeTab === cat ? 'bg-emerald-600 text-white shadow-lg scale-105' : 'bg-white text-gray-500 hover:bg-emerald-50 border border-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start gap-4 border border-gray-100 group hover:border-emerald-200 hover:shadow-lg transition-all shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{item.name}</h4>
                    {item.popular && <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Popular</span>}
                  </div>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
                <div className="flex items-center sm:flex-col items-end gap-4 w-full sm:w-auto">
                  <span className="font-bold text-gray-900 text-lg whitespace-nowrap">${item.price.toFixed(2)}</span>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="bg-emerald-50 text-emerald-600 p-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 ml-auto sm:ml-0"
                  >
                    <Plus size={18} />
                    <span className="sm:hidden font-bold">Add</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No menu items match your search.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CateringDetails = () => (
  <section id="catering" className="py-24 bg-white">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm block mb-4">Elevate your Event</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 uppercase leading-tight">Organic Catering for <br/><span className="text-emerald-600">Every Occasion</span></h2>
          <div className="space-y-6 mb-10">
            {[
              { title: "Corporate Wellness", desc: "Boost team morale with nutritious office lunches." },
              { title: "Celebrations", desc: "Perfectly presented platters for birthdays and more." },
              { title: "Tailored Packages", desc: "Vegan, Keto, or Paleo? We customize menus to suit you." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="bg-emerald-100 p-2 rounded-full h-fit text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all uppercase text-sm tracking-widest flex items-center gap-2">
            Get a Quote <ArrowRight size={18} />
          </button>
        </div>
        <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
           <img src="https://images.unsplash.com/photo-1536392706976-e486e2ba474f?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover" alt="Platter 1" />
           <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=400" className="rounded-3xl h-64 w-full object-cover mt-12" alt="Platter 2" />
        </div>
      </div>
    </div>
  </section>
);

const ReservationSection = () => (
  <section id="reservations" className="py-24 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 uppercase">Table Reservations</h2>
        <div className="h-1 w-20 bg-emerald-600 mx-auto mb-6"></div>
        <p className="text-gray-500 max-w-xl mx-auto italic">Book your table online for breakfast or lunch at Street Organics Takapuna.</p>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden p-4 md:p-8 border border-gray-100">
        <iframe 
          src="https://booking.resdiary.com/widget/ThreeMonth/StreetOrganicsTakapuna/4669" 
          id="rd-widget-frame" 
          className="w-full min-h-[600px] border-0 rounded-2xl"
          allowtransparency="true"
        ></iframe>
      </div>
    </div>
  </section>
);

const LocationInfo = () => (
  <section id="locations" className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <span className="text-emerald-600 font-bold uppercase tracking-widest text-sm block mb-4">Our Home</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight uppercase">
            Heart of <br />
            <span className="text-emerald-600">Takapuna Village</span>
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 group">
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MapPin />
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">Location</h5>
                <p className="text-gray-600 leading-relaxed">Shop 2, 4-10 Hurstmere Road<br />Takapuna, Auckland 0622</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Clock />
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">Hours</h5>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-gray-600">
                  <span>Mon - Fri</span><span>7:30am - 4:00pm</span>
                  <span>Sat - Sun</span><span>8:00am - 4:00pm</span>
                </div>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Phone />
              </div>
              <div>
                <h5 className="font-bold text-lg mb-1">Ring Us</h5>
                <p className="text-gray-600">09 486 3313</p>
                <p className="text-emerald-600 font-medium">hello@streetorganics.co.nz</p>
              </div>
            </div>
          </div>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noreferrer"
            className="mt-12 inline-flex bg-gray-900 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all items-center gap-2"
          >
            Get Directions <ChevronRight size={18} />
          </a>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="aspect-square bg-emerald-100 rounded-[60px] relative overflow-hidden transform rotate-3 scale-95">
             <img 
               src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000" 
               className="w-full h-full object-cover -rotate-3 scale-110"
               alt="Restaurant interior"
             />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl max-w-xs hidden sm:block">
            <div className="flex text-orange-400 mb-2 gap-1">
               {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-gray-700 italic font-medium mb-4">"Best organic coffee and healthy treats in Auckland. A daily ritual!"</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">— Sarah Johnson</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CartDrawer = ({ isOpen, onClose, cart, updateQty, removeItem }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-xl font-black uppercase tracking-tight">Your Order</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400">Your bag is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-emerald-600 font-bold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-white rounded transition-colors"><Minus size={14} /></button>
                  <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-white rounded transition-colors"><Plus size={14} /></button>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-6 border-t bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-xl font-black">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg uppercase tracking-widest text-sm">
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, {...product, qty: 1}];
    });
    setIsCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return {...item, qty: newQty};
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900 scroll-smooth">
      <Navbar scrolled={scrolled} cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQty={updateQty} removeItem={removeItem} />
      <main>
        <Hero />
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
            {[
              { icon: Leaf, title: "100% Organic", desc: "No chemicals, just nature. We prioritize certified ingredients." },
              { icon: Heart, title: "Dietary Conscious", desc: "Specializing in GF, Keto, Vegan and Paleo." },
              { icon: ShoppingBag, title: "Zero Waste Shop", desc: "Our bulk store allows you to refill and reduce waste." }
            ].map((f, i) => (
              <div key={i} className="group">
                <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <OurStory />
        <MenuSection onAddToCart={addToCart} />
        <CateringDetails />
        <ReservationSection />
        <LocationInfo />
      </main>
      <footer className="bg-gray-950 text-white pt-24 pb-12">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Street Organics NZ.</p>
        </div>
      </footer>
    </div>
  );
}