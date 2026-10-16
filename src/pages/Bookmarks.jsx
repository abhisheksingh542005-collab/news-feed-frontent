import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axios.js';
import Navbar from '../components/Navbar.jsx';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  

  const fetchBookmarks = async () => {
    try {
      const response = await axiosClient.get('/bookmarks');
      return setBookmarks(response.data || []);
    } catch (err) {
      console.error('Error loading bookmarks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axiosClient.delete(`/bookmarks/${id}`);
      return setBookmarks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert('Failed to remove bookmark.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Saved Bookmarks</h1>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Your curated collection of saved stories and tech news
            </p>
          </div>

          <div className="text-xs font-semibold px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 w-fit">
            {bookmarks.length} {bookmarks.length === 1 ? 'Article Saved' : 'Articles Saved'}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
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
        ) : bookmarks.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200">No bookmarks saved yet</h3>
            <p className="text-slate-400 text-xs mt-1 max-w-sm">
              Head over to the news feed and tap the bookmark icon on any article to save it for later reading.
            </p>
          </div>
        ) : (
          /* Grid of Saved Bookmarks */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((article) => (
              <div
                key={article._id || article.url}
                className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 rounded-3xl p-6 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/5 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {article.description || article.content || 'No detailed description available.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 group/link"
                  >
                    <span>Read Article</span>
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>

                  <button
                    onClick={() => handleRemoveBookmark(article._id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    title="Remove Bookmark"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

  

export default Bookmarks;