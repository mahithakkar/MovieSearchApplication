import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>About this Assessment</h1>
      </header>
      <main>
        <p>
          This is a simple movie search application built for a Hack4Impact assessment. The goal of this assessment is to gauge your ability to work with React, TypeScript, and external APIs.
        </p>
        <h2>Your Task</h2>
        <p>
          You have been provided with a partially completed application. Your task is to implement the missing features:
        </p>
        <ol>
          <li>
            <strong>Home Page:</strong> Implement the search input field and a "Search" button. When the user types a query and clicks the button, the application should navigate to the search results page.
          </li>
          <li>
            <strong>Display Page:</strong> Fetch movie data from the OMDB API based on the search query from the URL. Display the results in a user-friendly format (e.g., a grid of movie cards). Each card should show at least the movie's title, year, and poster.
          </li>
        </ol>
        <h2>Getting Started</h2>
        <p>
          You will need an API key from the <a href="http://www.omdbapi.com/apikey.aspx" target="_blank" rel="noopener noreferrer">OMDB API</a>. Once you have your key, add it to the <code>.env</code> file in the root of the project:
        </p>
        <pre>
          <code>VITE_OMDB_API_KEY=YOUR_API_KEY</code>
        </pre>
        <h2>Evaluation Criteria</h2>
        <p>
          Your submission will be evaluated on the following criteria:
        </p>
        <ul>
          <li>Correctness and functionality of the implemented features.</li>
          <li>Code quality, including readability, organization, and use of React best practices.</li>
          <li>Proper handling of loading and error states.</li>
          <li>Component design and user experience.</li>
        </ul>
        <p>
          Good luck!
        </p>
      </main>
    </div>
  );
};

export default AboutPage;
