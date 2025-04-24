/**
 * @file root.tsx
 * @description Root component and layout configuration for the Instant Movie Search React application.
 * This file serves as the main entry point for the application's routing and layout structure.
 * It includes the root layout, error boundary, and global configuration.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import React from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import type { Route } from "./+types/root";
import "./app.scss";

/**
 * @description Defines the global links configuration for the application.
 * This includes preconnect links for Google Fonts and the Inter font family stylesheet.
 * 
 * @returns {Route.LinksFunction} Array of link configurations
 */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

/**
 * @description Root layout component that wraps the entire application.
 * Provides the basic HTML structure, meta tags, and includes necessary scripts and styles.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The root layout structure
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeSwitcher />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * @description Main application component that serves as the root route component.
 * Renders the Outlet component which displays the matched route's component.
 * 
 * @returns {JSX.Element} The main application component
 */
export default function App() {
  return <Outlet />;
}

/**
 * @description Global error boundary component that catches and handles errors in the application.
 * Provides different error messages based on the type of error (404, server error, or development error).
 * 
 * @param {Object} props - Error boundary props
 * @param {Error} props.error - The error object that was caught
 * @returns {JSX.Element} Error display component with appropriate message and stack trace
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
