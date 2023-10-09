import { useEffect, useState, useRef } from "react";


function Main() {

    const [currMovie, setCurrMovie] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const movieInput = useRef("");
    let movieInputCleaned = useRef(null);
    const notFirstRender = useRef(false);
    

    //https://api.themoviedb.org/3/movie/550?api_key=efdd13494893a735fbb6b9538ce2ea79
    //'https://api.themoviedb.org/3/search/movie?query=the%20matrix&include_adult=false&language=en-US&page=1'

    useEffect(() => {
        // fetch data
        if (notFirstRender.current) {
            getData();
        }
        console.log(buttonClicked);
    }, [buttonClicked]);

    const getData = () => {
        let url = 'https://api.themoviedb.org/3/search/movie?api_key=efdd13494893a735fbb6b9538ce2ea79&query=' + movieInputCleaned.current + '&include_adult=false&language=en-US&page=1';
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(response => {
            setCurrMovie(response);
            console.log(response);
        });
    }  

    const buttonPressed = () => {
        movieInputCleaned.current = movieInput.current.value.replace(/\s+/g, '%20').toLowerCase();
        console.log("button clicked, MVI = " + movieInputCleaned.current);
        buttonClicked ? setButtonClicked(false) : setButtonClicked(true);
        notFirstRender.current = true;
    }

    

    return (
        <>
            <div id="movie-search-container">
                <h1>Search for a movie</h1>
                <input type="text" id="movie-input" ref={movieInput} style={{marginRight: "10px"}}/>
                <button onClick={buttonPressed}>Search</button>
                <div class="movie-details">
                    <div class="movie-details-text">
                        {currMovie.results ? <h1>{currMovie.results[0].title}</h1> : null}
                        {currMovie.results ? <h4>Release date: {currMovie.results[0].release_date}</h4> : null}
                        {currMovie.results ? <p>Overview: {currMovie.results[0].overview}</p> : null}
                    </div>
                    {currMovie.results ? <img src={"https://image.tmdb.org/t/p/w500/" + currMovie.results[0].poster_path}
                        id="movie-poster" alt={currMovie.results[0].title + "poster"} /> : null}
                </div>
            </div>
        </>
    )
};

export default Main;