/**
 * @file movie.types.ts
 * @description Type definitions for movie-related data structures and API interfaces.
 * Contains interfaces for movie data, search responses, and API contracts.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

/**
 * @description Basic movie information interface
 * Represents the core movie data returned from search results
 * 
 * @interface IMovie
 */
export interface IMovie {
  /** Unique identifier from IMDB */
  imdbID: string;
  /** Title of the movie */
  Title: string;
  /** Release year of the movie */
  Year: string;
  /** Type of media (movie, series, etc.) */
  Type: string;
  /** URL to the movie poster image */
  Poster: string;
}

/**
 * @description Extended movie information interface
 * Contains detailed information about a specific movie
 * Extends the basic IMovie interface with additional fields
 * 
 * @interface IMovieDetails
 * @extends IMovie
 */
export interface IMovieDetails extends IMovie {
  /** Movie's rating (PG, R, etc.) */
  Rated: string;
  /** Release date */
  Released: string;
  /** Duration of the movie */
  Runtime: string;
  /** Genres the movie belongs to */
  Genre: string;
  /** Director(s) of the movie */
  Director: string;
  /** Writer(s) of the movie */
  Writer: string;
  /** Main actors in the movie */
  Actors: string;
  /** Plot summary */
  Plot: string;
  /** Languages the movie is available in */
  Language: string;
  /** Country of origin */
  Country: string;
  /** Awards received */
  Awards: string;
  /** Array of ratings from different sources */
  Ratings: {
    /** Source of the rating (e.g., "Internet Movie Database") */
    Source: string;
    /** Rating value from the source */
    Value: string;
  }[];
  /** Metacritic score */
  Metascore: string;
  /** IMDB rating */
  imdbRating: string;
  /** Number of IMDB votes */
  imdbVotes: string;
  /** DVD release date */
  DVD: string;
  /** Box office earnings */
  BoxOffice: string;
  /** Production company */
  Production: string;
  /** Official website */
  Website: string;
  /** API response status */
  Response: string;
  /** Error message if the request failed */
  Error?: string;
}

/**
 * @description Interface for movie search API response
 * Contains the search results and metadata
 * 
 * @interface IMovieSearchResponse
 */
export interface IMovieSearchResponse {
  /** Array of movie search results */
  Search: IMovie[];
  /** Total number of results available */
  totalResults: string;
  /** API response status */
  Response: string;
  /** Error message if the request failed */
  Error?: string;
}

/**
 * @description Interface for movie API service
 * Defines the contract for movie-related API operations
 * 
 * @interface IMovieApi
 */
export interface IMovieApi {
  /**
   * @description Search for movies by query
   * @returns {Promise<IMovieSearchResponse>} Search results
   */
  search: () => Promise<IMovieSearchResponse>;

  /**
   * @description Get detailed information about a specific movie
   * @returns {Promise<IMovieDetails>} Detailed movie information
   */
  getDetails: () => Promise<IMovieDetails>;
} 