import { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ArticleDetail from './components/ArticleDetail';
import CategoryView from './components/CategoryView';
import { type Article } from './lib/supabase';

type View = 'home' | 'article' | 'category';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleNavigate = (target: View, category?: string) => {
    if (target === 'home') {
      setView('home');
      setActiveCategory(null);
    } else if (target === 'category' && category) {
      setView('category');
      setActiveCategory(category);
    } else if (target === 'article') {
      setView('article');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={view}
        onNavigate={handleNavigate}
        activeCategory={activeCategory}
      />
      <main>
        {view === 'home' && (
          <HomeView
            onArticleClick={handleArticleClick}
            onCategoryClick={(cat) => handleNavigate('category', cat)}
          />
        )}
        {view === 'article' && selectedArticle && (
          <ArticleDetail
            article={selectedArticle}
            onBack={() => {
              setView('home');
              setActiveCategory(null);
            }}
            onArticleClick={handleArticleClick}
          />
        )}
        {view === 'category' && activeCategory && (
          <CategoryView
            category={activeCategory}
            onBack={() => {
              setView('home');
              setActiveCategory(null);
            }}
            onArticleClick={handleArticleClick}
          />
        )}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-bold text-gray-900">
                Berita<span className="text-red-600">Nusantara</span>
              </h4>
              <p className="text-sm text-gray-500 mt-1">Portal berita terpercaya Indonesia</p>
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BeritaNusantara. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
