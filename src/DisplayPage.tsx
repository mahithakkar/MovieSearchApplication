import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./DisplayPage.css";

type Movie = {
  imdbID: string;
  Poster: string;
  Title: string;
  Year: string;
};

export default function DisplayPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = (searchParams.get("q") || "").trim();
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string | undefined;

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;
      if (!API_KEY) {
        setError("Missing VITE_OMDB_API_KEY in .env");
        return;
      }
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.Response === "False") {
          setError(data.Error || "No results found.");
        } else {
          setMovies(data.Search || []);
        }
      } catch {
        setError("Network error.");
      }
    }
    fetchMovies();
  }, [query, API_KEY]);

  return (
    <div className="displaypage">
      <div className="page-inner">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h2 className="results-title">
          {query ? `Search Results for "${query}"` : "Search Results"}
        </h2>

        {error && <p className="error-text">{error}</p>}

        <div className="movies-grid">
          {movies.map((m) => (
            <div key={m.imdbID} className="poster-card">
              <img
                src={
                  m.Poster && m.Poster !== "N/A"
                    ? m.Poster
                    : "https://via.placeholder.com/300x445?text=No+Poster"
                }
                alt={m.Title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
