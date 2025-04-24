/**
 * @file MovieTooltip.tsx
 * @description Tooltip component that displays detailed movie information.
 * Includes a star rating component and director information.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import React, { useMemo } from 'react';
import type { IMovieDetails } from '../types/movie.types';
import styles from './MovieTooltip.module.scss';

/**
 * @description Props interface for the MovieTooltip component
 * @interface MovieTooltipProps
 */
interface MovieTooltipProps {
  /** Movie details to display in the tooltip */
  movie: IMovieDetails;
}

/**
 * @description Star rating component that displays a visual representation of the movie's rating
 * Features:
 * - Handles ratings from 0 to 10
 * - Supports half-star ratings
 * - Shows empty stars for remaining points
 * - Displays the numerical rating
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} props.rating - Movie rating as a string (e.g., "7.5")
 * @returns {JSX.Element} Star rating component
 */
const StarRating: React.FC<{ rating: string }> = React.memo(({ rating }) => {
  /**
   * @description Calculates the number of full stars, half stars, and empty stars
   * Handles edge cases like missing or invalid ratings
   * 
   * @returns {Object} Star configuration
   * @returns {number} fullStars - Number of full stars to display
   * @returns {boolean} hasHalfStar - Whether to show a half star
   * @returns {number} emptyStars - Number of empty stars to display
   */
  const stars = useMemo(() => {
    // Handle invalid or missing ratings
    if (!rating || rating === 'N/A') {
      return {
        fullStars: 0,
        hasHalfStar: false,
        emptyStars: 10
      };
    }

    const numRating = parseFloat(rating);
    // Ensure rating is between 0 and 10
    const clampedRating = Math.min(Math.max(numRating, 0), 10);
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;
    const emptyStars = 10 - fullStars - (hasHalfStar ? 1 : 0);

    return {
      fullStars,
      hasHalfStar,
      emptyStars
    };
  }, [rating]);

  return (
    <div className={styles.rating}>
      {[...Array(Math.max(0, stars.fullStars))].map((_, i) => (
        <span key={`full-${i}`} className={styles.star}>★</span>
      ))}
      {stars.hasHalfStar && (
        <span className={`${styles.star} ${styles.halfStar}`}>
          <span className={styles.halfStarFull}>★</span>
          <span className={styles.halfStarEmpty}>☆</span>
        </span>
      )}
      {[...Array(Math.max(0, stars.emptyStars))].map((_, i) => (
        <span key={`empty-${i}`} className={styles.star}>☆</span>
      ))}
      <span className={styles.ratingText}>({rating}/10)</span>
    </div>
  );
});

/** Display name for the StarRating component */
StarRating.displayName = 'StarRating';

/**
 * @description Movie tooltip component that displays detailed movie information
 * Features:
 * - Movie title and year
 * - Director information
 * - Star rating display
 * - Memoized for performance
 * 
 * @component
 * @param {MovieTooltipProps} props - Component props
 * @returns {JSX.Element} Movie tooltip component
 */
export const MovieTooltip: React.FC<MovieTooltipProps> = React.memo(({ movie }) => {
  /**
   * @description Memoized director list
   * Splits the director string and creates individual paragraphs
   */
  const directors = useMemo(() => 
    movie.Director.split(',').map((director, index) => (
      <p key={index} className={styles.director}>
        {director.trim()}
      </p>
    )), [movie.Director]);

  return (
    <div className={styles.tooltip}>
      <h3 className={styles.title}>{movie.Title}</h3>
      <p className={styles.year}>{movie.Year}</p>
      <div className={styles.directors}>
        {directors}
      </div>
      <StarRating rating={movie.imdbRating} />
    </div>
  );
});

/** Display name for the MovieTooltip component */
MovieTooltip.displayName = 'MovieTooltip'; 