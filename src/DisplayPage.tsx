import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./DisplayPage.css";

export default function DisplayPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";

  // OMDb API key (env or fallback)
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "5ef57ab5";

  useEffect(() => {
    async function fetchMovies() {
      setError("");
      setMovies([]);
      if (!query.trim()) return;

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError(data.Error || "No results found.");
          return;
        }
        setMovies(data.Search || []);
      } catch {
        setError("Network error. Please try again.");
      }
    }

    fetchMovies();
  }, [query]);

  return (
    <div className="displaypage">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="results-title">
        {query ? `Search Results for "${query}"` : "Search Results"}
      </h2>

      {error ? (
        <p className="error-text">{error}</p>
      ) : (
        <div className="movies-grid">
          {movies.map((m) => (
            <div key={m.imdbID} className="movie-card">
              <img src={m.Poster} alt={m.Title} />
              <h3>{m.Title}</h3>
              <p>{m.Year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
