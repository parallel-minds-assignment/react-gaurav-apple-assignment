# Instant Movie Search React Application

A modern, responsive movie search application built with React, TypeScript, and SCSS. Features real-time search, movie details, and a beautiful UI with hover tooltips.

## Features

-  Real-time movie search using OMDB API
-  Modern UI with card-based layout
-  Interactive hover tooltips with movie details
-  Star rating visualization
-  Responsive design
-  TypeScript for type safety
-  SCSS modules for styling
-  Infinite scrolling
-  Lazy loading of images
-  Accessibility features

## Tech Stack

- React 18
- TypeScript
- SCSS Modules
- OMDB API
- Intersection Observer API (for infinite scroll)

## Project Structure

```
instant-movie-search-react-app/
├── app/
│   ├── features/
│   │   └── movies/
│   │       ├── components/
│   │       │   ├── MovieCard.tsx
│   │       │   ├── MovieSearch.tsx
│   │       │   └── MovieTooltip.tsx
│   │       ├── hooks/
│   │       │   ├── useDebouncedSearch.ts
│   │       │   └── useMovieDetails.ts
│   │       └── types/
│   │           └── movie.types.ts
│   ├── styles/
│   │   └── theme.scss
│   └── app.scss
├── public/
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instant-movie-search-react-app.git
cd instant-movie-search-react-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your OMDB API key:
```env
VITE_OMDB_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:
```bash
npm run build
# or
yarn build
```

## Features in Detail

### Movie Search
- Real-time search as you type
- Debounced API calls to prevent rate limiting
- Error handling and loading states
- No results handling

### Movie Cards
- Responsive grid layout
- Hover effects with elevation
- Lazy loading of images
- Placeholder for missing posters
- Accessibility features (keyboard navigation, ARIA labels)

### Tooltips
- Detailed movie information on hover
- Star rating visualization
- Director information
- Smooth animations
- Proper positioning and z-index management

### Infinite Scrolling
- Loads more movies as you scroll
- Intersection Observer for performance
- Loading indicators
- Error handling

## Styling

The application uses SCSS modules for styling with a custom theme system. Key features:

- CSS variables for theming
- Dark mode support
- Responsive design
- Consistent spacing and typography
- Card-based layout
- Hover animations

## API Integration

The application uses the OMDB API for movie data. Features:

- Debounced search requests
- Error handling
- Loading states
- Type-safe API responses
- Caching of movie details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OMDB API for movie data
- React team for the amazing framework
- All contributors and users of the application

---

