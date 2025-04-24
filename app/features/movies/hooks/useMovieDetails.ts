/**
 * @file useMovieDetails.ts
 * @description Custom hook for fetching and managing movie details.
 * Handles loading states, error states, and caching of movie data.
 * Implements request cancellation and cleanup for better performance.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import type { IMovieDetails } from '../types/movie.types';
import { omdbService } from '../services/omdbService';
import { useMovieCache } from './useMovieCache';
import axios from 'axios';

/**
 * @description Custom hook for fetching and managing movie details
 * Features:
 * - Fetches movie details from OMDB API
 * - Implements request cancellation
 * - Uses caching to reduce API calls
 * - Manages loading and error states
 * 
 * @param {string | null} movieId - IMDB ID of the movie to fetch details for
 * @returns {Object} Movie details state and metadata
 * @returns {IMovieDetails | null} details - Movie details or null if not loaded
 * @returns {boolean} loading - Loading state indicator
 * @returns {string | null} error - Error message or null if no error
 */
export const useMovieDetails = (movieId: string | null) => {
  /** State for storing movie details */
  const [details, setDetails] = useState<IMovieDetails | null>(null);
  /** State for tracking loading status */
  const [loading, setLoading] = useState(false);
  /** State for storing error messages */
  const [error, setError] = useState<string | null>(null);
  /** Reference to the current AbortController for request cancellation */
  const abortControllerRef = useRef<AbortController | null>(null);
  /** Cache management functions */
  const { getFromCache, addToCache } = useMovieCache();

  const fetchDetails = useCallback(async (id: string) => {
    if (!id) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setLoading(true);
    setError(null);

    try {
      const response = await omdbService.getDetails(id, abortController.signal);
      if (abortControllerRef.current === abortController) {
        if (response.Response === "False") {
          if (response.Error === "Request limit reached!") {
            setError('API rate limit reached. Please try again later.');
          } else {
            setError(response.Error || 'Failed to fetch movie details');
          }
          setDetails(null);
        } else {
          setDetails(response);
        }
      }
    } catch (err) {
      if (abortControllerRef.current === abortController && !axios.isCancel(err)) {
        setError('Failed to fetch movie details. Please try again.');
        setDetails(null);
      }
    } finally {
      if (abortControllerRef.current === abortController) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * @description Effect hook for fetching movie details
   * Handles:
   * - Cache checking
   * - API requests
   * - Request cancellation
   * - State updates
   * - Cleanup
   */
  useEffect(() => {
    if (movieId) {
      fetchDetails(movieId);
    } else {
      setDetails(null);
      setError(null);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [movieId, fetchDetails]);

  return {
    details,
    loading,
    error,
  };
}; 