import React, { useEffect, useState } from "react";
import "./MovieCard.css";

type Props = {
  imdbID: string;
  title: string;
  poster: string;
  year: string;
};

type MovieDetail = {
  Plot?: string;
  Title?: string;
  Year?: string;
};

export default function MovieCard({ imdbID, title, poster, year }: Props) {
  const [plot, setPlot] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string>("");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;

  useEffect(() => {
    let ignore = false;

    async function fetchDetail() {
      try {
        setLoading(true);
        setErr("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=short`
        );
        const data: MovieDetail & { Response?: string; Error?: string } =
          await res.json();
        if (!ignore) {
          if (data && data.Plot && data.Plot !== "N/A") {
            setPlot(data.Plot);
          } else {
            setPlot("No summary available.");
          }
        }
      } catch {
        if (!ignore) setErr("Failed to load summary.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchDetail();
    return () => {
      ignore = true;
    };
  }, [imdbID, API_KEY]);

  const imgSrc =
    poster && poster !== "N/A"
      ? poster
      : "https://via.placeholder.com/300x445?text=No+Poster";

  return (
    <div className="movie-card" aria-label={`${title} (${year})`}>
      <div className="card-inner" tabIndex={0}>
        {/* FRONT */}
        <div className="card-face card-front">
          <img src={imgSrc} alt={title} />
          <h3 className="card-title">{title}</h3>
          <p className="card-year">{year}</p>
        </div>

        {/* BACK */}
        <div className="card-face card-back">
          <h4 className="back-title">
            {title} <span>({year})</span>
          </h4>
          <div className="plot">
            {loading ? "Loading..." : err ? err : plot}
          </div>
        </div>
      </div>
    </div>
  );
}
