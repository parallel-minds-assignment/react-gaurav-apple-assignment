/**
 * @file useMovieCache.ts
 * @description Custom hook for managing a cache of movie details.
 * Provides functions for getting, adding, removing, and clearing cached movie data.
 * Uses an in-memory cache to reduce API calls and improve performance.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import type { IMovieDetails } from '../types/movie.types';

/**
 * @description In-memory cache for storing movie details
 * Uses movie ID as the key and IMovieDetails as the value
 * @private
 */
const movieDetailsCache: Record<string, IMovieDetails> = {};

/**
 * @description Custom hook for managing movie details cache
 * Provides methods for:
 * - Retrieving movie details from cache
 * - Adding movie details to cache
 * - Removing movie details from cache
 * - Clearing the entire cache
 * 
 * @returns {Object} Cache management functions
 * @returns {Function} getFromCache - Get movie details from cache
 * @returns {Function} addToCache - Add movie details to cache
 * @returns {Function} removeFromCache - Remove movie details from cache
 * @returns {Function} clearCache - Clear all cached movie details
 */
export const useMovieCache = () => {
  /**
   * @description Retrieve movie details from cache by ID
   * @param {string} movieId - IMDB ID of the movie
   * @returns {IMovieDetails | null} Cached movie details or null if not found
   */
  const getFromCache = (movieId: string): IMovieDetails | null => {
    return movieDetailsCache[movieId] || null;
  };

  /**
   * @description Add movie details to the cache
   * @param {string} movieId - IMDB ID of the movie
   * @param {IMovieDetails} details - Movie details to cache
   */
  const addToCache = (movieId: string, details: IMovieDetails) => {
    movieDetailsCache[movieId] = details;
  };

  /**
   * @description Remove movie details from cache by ID
   * @param {string} movieId - IMDB ID of the movie to remove
   */
  const removeFromCache = (movieId: string) => {
    delete movieDetailsCache[movieId];
  };

  /**
   * @description Clear all movie details from the cache
   */
  const clearCache = () => {
    Object.keys(movieDetailsCache).forEach(key => {
      delete movieDetailsCache[key];
    });
  };

  return {
    getFromCache,
    addToCache,
    removeFromCache,
    clearCache,
  };
}; 