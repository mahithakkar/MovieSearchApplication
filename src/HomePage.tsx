import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";


export default function HomePage()
{
    const navigate = useNavigate();

    //defining a function handleSubmit 
    function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault(); // stop the default page reload

        // Grab the form values
        const form = e.currentTarget;
        const data = new FormData(form);
        const query = (data.get("q") || "").toString();

        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    }




    return (
        //tagging the style element so later we can write css
        <div className="homepage">
      <h1 className="title">Movie Search</h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          name="q"
          placeholder="Search for a movie..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
    ); 
}