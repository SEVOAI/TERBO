
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import MovieDetail from './components/MovieDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { INITIAL_MOVIES } from './constants';
import { Movie, AdminView } from './types';
import { Play, Info, Plus, Film } from 'lucide-react';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(INITIAL_MOVIES);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [adminView, setAdminView] = useState<AdminView>(AdminView.Main);

  useEffect(() => {
    let result = movies;
    if (activeCategory !== 'All') {
      result = result.filter(m => m.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(q) || 
        m.description.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }
    setFilteredMovies(result);
  }, [activeCategory, searchQuery, movies]);

  const handleAddMovie = (newMovie: Movie) => {
    setMovies(prev => [newMovie, ...prev]);
  };

  const handleDeleteMovie = (id: string) => {
    setMovies(prev => prev.filter(m => m.id !== id));
  };

  const heroMovie = movies[0];

  return (
    <div className="min-h-screen bg-black flex flex-col selection:bg-red-600 selection:text-white">
      <Navbar 
        onAdminClick={() => setAdminView(AdminView.Login)}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-grow">
        {heroMovie && activeCategory === 'All' && searchQuery === '' && (
          <section className="relative h-[50vh] md:h-[80vh] overflow-hidden">
            <img 
              src={heroMovie.thumbnail} 
              alt="Featured" 
              className="w-full h-full object-cover blur-sm opacity-50 absolute inset-0 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-end pb-8 md:pb-20">
              <div className="max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-3">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-lg">
                    HOT RELEASE
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500 font-black">
                    <span className="text-lg">★</span> {heroMovie.rating}
                  </div>
                </div>
                <h1 className="text-4xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic drop-shadow-2xl">
                  {heroMovie.title}
                </h1>
                <p className="text-zinc-300 text-sm md:text-xl line-clamp-2 max-w-2xl font-medium leading-relaxed hidden sm:block">
                  {heroMovie.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => setSelectedMovie(heroMovie)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all transform active:scale-95 shadow-xl text-sm md:text-lg uppercase tracking-widest"
                  >
                    <Play size={20} fill="currentColor" /> Play
                  </button>
                  <button className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl border border-white/10 px-6 md:px-10 py-3 md:py-4 rounded-xl font-black transition-all text-sm md:text-lg uppercase tracking-widest">
                    <Info size={20} /> Info
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">
          <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-red-600 rounded-full" />
              <h2 className="text-xl md:text-3xl font-black text-white uppercase italic tracking-tight">
                {searchQuery !== '' ? 'Results' : (activeCategory === 'All' ? 'Latest Content' : activeCategory)}
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
              <Film size={12} className="text-red-600" /> {filteredMovies.length} Videos
            </div>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
              {filteredMovies.map(movie => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onPlay={(m) => setSelectedMovie(m)} 
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 bg-zinc-900/10 rounded-3xl border-2 border-dashed border-zinc-900">
              <p className="text-zinc-500 text-xl font-black uppercase tracking-tighter italic">No results found</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-4 text-red-600 font-black uppercase tracking-widest text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-black border-t border-zinc-900 py-10 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black italic text-red-600 tracking-tighter uppercase drop-shadow-md">TERBO</h2>
        </div>
      </footer>

      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {adminView === AdminView.Login && (
        <AdminLogin 
          onSuccess={() => setAdminView(AdminView.Dashboard)} 
          onClose={() => setAdminView(AdminView.Main)}
        />
      )}

      {adminView === AdminView.Dashboard && (
        <AdminDashboard 
          movies={movies}
          onAddMovie={handleAddMovie}
          onDeleteMovie={handleDeleteMovie}
          onClose={() => setAdminView(AdminView.Main)}
        />
      )}
    </div>
  );
};

export default App;
