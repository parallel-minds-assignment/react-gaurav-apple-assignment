/**
 * @file omdbService.ts
 * @description Service implementation for interacting with the OMDB API.
 * Provides methods for searching movies and fetching movie details.
 * Implements the IMovieApi interface.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { IMovieApi, IMovieDetails, IMovieSearchResponse } from '../types/movie.types';

/** OMDB API key from environment variables */
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
/** Base URL for the OMDB API */
const BASE_URL = 'http://www.omdbapi.com/';

/**
 * @description Service class for interacting with the OMDB API
 * Implements the IMovieApi interface and provides methods for:
 * - Searching movies by title
 * - Fetching detailed movie information
 * 
 * @class OMDBService
 * @implements {IMovieApi}
 */
class OMDBService implements IMovieApi {
  /**
   * @description Axios instance configured with base URL and API key
   * @private
   */
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
      apikey: API_KEY,
    },
  });

  /**
   * @description Search for movies by title
   * Makes a GET request to the OMDB API with the search query
   * Supports pagination and request cancellation
   * 
   * @param {string} query - Search term
   * @param {number} [page=1] - Page number for pagination
   * @param {AbortSignal} [signal] - Optional AbortSignal for request cancellation
   * @returns {Promise<IMovieSearchResponse>} Search results
   * @throws {Error} If the API request fails
   */
  async search(query: string, page: number = 1, signal?: AbortSignal): Promise<IMovieSearchResponse> {
    try {
      const config: AxiosRequestConfig = {
        params: { 
          s: query,
          page: page.toString()
        },
        signal,
      };
      
      const response = await this.axiosInstance.get<IMovieSearchResponse>('', config);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
      } else {
        console.error('Error searching movies:', error);
      }
      throw error;
    }
  }

  /**
   * @description Get detailed information about a specific movie
   * Makes a GET request to the OMDB API with the movie ID
   * Includes full plot information and supports request cancellation
   * 
   * @param {string} id - IMDB ID of the movie
   * @param {AbortSignal} [signal] - Optional AbortSignal for request cancellation
   * @returns {Promise<IMovieDetails>} Detailed movie information
   * @throws {Error} If the API request fails
   */
  async getDetails(id: string, signal?: AbortSignal): Promise<IMovieDetails> {
    try {
      const config: AxiosRequestConfig = {
        params: { i: id, plot: 'full' },
        signal,
      };

      const response = await this.axiosInstance.get<IMovieDetails>('', config);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled:', error.message);
      } else {
        console.error('Error fetching movie details:', error);
      }
      throw error;
    }
  }
}

/** Singleton instance of the OMDBService */
export const omdbService = new OMDBService(); 