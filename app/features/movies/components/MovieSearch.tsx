/**
 * @file MovieSearch.tsx
 * @description Main search component for the movie search application.
 * Handles movie search functionality, infinite scrolling, and movie details display.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import React, { useMemo, useRef, useEffect } from 'react';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';
import { MovieCard } from './MovieCard';
import styles from './MovieSearch.module.scss';

/**
 * @description MovieSearch component
 * Features:
 * - Search input with debounced search functionality
 * - Infinite scrolling with intersection observer
 * - Movie grid display with MovieCard components
 * - Loading states and error handling
 * 
 * @component
 * @returns {JSX.Element} The rendered MovieSearch component
 */
export const MovieSearch: React.FC = () => {
  // Custom hooks for search functionality
  const { query, setQuery, results, loading, error, loadMore, hasMore } = useDebouncedSearch();
  
  // Refs for infinite scrolling implementation
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /**
   * @description Memoized list of MovieCard components
   * Renders a MovieCard for each movie in the search results
   */
  const movieList = useMemo(() => {
    if (!results?.Search) return null;
    return results.Search.map((movie) => (
      <MovieCard
        key={movie.imdbID}
        movie={movie}
      />
    ));
  }, [results?.Search]);

  /**
   * @description Sets up intersection observer for infinite scrolling
   * Triggers loadMore when the loadMoreRef element is visible
   */
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || loading) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        loadMore();
      }
    }, options);

    observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, loading]);

  // Determine if we should show the "no results" message
  const showNoResults = !loading && query && results && results.Response === "False" && (!results.Search || results.Search.length === 0) && !movieList;

  return (
    <div className={styles.container}>
      {/* Search input section */}
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies..."
            className={styles.searchInput}
            aria-label="Search for movies"
          />
          {loading && <div className={styles.loadingSpinner} />}
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>

      {/* Movie grid section */}
      <div className={styles.moviesGrid}>
        {showNoResults && (
          <div className={styles.noResults}>
            No movies found for "{query}"
          </div>
        )}
        {movieList}
        {hasMore && <div ref={loadMoreRef} className={styles.loadMoreTrigger} />}
        {loading && hasMore && results?.Search && results.Search.length > 0 && (
          <div className={styles.loadingMore}>Loading more movies</div>
        )}
      </div>
    </div>
  );
}; 