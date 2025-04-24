/**
 * @file MovieCard.tsx
 * @description Movie card component that displays basic movie information and shows a tooltip with details on hover.
 * Implements lazy loading, error handling, and accessibility features.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import type { IMovie, IMovieDetails } from '../types/movie.types';
import { MovieTooltip } from './MovieTooltip';
import { useMovieDetails } from '../hooks/useMovieDetails';
import styles from './MovieCard.module.scss';

/**
 * @description Props interface for the MovieCard component
 * @interface MovieCardProps
 */
interface MovieCardProps {
  /** Movie data to display */
  movie: IMovie;
  /** Callback function when the card is clicked */
  onClick: (movieId: string) => void;
}

/**
 * @description Movie card component that displays movie information
 * Features:
 * - Displays movie poster, title, year, and type
 * - Shows tooltip with detailed information on hover
 * - Handles image loading errors
 * - Implements keyboard navigation
 * - Uses lazy loading for images
 * - Memoized for performance
 * 
 * @component
 * @param {MovieCardProps} props - Component props
 * @returns {JSX.Element} Movie card component
 */
export const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie, onClick }) => {
  /** State for tracking hover status */
  const [isHovered, setIsHovered] = useState(false);
  /** State for tracking image loading errors */
  const [imageError, setImageError] = useState(false);
  /** Reference for hover timeout */
  const hoverTimeoutRef = useRef<number | null>(null);
  /** Hook for fetching movie details */
  const { details, loading, error } = useMovieDetails(isHovered ? movie.imdbID : null);

  /**
   * @description Cleanup effect for hover timeout
   * Ensures timeout is cleared when component unmounts
   */
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  /**
   * @description Handler for mouse enter event
   * Immediately sets hover state to true
   */
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(true);
  }, []);

  /**
   * @description Handler for mouse leave event
   * Delays setting hover state to false to prevent flickering
   */
  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsHovered(false);
      hoverTimeoutRef.current = null;
    }, 100);
  }, []);

  /**
   * @description Handler for click event
   * Calls the onClick prop with the movie ID
   */
  const handleClick = useCallback(() => onClick(movie.imdbID), [movie.imdbID, onClick]);

  /**
   * @description Handler for keyboard events
   * Triggers click on Enter key
   */
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  }, [handleClick]);

  /**
   * @description Handler for image loading errors
   * Sets error state to show placeholder
   */
  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  /**
   * @description Memoized tooltip content
   * Shows loading state, movie details, or nothing based on hover and loading states
   */
  const tooltipContent = useMemo(() => {
    if (!isHovered) return null;
    return (
      <div className={styles.tooltipContainer}>
        {loading ? (
          <div className={styles.tooltipLoading}>
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className={`${styles.tooltipLoading} ${styles.error}`}>
            <span>{error}</span>
          </div>
        ) : details ? (
          <MovieTooltip movie={details} />
        ) : null}
      </div>
    );
  }, [isHovered, loading, error, details]);

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`${movie.Title} (${movie.Year})`}
    >
      <div className={styles.posterContainer}>
        {movie.Poster !== 'N/A' && !imageError ? (
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className={styles.poster}
            loading="lazy"
            onError={handleImageError}
          />
        ) : (
          <div className={styles.placeholder}>No image available</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{movie.Title}</h3>
        <p className={styles.year}>{movie.Year}</p>
        <p className={styles.type}>{movie.Type}</p>
      </div>
      {tooltipContent}
    </div>
  );
});

/** Display name for the component */
MovieCard.displayName = 'MovieCard'; 