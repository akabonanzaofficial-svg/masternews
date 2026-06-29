import { useState } from 'react';
import { Menu, X, Newspaper, Search, TrendingUp } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'article' | 'category';
  onNavigate: (view: 'home' | 'article' | 'category', category?: string) => void;
  activeCategory: string | null;
}

const categories = [
  'Politik',
  'Teknologi',
  'Olahraga',
  'Hiburan',
  'Bisnis',
  'Kesehatan',
  'Wisata',
];

export default function Header({ currentView, onNavigate, activeCategory }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-red-600 p-1.5 rounded">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900 leading-tight">
                Berita<span className="text-red-600">Nusantara</span>
              </h1>
              <p className="text-[10px] text-gray-500 tracking-widest uppercase font-medium">Portal Berita Indonesia</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home' && !activeCategory
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Beranda
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onNavigate('category', cat)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari berita..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const target = e.target as HTMLInputElement;
                    onNavigate('home');
                    // Search would filter on home
                    setSearchOpen(false);
                    target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => { onNavigate('home'); setMobileOpen(false); }}
              className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Beranda
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { onNavigate('category', cat); setMobileOpen(false); }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeCategory === cat ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
