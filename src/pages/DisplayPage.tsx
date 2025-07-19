import { useSearchParams, useNavigate } from 'react-router-dom';
import '../App.css';

function DisplayPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const navigate = useNavigate();

  return (
    <div className="container">
      <header>
        <button onClick={() => navigate(-1)} className="back-button">
          &larr; Back
        </button>
        <h1>Search Results for "{query}"</h1>
      </header>

      {/* Applicant will have to code out the component to display the movies from the OMDB API */}
    </div>
  );
}

export default DisplayPage;