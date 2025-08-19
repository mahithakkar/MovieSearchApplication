export default function HomePage()
{
    return (
        //tagging the style element so later we can write css
        <div className= "homepage">
            <h1>Movie Search</h1>

             {/* simple form; no JS logic yet */}

             <form>
                <input name= "q" placeholder = "Search for a title..." />
             </form>
        
        </div>
    ); 
}