/**
 * @file ThemeSwitcher.tsx
 * @description Theme switcher component that allows users to toggle between light, dark, and system themes.
 * This component manages theme state and persists user preferences in localStorage.
 * 
 * @author Gaurav Bagul
 * @company Parallel Minds
 * @created April 22, 2024
 */

import React, { useEffect, useState } from 'react';
import styles from './ThemeSwitcher.module.scss';

/**
 * @description Type definition for available theme options
 * @typedef {'light' | 'dark' | 'system'} Theme
 */
type Theme = 'light' | 'dark' | 'system';

/**
 * @description ThemeSwitcher component that provides UI controls for changing the application theme.
 * Features:
 * - Toggle between light, dark, and system themes
 * - Persists theme preference in localStorage
 * - Automatically applies system theme preference
 * - Provides accessible button controls with icons
 * 
 * @component
 * @returns {JSX.Element} Theme switcher component with three theme options
 */
export const ThemeSwitcher: React.FC = () => {
  /**
   * @description State hook for managing the current theme
   * Initializes from localStorage or defaults to 'system'
   */
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) return savedTheme;
      return 'system';
    }
    return 'system';
  });

  /**
   * @description Effect hook that applies the selected theme to the document root
   * and persists the theme preference in localStorage
   */
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      root.removeAttribute('data-theme');
      localStorage.removeItem('theme');
    } else {
      root.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  /**
   * @description Handler function for theme changes
   * @param {Theme} newTheme - The new theme to apply
   */
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={`${styles.themeButton} ${theme === 'light' ? styles.active : ''}`}
        onClick={() => handleThemeChange('light')}
        aria-label="Light theme"
        title="Switch to Light theme"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
          />
        </svg>
      </button>
      <button
        className={`${styles.themeButton} ${theme === 'dark' ? styles.active : ''}`}
        onClick={() => handleThemeChange('dark')}
        aria-label="Dark theme"
        title="Switch to Dark theme"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"
          />
        </svg>
      </button>
      <button
        className={`${styles.themeButton} ${theme === 'system' ? styles.active : ''}`}
        onClick={() => handleThemeChange('system')}
        aria-label="System theme"
        title="Use System theme preference"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v8.03A3.003 3.003 0 0111 18c-1.66 0-3-1.34-3-3z"
          />
        </svg>
      </button>
    </div>
  );
}; 