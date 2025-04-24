/**
 * @file home.tsx
 * @description Home route component for the movie search application.
 * Serves as the main entry point and renders the MovieSearch component.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import { MovieSearch } from "../features/movies/components/MovieSearch";

/**
 * @description Meta information for the home route
 * Sets the page title and description for SEO purposes
 * 
 * @param {Route.MetaArgs} args - Route meta arguments
 * @returns {Array} Array of meta tags
 */
export function meta() {
  return [
    { title: "Movie Search App" },
    { name: "description", content: "Search for movies using the OMDB API" },
  ];
}

/**
 * @description Home component
 * Renders the main MovieSearch component
 * 
 * @component
 * @returns {JSX.Element} The rendered Home component
 */
export default function Home() {
  return <MovieSearch />;
}
