import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axios.js';
import Navbar from '../components/Navbar';

const NewsFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNews = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axiosClient.get('/news/top-headlines');
      setNews(response.data?.data || response.data?.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setErrorMessage('Failed to load news headlines. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleBookmark = async (article) => {
    try {
      await axiosClient.post('/news/bookmarks', article);
      alert('Article saved to bookmarks!');
    } catch (err) {
      console.error("Bookmark error:", err);
    }
  };

  const filteredNews = news.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Top Headlines</h1>
            <p className="text-slate-400 text-sm mt-1">Discover real-time technology news and insights</p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
            <svg className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-slate-900/50 border border-slate-800/60 rounded-3xl p-6 animate-pulse h-64 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-800/60 rounded w-full"></div>
                  <div className="h-3 bg-slate-800/60 rounded w-5/6"></div>
                </div>
                <div className="h-8 bg-slate-800 rounded-xl w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, idx) => (
              <div
                key={idx}
                className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {article.description || article.content || "No detailed description available for this headline."}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 group/link"
                  >
                    <span>Read Story</span>
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  <button
                    onClick={() => handleBookmark(article)}
                    className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 rounded-xl transition-all"
                    title="Save Bookmark"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default NewsFeed;