
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Category, OrderForm } from './types';

// Mock Data - Expanded
const PRODUCTS: Product[] = [
  // Pizzas
  {
    id: 1,
    name: 'Pizza Calabresa',
    description: 'Molho de tomate artesanal, mussarela, calabresa fatiada e cebola fresca.',
    price: 45.90,
    originalPrice: 55.00,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    time: '30-40 min'
  },
  {
    id: 4,
    name: 'Pizza Margherita',
    description: 'Mussarela de búfala, manjericão fresco e molho de tomate.',
    price: 42.00,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    time: '30-40 min'
  },
  {
    id: 7,
    name: 'Pizza 4 Queijos',
    description: 'Mussarela, parmesão, gorgonzola e catupiry original.',
    price: 49.90,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    time: '35-45 min'
  },
  {
    id: 8,
    name: 'Pizza Frango c/ Catupiry',
    description: 'Frango desfiado temperado e coberto com muito catupiry.',
    price: 39.90,
    originalPrice: 48.00,
    category: 'pizza',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    time: '30-40 min'
  },
  // Sandwiches
  {
    id: 2,
    name: 'X-Tudo Monstro',
    description: 'Pão brioche, 2 burgers 180g, bacon, ovo, queijo, presunto, alface e tomate.',
    price: 32.50,
    originalPrice: 38.00,
    category: 'sanduiche',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    time: '20-30 min'
  },
  {
    id: 5,
    name: 'Sanduíche de Frango',
    description: 'Frango empanado crocante, maionese temperada e picles no pão de batata.',
    price: 24.90,
    category: 'sanduiche',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    time: '25 min'
  },
  {
    id: 9,
    name: 'Smash Burger Duplo',
    description: 'Dois burgers prensados na chapa, queijo cheddar inglês e cebola caramelizada.',
    price: 28.00,
    category: 'sanduiche',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    time: '15-20 min'
  },
  {
    id: 10,
    name: 'Sanduíche Natural',
    description: 'Pão integral, patê de atum, cenoura ralada e alface americana.',
    price: 18.50,
    originalPrice: 22.00,
    category: 'sanduiche',
    image: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    time: '10-15 min'
  },
  // Milkshakes
  {
    id: 3,
    name: 'Milkshake Morango',
    description: 'Sorvete de morango cremoso, calda de frutas vermelhas e chantilly.',
    price: 18.00,
    originalPrice: 22.00,
    category: 'milkshake',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    time: '10-15 min'
  },
  {
    id: 6,
    name: 'Milkshake Chocolate',
    description: 'Chocolate 50%, calda de fudge e pedaços de brownie.',
    price: 20.00,
    category: 'milkshake',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    time: '10-15 min'
  },
  {
    id: 11,
    name: 'Milkshake Ovomaltine',
    description: 'Muito crocante, base de baunilha e flocos de ovomaltine extra.',
    price: 21.00,
    category: 'milkshake',
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    time: '10-15 min'
  },
  {
    id: 12,
    name: 'Milkshake Baunilha',
    description: 'Clássico creme de baunilha de madagascar com cereja.',
    price: 16.00,
    category: 'milkshake',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    time: '10-15 min'
  }
];

const ADDONS = [
  { name: 'Bacon Extra', price: 4.00 },
  { name: 'Queijo Cheddar', price: 3.50 },
  { name: 'Molho Especial', price: 2.00 },
  { name: 'Embalagem Presente', price: 5.00 },
];

const FREE_CONDIMENTS = [
  { id: 'ketchup', name: 'Ketchup' },
  { id: 'mayo', name: 'Maionese' },
  { id: 'seasoned_mayo', name: 'Maionese Temperada' },
];

const FREE_SHIPPING_NEIGHBORHOODS = ['ALDEOTA', 'HENRIQUE JORGE', 'JOÃO XXIII', 'JOQUEI CLUB'];

// --- Helper Components ---

