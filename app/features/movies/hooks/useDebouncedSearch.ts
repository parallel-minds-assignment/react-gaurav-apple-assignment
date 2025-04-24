/**
 * @file useDebouncedSearch.ts
 * @description Custom hook for implementing debounced movie search functionality.
 * Handles search state, pagination, loading states, and error handling.
 * Implements request cancellation and cleanup for better performance.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import pkg from 'lodash';
const { debounce } = pkg;
import type { IMovieSearchResponse } from '../types/movie.types';
import { omdbService } from '../services/omdbService';
import axios from 'axios';

/**
 * @description Custom hook for implementing debounced movie search
 * Features:
 * - Debounced search to reduce API calls
 * - Pagination support
 * - Loading and error state management
 * - Request cancellation
 * - Infinite scroll support
 * 
 * @param {number} [delay=300] - Debounce delay in milliseconds
 * @returns {Object} Search state and controls
 * @returns {string} query - Current search query
 * @returns {Function} setQuery - Function to update search query
 * @returns {IMovieSearchResponse | null} results - Search results
 * @returns {boolean} loading - Loading state indicator
 * @returns {string | null} error - Error message or null if no error
 * @returns {Function} loadMore - Function to load more results
 * @returns {boolean} hasMore - Indicates if more results are available
 */
export const useDebouncedSearch = (delay = 300) => {
  /** State for the current search query */
  const [query, setQuery] = useState('');
  /** State for storing search results */
  const [results, setResults] = useState<IMovieSearchResponse | null>(null);
  /** State for tracking loading status */
  const [loading, setLoading] = useState(false);
  /** State for storing error messages */
  const [error, setError] = useState<string | null>(null);
  /** State for tracking current page number */
  const [page, setPage] = useState(1);
  /** State for tracking if more results are available */
  const [hasMore, setHasMore] = useState(false);
  /** Reference to the current AbortController for request cancellation */
  const abortControllerRef = useRef<AbortController | null>(null);
  /** Reference to track if this is the initial load */
  const isInitialLoad = useRef(true);

  /**
   * @description Function to perform the actual movie search
   * Handles API requests, pagination, and state updates
   * 
   * @param {string} searchQuery - The search query
   * @param {number} [pageNum=1] - Page number for pagination
   */
  const searchMovies = useCallback(async (searchQuery: string, pageNum: number = 1) => {
    if (!searchQuery.trim()) {
      setResults(null);
      setHasMore(false);
      return;
    }

    // Abort previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const response = await omdbService.search(searchQuery, pageNum, abortController.signal);
      if (abortControllerRef.current === abortController) {
        if (response.Response === "False") {
          if (response.Error === "Request limit reached!") {
            setError('API rate limit reached. Please try again later.');
          } else {
            setError(response.Error || 'No results found');
          }
          setResults(null);
          setHasMore(false);
          return;
        }
        if (pageNum === 1) {
          setResults(response);
          isInitialLoad.current = false;
        } else {
          setResults(prev => ({
            ...response,
            Search: [...(prev?.Search || []), ...(response.Search || [])]
          }));
        }
        const totalResults = parseInt(response.totalResults, 10);
        setHasMore(!!response.Search?.length && totalResults > (pageNum * 10));
      }
    } catch (err) {
      if (abortControllerRef.current === abortController && !axios.isCancel(err)) {
        if (axios.isAxiosError(err)) {
          if (err.response?.data?.Error) {
            setError(err.response.data.Error);
          } else if (err.response?.status === 401) {
            setError('API key is invalid or missing. Please contact support.');
          } else if (err.response?.status === 429) {
            setError('API rate limit reached. Please try again later.');
          } else {
            setError('Failed to fetch movies. Please try again.');
          }
        } else {
          setError('Failed to fetch movies. Please try again.');
        }
        setResults(null);
        setHasMore(false);
      }
    } finally {
      // Only update loading state if this is still the current request
      if (abortControllerRef.current === abortController) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * @description Debounced version of the search function
   * Delays the search execution to reduce API calls
   */
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      setPage(1);
      setHasMore(false);
      isInitialLoad.current = true;
      searchMovies(searchQuery, 1);
    },
    [searchMovies]
  );

  const debouncedSearchFn = useMemo(
    () => debounce(debouncedSearch, delay),
    [debouncedSearch, delay]
  );

  /**
   * @description Function to load more results
   * Handles pagination and infinite scroll
   */
  const loadMore = useCallback(() => {
    if (!loading && hasMore && query && !isInitialLoad.current) {
      const nextPage = page + 1;
      setPage(nextPage);
      searchMovies(query, nextPage);
    }
  }, [loading, hasMore, query, page, searchMovies]);

  /**
   * @description Effect hook for managing search execution
   * Handles:
   * - Debounced search execution
   * - State cleanup
   * - Request cancellation
   */
  useEffect(() => {
    if (query) {
      debouncedSearchFn(query);
    } else {
      setResults(null);
      setPage(1);
      setHasMore(false);
      isInitialLoad.current = true;
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, debouncedSearchFn]);

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    loadMore,
    hasMore
  };
}; 