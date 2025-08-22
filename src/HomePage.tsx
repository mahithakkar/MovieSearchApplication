import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

type SearchItem = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
  Type: string;
};

type SearchResponse =
  | { Response: "True"; Search: SearchItem[] }
  | { Response: "False"; Error: string };

export default function HomePage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(q)}`
      );
      const data: SearchResponse = await res.json();

      if (data.Response === "False") {
        setError(data.Error || "No results found.");
        return;
      }

      navigate(`/search?q=${encodeURIComponent(q)}`, {
        state: { results: data.Search },
      });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="homepage">
      <h1 className="title">Movie Search</h1>

      <form className="search-form" onSubmit={handleSubmit} role="search">
        <input
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for a movie..."
          className="search-input"
          aria-label="Search for a movie"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="error-text">{error}</div>}
    </div>
  );
}
