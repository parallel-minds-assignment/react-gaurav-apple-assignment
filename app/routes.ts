/**
 * @file routes.ts
 * @description Route configuration file for the Instant Movie Search React application.
 * This file defines the main application routes and their corresponding components.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import { type RouteConfig, index } from "@react-router/dev/routes";

/**
 * @description Main route configuration array.
 * Currently defines the index route pointing to the home page component.
 * 
 * @type {RouteConfig}
 */
export default [index("routes/home.tsx")] satisfies RouteConfig;
