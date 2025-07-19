import { Link } from 'react-router-dom';
import '../App.css';

function HomePage() {
  return (
    <div className="container">
      <header>
        <h1>OMDB Movie Search</h1>
        <p>
          Welcome to the Hack4Impact assessment. Please add your OMDB API key to the <code>.env</code> file to use this app.
        </p>
        <nav>
          <Link to="/about">About this Assessment</Link>
        </nav>
      </header>

      {/* Applicant will have to code out the search input and button */}
    </div>
  );
}

export default HomePage;
