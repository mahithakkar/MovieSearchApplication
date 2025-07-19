import React, { useState, useEffect } from 'react';

const DebuggingPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const handleFetch = () => {
    setError(null);
    setData(null);
    // Intentionally making a call to a non-existent API endpoint
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    if (apiKey === 'YOUR_API_KEY' || !apiKey) {
      setError('Please provide a valid OMDB API key in the .env file.');
      return;
    }

    // Fetch a list of movies (e.g., "Batman") to introduce filtering complexity
    fetch(`https://www.omdbapi.com/?s=Batman&apikey=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        if (json.Response === 'True' && json.Search) {
          // Bug 1: Filtering movies released AFTER 2000, but using strict equality
          // This will likely result in an empty array or only movies from exactly 2000.
          const filteredMovies = json.Search.filter((movie: any) => parseInt(movie.Year) === 2000);

          // Bug 3: Incorrect average IMDb rating calculation
          // It tries to sum ratings without handling non-numeric values (e.g., "N/A")
          // or correctly parsing them, leading to NaN or incorrect sum.
          let totalRating = 0;
          filteredMovies.forEach((movie: any) => {
            // Assuming movie.imdbRating is a string like "7.8"
            // If it's "N/A", parseFloat will return NaN, which will propagate.
            totalRating += parseFloat(movie.imdbRating);
          });
          const averageRating = filteredMovies.length > 0 ? totalRating / filteredMovies.length : 0;

          setData({ movies: filteredMovies, averageRating: averageRating });
        } else {
          setError(json.Error || 'No movies found.');
        }
      })
      .catch(err => {
        setError(err.message);
      });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <h1>Debugging Page</h1>
      <p>This page fetches a list of "Batman" movies and tries to display those released after 2000. There's a bug in the filtering logic, image display, and average IMDb rating calculation.</p>
      <button onClick={handleFetch}>Fetch Movie Data</button>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {data && data.movies && (
        <div>
          <h2>Filtered Batman Movies (Released after 2000):</h2>
          {/* Bug 4: Conditional rendering for "No movies found" might be off */}
          {data.movies.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {data.movies.map((movie: any) => (
                <div key={movie.imdbID} style={{ border: '1px solid #ccc', padding: '10px' }}>
                  <h3>{movie.Title}</h3>
                  <p>Year: {movie.Year}</p>
                  <p>IMDb Rating: {movie.imdbRating}</p>
                  {/* Bug 2: Subtle bug: using movie.Poster === null instead of 'N/A' */}
                  <img
                    src={movie.Poster === null ? 'https://via.placeholder.com/200x300.png?text=No+Image' : movie.Poster}
                    alt={`${movie.Title} Poster`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No movies found matching the criteria or data not yet fetched.</p>
          )}
          {/* Display average rating, which might be NaN due to Bug 3 */}
          {data.movies.length > 0 && <p>Average IMDb Rating of Filtered Movies: {data.averageRating.toFixed(2)}</p>}
        </div>
      )}
    </div>
  );
};

export default DebuggingPage;