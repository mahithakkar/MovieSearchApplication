import { useNavigate } from "react-router-dom";

export default function HomePage()
{
    //defining a function handleSubmit 
    function handleSubmit(e: React.FormEvent<HTMLFormElement>)
    {
        e.preventDefault(); // stop the default page reload

        // Grab the form values
        const form = e.currentTarget;                 // the <form> that was submitted
        const data = new FormData(form);              // browser helper for form fields
        const q = (data.get("q") || "").toString();   // read the field named "q"

        console.log("Search query:", q);  

    }




    return (
        //tagging the style element so later we can write css
        <div className= "homepage">
            <h1>Movie Search</h1>


             <form onSubmit = {handleSubmit}>
                <input name= "search" placeholder = "Search for a title..." />
             </form>
        
            <button type = "submit"> Search </button>
        </div>
    ); 
}