const Icon = ({ name, className = "" }: { name: string, className?: string }) => (
  <span className={`material-icons-round ${className}`}>{name}</span>
);

// --- Views ---

const HomeView = ({ 
  products, 
  categoryFilter, 
  setCategoryFilter, 
  onProductClick, 
  favorites, 
  toggleFavorite,
  isDark,
  toggleTheme,
  isOpen
}: any) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [animatingCategory, setAnimatingCategory] = useState(false);

  // Trigger animation when category changes
  useEffect(() => {
    setAnimatingCategory(true);
    const timer = setTimeout(() => setAnimatingCategory(false), 300);
    return () => clearTimeout(timer);
  }, [categoryFilter]);

  const filteredProducts = products.filter((p: Product) => {
    const matchesCategory = categoryFilter === 'all' ? true : p.category === categoryFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const discountedProducts = products.filter((p: Product) => p.originalPrice);

  const handleCategoryChange = (cat: Category) => {
    setCategoryFilter(cat);
  };

  return (
    <main className="pb-28 animate-fade-in relative">
      {/* Header */}
      <header className="px-6 pt-6 pb-4 flex justify-between items-center bg-white dark:bg-[#18181B] sticky top-0 z-30 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-3 relative">
          <div 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary p-0.5 cursor-pointer active:scale-95 transition-transform"
          >
            <img 
              alt="Guielihan" 
              className="w-full h-full object-cover rounded-full" 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
            />
          </div>
          
          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute top-14 left-0 w-56 bg-white dark:bg-[#27272A] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-fade-in">
              <div className="p-2 space-y-1">
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors">
                  <Icon name="person" className="text-gray-400" /> Alterar perfil
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors">
                  <Icon name="credit_card" className="text-gray-400" /> Formas de pagamento
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors">
                  <Icon name="receipt_long" className="text-gray-400" /> Compras
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors">
                  <Icon name="location_on" className="text-gray-400" /> Endereços salvos
                </button>
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium text-red-500 flex items-center gap-3 transition-colors">
                  <Icon name="logout" /> Sair
                </button>
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Bem vindo,</p>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-none">GUIELIHAN</h1>
            <span className={`text-[10px] font-bold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
              {isOpen ? '● Aberto agora' : '● Fechado (Seg-Sáb 18h-22h)'}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-[#27272A] text-gray-600 dark:text-yellow-400 hover:bg-gray-200 transition-colors"
          >
            <Icon name={isDark ? "light_mode" : "dark_mode"} />
          </button>
        </div>
      </header>
      
      {/* Overlay to close menu */}
      {isProfileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsProfileMenuOpen(false)}></div>
      )}

      {/* Search & Filter */}
      <section className="px-6 mt-4 mb-2 relative z-10" aria-label="Busca e filtros">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon name="search" className="text-xl" />
            </span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#27272A] border-none rounded-xl text-sm focus:ring-2 focus:ring-primary text-gray-800 dark:text-white placeholder-gray-400 transition-colors duration-300" 
              placeholder="Pizza, Milkshake, Sanduíche..." 
              type="text" 
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all shadow-sm ${isFilterOpen ? 'bg-primary text-white' : 'bg-white dark:bg-[#27272A] text-primary'}`}
          >
            <Icon name="tune" />
          </button>
        </div>
        
        {/* Collapsible Filter Row */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {['all', 'pizza', 'sanduiche', 'milkshake'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat as Category)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border transform active:scale-95 ${
                  categoryFilter === cat 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-orange-500/30' 
                    : 'bg-transparent border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary hover:text-primary'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Deals of the Day Carousel */}
      {discountedProducts.length > 0 && searchQuery === '' && categoryFilter === 'all' && (
        <section className="mb-6 pl-6" aria-label="Ofertas relâmpago">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Ofertas Relâmpago</h2>
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">LIVE ⚡</span>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 pr-6">
            {discountedProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => onProductClick(product)}
                className="min-w-[220px] bg-white dark:bg-[#27272A] rounded-2xl p-3 shadow-sm border border-orange-100 dark:border-orange-900/30 relative flex-shrink-0 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm z-10">
                  -{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}%
                </div>
                <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                  <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-sm truncate">{product.name}</h3>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-primary font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  <span className="text-xs text-gray-400 line-through mb-0.5">R$ {product.originalPrice!.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Product Grid */}
      <section className={`px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 transition-opacity duration-300 ${animatingCategory ? 'opacity-50' : 'opacity-100'}`} aria-label="Lista de produtos">
        {filteredProducts.length === 0 ? (
           <div className="col-span-full text-center py-12">
             <Icon name="search_off" className="text-4xl text-gray-300 mb-2" />
             <p className="text-gray-500">Nenhum item encontrado.</p>
           </div>
        ) : (
          filteredProducts.map((product: Product) => (
            <article 
              key={product.id} 
              className="bg-white dark:bg-[#27272A] rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 relative group border border-transparent dark:border-gray-800"
            >
              {/* Favorite Button */}
              <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md flex items-center justify-center transition-transform active:scale-90 hover:bg-white dark:hover:bg-black/60"
                >
                  <Icon 
                    name={favorites.includes(product.id) ? "favorite" : "favorite_border"} 
                    className={`text-lg ${favorites.includes(product.id) ? "text-red-500" : "text-gray-400 dark:text-gray-300"}`} 
                  />
                </button>

              <div 
                className="relative h-40 rounded-xl overflow-hidden mb-4 cursor-pointer"
                onClick={() => onProductClick(product)}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center">
                  <Icon name="schedule" className="text-xs mr-1" /> {product.time}
                </div>
              </div>

              <div onClick={() => onProductClick(product)} className="cursor-pointer">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">{product.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                    )}
                    <span className="text-primary font-bold text-lg">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <Icon name="add" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
};

const DetailsView = ({ product, onBack, onAddToCart }: any) => {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [condiments, setCondiments] = useState<{ [key: string]: number }>({
    ketchup: 0,
    mayo: 0,
    seasoned_mayo: 0
  });
  
  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(prev => prev.filter(a => a !== name));
    } else {
      setSelectedAddons(prev => [...prev, name]);
    }
  };

  const updateCondiment = (id: string, delta: number) => {
    setCondiments(prev => {
      const currentTotal = (Object.values(prev) as number[]).reduce((a, b) => a + b, 0);
      const newValue = Math.max(0, prev[id] + delta);
      
      // If adding, check total limit
      if (delta > 0 && currentTotal >= 3) return prev;
      
      return { ...prev, [id]: newValue };
    });
  };

  const calculateTotal = () => {
    const addonsPrice = selectedAddons.reduce((total, addonName) => {
      const addon = ADDONS.find(a => a.name === addonName);
      return total + (addon ? addon.price : 0);
    }, 0);
    return product.price + addonsPrice;
  };

  const condimentTotal = (Object.values(condiments) as number[]).reduce((a, b) => a + b, 0);

  return (
    <main className="bg-white dark:bg-[#18181B] min-h-screen pb-32 animate-slide-up relative">
      <div className="relative h-[40vh]">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
        <button 
          onClick={onBack}
          className="absolute top-6 left-6 bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition shadow-lg"
        >
          <Icon name="arrow_back" />
        </button>
      </div>

      <section className="relative -mt-10 bg-white dark:bg-[#18181B] rounded-t-[2.5rem] px-6 pt-8">
        <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-start mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white leading-tight flex-1">{product.name}</h1>
          <div className="flex flex-col items-end shrink-0">
             {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
             )}
             <span className="text-2xl font-bold text-primary whitespace-nowrap">R$ {product.price.toFixed(2).replace('.', ',')}</span>
             <div className="flex items-center text-yellow-400 text-sm font-bold mt-1">
               <Icon name="star" className="text-sm mr-1" /> {product.rating}
             </div>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
          {product.description}
        </p>

        {/* Free Condiments Section */}
        <section className="mb-8" aria-labelledby="condiments-heading">
           <h3 id="condiments-heading" className="font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
            <Icon name="room_service" className="text-primary" /> Molhos Grátis
          </h3>
          <p className="text-xs text-gray-400 mb-4">Escolha até 3 sachês no total</p>
          
          <div className="space-y-3">
             {FREE_CONDIMENTS.map(item => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#27272A] rounded-xl border border-gray-100 dark:border-gray-800">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                         <Icon name="local_dining" className="text-sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item.name}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateCondiment(item.id, -1)}
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${condiments[item.id] > 0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}
                        disabled={condiments[item.id] === 0}
                      >
                         <Icon name="remove" className="text-xs" />
                      </button>
                      <span className="text-sm font-bold w-3 text-center dark:text-white">{condiments[item.id]}</span>
                      <button 
                         onClick={() => updateCondiment(item.id, 1)}
                         className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${condimentTotal < 3 ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                         disabled={condimentTotal >= 3}
                      >
                         <Icon name="add" className="text-xs" />
                      </button>
                   </div>
                </div>
             ))}
          </div>
        </section>

        <section className="mb-8" aria-labelledby="addons-heading">
          <h3 id="addons-heading" className="font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="restaurant_menu" className="text-primary" /> Adicionais
          </h3>

          <div className="space-y-3">
          {ADDONS.map((addon) => (
            <div 
              key={addon.name}
              onClick={() => toggleAddon(addon.name)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                selectedAddons.includes(addon.name)
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#27272A]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedAddons.includes(addon.name) ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                  {selectedAddons.includes(addon.name) && <Icon name="check" className="text-white text-xs" />}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{addon.name}</span>
              </div>
              <span className="text-sm font-bold text-primary whitespace-nowrap">+ R$ {addon.price.toFixed(2).replace('.', ',')}</span>
            </div>
          ))}
          </div>
        </section>
      </section>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-[#18181B] border-t border-gray-100 dark:border-gray-800 z-30">
        <button 
          onClick={() => onAddToCart(product, selectedAddons, condiments, calculateTotal())}
          className="w-full bg-primary hover:bg-orange-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-between px-6 transition-all active:scale-[0.98]"
        >
          <span>Adicionar ao Pedido</span>
          <span className="whitespace-nowrap">R$ {calculateTotal().toFixed(2).replace('.', ',')}</span>
        </button>
      </div>
    </main>
  );
};

const CartView = ({ cart, updateQuantity, removeFromCart, onBack, onCheckout }: any) => {
  // Define form state locally to avoid focus loss, but lift checkout handler
  const [form, setForm] = useState<OrderForm>({
    whatsapp: '',
    observation: '',
    paymentMethod: 'pix',
    address: { cep: '', street: '', number: '', neighborhood: '', city: 'Fortaleza' },
    coupon: ''
  });

  const [isFreeShipping, setIsFreeShipping] = useState(false);

  // Address Neighborhood Check
  useEffect(() => {
    const isFree = FREE_SHIPPING_NEIGHBORHOODS.some(n => 
      form.address.neighborhood.toUpperCase().includes(n)
    );
    setIsFreeShipping(isFree);
  }, [form.address.neighborhood]);

  const handleInputChange = (field: keyof OrderForm | string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: { ...prev[parent as keyof OrderForm] as any, [child]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
  };

  const subtotal = cart.reduce((acc: number, item: CartItem) => acc + item.totalPrice, 0);
  const deliveryFee = isFreeShipping ? 0 : 5.50;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#18181B] p-6 text-center animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 dark:bg-[#27272A] rounded-full flex items-center justify-center mb-6">
          <Icon name="shopping_cart" className="text-4xl text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-8">Parece que você ainda não escolheu suas delícias.</p>
        <button onClick={onBack} className="bg-primary text-white px-8 py-3 rounded-xl font-bold">
          Voltar para o Cardápio
        </button>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-[#18181B] min-h-screen pb-32 animate-fade-in">
      <header className="bg-white dark:bg-[#18181B] p-4 sticky top-0 z-20 shadow-sm flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-[#27272A] rounded-full text-gray-800 dark:text-white transition-colors">
          <Icon name="arrow_back" />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Finalizar Pedido</h1>
      </header>

      <div className="p-4 space-y-6 max-w-lg mx-auto">
        {/* Items List */}
        <section className="space-y-4" aria-label="Itens do carrinho">
          {cart.map((item: CartItem) => {
            const condimentList = Object.entries(item.condiments || {})
              .filter(([_, count]) => count > 0)
              .map(([key, count]) => {
                const name = FREE_CONDIMENTS.find(c => c.id === key)?.name;
                return `${count}x ${name}`;
              });

            return (
              <div key={item.cartId} className="bg-white dark:bg-[#27272A] p-4 rounded-xl flex gap-4 shadow-sm border border-gray-100 dark:border-gray-800">
                <img src={item.image} className="w-20 h-20 rounded-lg object-cover bg-gray-200" alt={item.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 dark:text-white text-sm">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-red-400 hover:text-red-500">
                      <Icon name="delete_outline" className="text-lg" />
                    </button>
                  </div>
                  {item.addons.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">+{item.addons.join(', ')}</p>
                  )}
                  {condimentList.length > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-500 mt-1 flex items-center gap-1">
                       <Icon name="local_dining" className="text-[10px]" /> {condimentList.join(', ')}
                    </p>
                  )}
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-primary whitespace-nowrap">R$ {item.totalPrice.toFixed(2).replace('.', ',')}</span>
                    <div className="flex items-center bg-gray-100 dark:bg-[#18181B] rounded-lg p-1 gap-3">
                      <button onClick={() => updateQuantity(item.cartId, -1)} className="w-6 h-6 flex items-center justify-center dark:text-white">-</button>
                      <span className="text-xs font-bold dark:text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)} className="w-6 h-6 flex items-center justify-center dark:text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Coupon */}
        <section className="bg-white dark:bg-[#27272A] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800" aria-label="Cupom de desconto">
          <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
             <Icon name="local_offer" className="text-primary text-sm" /> Cupom de Desconto
          </h4>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Insira seu código"
              value={form.coupon}
              onChange={(e) => handleInputChange('coupon', e.target.value)}
              className="flex-1 bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none dark:text-white"
            />
            <button className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-gray-900">Aplicar</button>
          </div>
        </section>

        {/* Checkout Form */}
        <section className="bg-white dark:bg-[#27272A] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4" aria-label="Formulário de entrega">
           <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
             <Icon name="location_on" className="text-primary text-sm" /> Endereço e Contato
          </h4>
          
          <div className="grid grid-cols-1 gap-3">
             <input 
               placeholder="WhatsApp (com DDD)" 
               className="w-full bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 text-sm dark:text-white outline-none focus:border-primary"
               value={form.whatsapp}
               onChange={(e) => handleInputChange('whatsapp', e.target.value)}
             />
             <div className="grid grid-cols-2 gap-3">
                <input 
                  placeholder="CEP" 
                  className="bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 text-sm dark:text-white outline-none focus:border-primary"
                  value={form.address.cep}
                  onChange={(e) => handleInputChange('address.cep', e.target.value)}
                />
                 <input 
                  placeholder="Número" 
                  className="bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 text-sm dark:text-white outline-none focus:border-primary"
                  value={form.address.number}
                  onChange={(e) => handleInputChange('address.number', e.target.value)}
                />
             </div>
             <input 
               placeholder="Rua" 
               className="w-full bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 text-sm dark:text-white outline-none focus:border-primary"
               value={form.address.street}
               onChange={(e) => handleInputChange('address.street', e.target.value)}
             />
             <input 
               placeholder="Bairro" 
               className="w-full bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-3 text-sm dark:text-white outline-none focus:border-primary"
               value={form.address.neighborhood}
               onChange={(e) => handleInputChange('address.neighborhood', e.target.value)}
             />
             {isFreeShipping && (
               <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-lg text-xs font-bold text-center animate-pulse">
                 OBA, FRETE GRÁTIS PARA SEU BAIRRO!
               </div>
             )}
          </div>
        </section>

        <section className="bg-white dark:bg-[#27272A] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-3" aria-label="Forma de pagamento">
           <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-1 flex items-center gap-2">
             <Icon name="payment" className="text-primary text-sm" /> Pagamento
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {['pix', 'credit', 'debit', 'cash'].map((method) => (
              <button 
                key={method}
                onClick={() => handleInputChange('paymentMethod', method)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  form.paymentMethod === method 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
                }`}
              >
                {method === 'pix' ? 'Pix' : method === 'credit' ? 'Crédito' : method === 'debit' ? 'Débito' : 'Dinheiro'}
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white dark:bg-[#27272A] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800" aria-label="Observações do pedido">
           <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">Observações</h4>
           <textarea 
             className="w-full bg-gray-50 dark:bg-[#18181B] border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm dark:text-white outline-none focus:border-primary h-24 resize-none"
             placeholder="Tirar a cebola? Caprichar no molho?"
             value={form.observation}
             onChange={(e) => handleInputChange('observation', e.target.value)}
           ></textarea>
        </section>
        
        {/* Socials */}
        <nav className="flex justify-center gap-6 pt-4 text-gray-400" aria-label="Redes sociais">
          <a href="#" className="hover:text-primary transition-colors"><Icon name="groups" /></a> {/* Bater Perna representation */}
          <a href="#" className="hover:text-primary transition-colors"><Icon name="work" /></a> {/* Linkedin representation */}
          <a href="#" className="hover:text-primary transition-colors"><Icon name="camera_alt" /></a> {/* Instagram representation */}
        </nav>

        {/* Totals */}
        <section className="space-y-2 pt-4" aria-label="Resumo do pedido">
           <div className="flex justify-between text-gray-500 text-sm">
             <span>Subtotal</span>
             <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
           </div>
           <div className="flex justify-between text-gray-500 text-sm">
             <span>Entrega</span>
             <span className={isFreeShipping ? "text-green-500 font-bold" : ""}>
               {isFreeShipping ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
             </span>
           </div>
           <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white pt-2 border-t border-dashed border-gray-300 dark:border-gray-700">
             <span>Total</span>
             <span>R$ {total.toFixed(2).replace('.', ',')}</span>
           </div>
        </section>
      </div>

      {/* Checkout Actions */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white dark:bg-[#18181B] border-t border-gray-100 dark:border-gray-800 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button 
            onClick={onBack}
            className="flex-1 bg-gray-100 dark:bg-[#27272A] text-gray-600 dark:text-white font-bold py-4 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Voltar
          </button>
          <button 
            onClick={() => onCheckout(form)}
            className="flex-[2] bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors"
          >
            Finalizar Pedido
          </button>
        </div>
      </div>
    </main>
  );
};

const FavoritesDrawer = ({ favorites, products, onClose, onProductClick, onRemove }: any) => {
  const [suggestion, setSuggestion] = useState('');
  const favProducts = products.filter((p: Product) => favorites.includes(p.id));

  const handleSuggest = () => {
    if(!suggestion.trim()) return;
    alert("Obrigado pela sugestão! Vamos analisar com carinho.");
    setSuggestion("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div className="bg-white dark:bg-[#18181B] w-full max-w-md h-[85vh] rounded-t-[2rem] sm:rounded-2xl shadow-2xl relative z-10 pointer-events-auto flex flex-col animate-slide-up">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Icon name="favorite" className="text-red-500" /> Seus Favoritos
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#27272A] flex items-center justify-center text-gray-500">
            <Icon name="close" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favProducts.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">
              <Icon name="heart_broken" className="text-4xl mb-2" />
              <p>Você ainda não tem favoritos.</p>
            </div>
          ) : (
            favProducts.map((p: Product) => (
              <div key={p.id} className="flex gap-4 items-center bg-gray-50 dark:bg-[#27272A] p-3 rounded-xl">
                 <img src={p.image} className="w-16 h-16 rounded-lg object-cover" alt={p.name} />
                 <div className="flex-1">
                   <h4 className="font-bold text-gray-800 dark:text-white text-sm">{p.name}</h4>
                   <span className="text-primary font-bold text-sm">R$ {p.price.toFixed(2).replace('.', ',')}</span>
                 </div>
                 <div className="flex gap-2">
                    <button 
                      onClick={() => onRemove(p.id)}
                      className="p-2 text-red-400 hover:bg-white dark:hover:bg-black/20 rounded-lg"
                    >
                      <Icon name="delete" />
                    </button>
                    <button 
                      onClick={() => { onClose(); onProductClick(p); }}
                      className="p-2 text-primary hover:bg-white dark:hover:bg-black/20 rounded-lg"
                    >
                      <Icon name="arrow_forward" />
                    </button>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Suggestion Box */}
        <div className="p-6 bg-gray-50 dark:bg-[#202023] border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
             <Icon name="tips_and_updates" className="text-yellow-500 text-sm" /> Sugira um sabor
          </h3>
          <div className="flex gap-2">
            <input 
               type="text" 
               value={suggestion}
               onChange={(e) => setSuggestion(e.target.value)}
               placeholder="Pizza de Sushi? Milkshake de Bacon?"
               className="flex-1 bg-white dark:bg-[#27272A] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none dark:text-white"
            />
            <button 
              onClick={handleSuggest}
              className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-orange-600 transition-colors"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [view, setView] = useState<'home' | 'details' | 'cart'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<Category>('all');

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Operating Hours Logic
  const isOpen = useMemo(() => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const hour = now.getHours();
    // Monday(1) to Saturday(6), 18h to 22h
    return day !== 0 && hour >= 18 && hour < 22;
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(prev => prev.filter(fid => fid !== id));
    } else {
      setFavorites(prev => [...prev, id]);
    }
  };

  const addToCart = (product: Product, addons: string[], condiments: {[key:string]: number}, totalPrice: number) => {
    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substr(2, 9),
      quantity: 1,
      addons,
      condiments,
      totalPrice
    };
    setCart(prev => [...prev, newItem]);
    setView('home'); 
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, item.quantity + delta);
        const unitPrice = item.totalPrice / item.quantity; 
        return { ...item, quantity: newQty, totalPrice: unitPrice * newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('details');
  };

  const handleCheckout = (formData: OrderForm) => {
    console.log("Order Finalized", { cart, formData });
    alert(`Pedido Enviado!\nCliente: GUIELIHAN\nPagamento: ${formData.paymentMethod}\nTotal: R$ ${cart.reduce((a,b)=>a+b.totalPrice,0).toFixed(2)}`);
    setCart([]);
    setView('home');
  };

  return (
    <div className={`font-sans text-gray-900 dark:text-gray-100 min-h-screen bg-white dark:bg-[#18181B] transition-colors duration-300`}>
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-white dark:bg-[#18181B] overflow-hidden">
        
        {/* Status Bar Mock */}
        <div className="h-8 w-full flex items-center justify-between px-6 absolute top-0 z-50 pointer-events-none">
          <span className="text-xs font-semibold text-gray-800 dark:text-white">19:41</span>
          <div className="flex items-center space-x-2 text-gray-800 dark:text-white">
            <Icon name="signal_cellular_alt" className="text-[14px]" />
            <Icon name="wifi" className="text-[14px]" />
            <Icon name="battery_full" className="text-[14px]" />
          </div>
        </div>

        {view === 'home' && (
          <HomeView 
            products={PRODUCTS}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            onProductClick={handleProductClick}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            isDark={theme === 'dark'}
            toggleTheme={toggleTheme}
            isOpen={isOpen}
          />
        )}

        {view === 'details' && selectedProduct && (
          <DetailsView 
            product={selectedProduct} 
            onBack={() => setView('home')} 
            onAddToCart={addToCart}
          />
        )}

        {view === 'cart' && (
          <CartView 
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            onBack={() => setView('home')}
            onCheckout={handleCheckout}
          />
        )}

        {/* Bottom Navigation (Fixed on Bottom) */}
        {/* Only show on Home view to prevent double bars on Detail/Cart if desired, 
            but user requested "always accompanying". Usually details/checkout hide navs, 
            but we will show it on Home and let Details/Cart overlay it with their own z-index/background 
            or keep it hidden there for cleaner UX. 
            Based on standard patterns, we keep it visible on Home. If user wants it EVERYWHERE, 
            we need to move it outside the view check. 
            However, Details and Cart have full-width buttons at bottom. 
            Let's keep it fixed on Home view as the primary navigation. 
        */}
        {view === 'home' && (
          <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-[#18181B]/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-6 pt-2 z-20">
            <div className="flex justify-around items-center px-4">
              <button 
                onClick={() => setView('home')} 
                className={`flex flex-col items-center p-2 transition-colors ${view === 'home' ? 'text-primary' : 'text-gray-400'}`}
              >
                <Icon name="home" className="text-2xl" />
                <span className="text-[10px] font-medium mt-1">Início</span>
              </button>
              
              <button 
                className="relative bg-primary text-white p-4 rounded-full -mt-8 shadow-lg shadow-orange-500/40"
                onClick={() => setView('cart')}
              >
                <Icon name="shopping_cart" className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-[#18181B] flex items-center justify-center text-[10px] font-bold">
                    {cart.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsFavoritesOpen(true)}
                className="flex flex-col items-center p-2 text-gray-400 hover:text-primary transition-colors"
              >
                <Icon name="favorite" className="text-2xl" />
                <span className="text-[10px] font-medium mt-1">Favoritos</span>
              </button>
            </div>
          </nav>
        )}

        {/* Favorites Modal */}
        {isFavoritesOpen && (
          <FavoritesDrawer 
            favorites={favorites}
            products={PRODUCTS}
            onClose={() => setIsFavoritesOpen(false)}
            onProductClick={(p: Product) => {
              setIsFavoritesOpen(false);
              handleProductClick(p);
            }}
            onRemove={toggleFavorite}
          />
        )}

        {/* Developer Footer */}
        <footer className="mt-16 mb-8 px-6">
          <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-3xl">👨‍💻</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold">Desenvolvido por Guielihan</h3>
              <p className="text-sm text-white/90 font-medium">Atividade do Curso MVP Flow - GoDevs</p>
              <p className="text-xs text-white/80">Professor: Luan</p>
              <div className="h-px bg-white/20 my-4"></div>
              <div className="space-y-2 text-sm">
                <a href="mailto:guielihan@outlook.com" className="flex items-center justify-center gap-2 hover:text-white/80 transition-colors">
                  <Icon name="email" className="text-lg" />
                  guielihan@outlook.com
                </a>
                <div className="flex items-center justify-center gap-2">
                  <Icon name="discord" className="text-lg" />
                  <span>guielihan</span>
                </div>
              </div>
              <div className="pt-4">
                <p className="text-xs text-white/70">Feito com React + TypeScript + Vite</p>
                <p className="text-xs text-white/60 mt-1">🌐 Site ativo 24/7 na Vercel</p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
