const API_KEY = "00586c15e094315c40078cb739ae6967";


const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");


const poster = document.getElementById("movie-poster");
const title = document.getElementById("movie-title");
const trailerButton = document.getElementById('watch-trailer')
const trailerModal = document.getElementById("trailer-modal");
const trailerFrame = document.getElementById("trailer-frame");
const closeTrailer = document.getElementById("close-trailer");
const year = document.getElementById("movie-year");
const genre = document.getElementById("movie-genre");
const rating = document.getElementById("movie-rating");
const description = document.getElementById("movie-description");
const moreBtn = document.getElementById('more-btn');


async function getMovieDetails() {

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );

    const movie = await response.json();

    poster.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
    title.textContent = movie.title;
    year.textContent = movie.release_date;
    genre.textContent = movie.genres.map(g => g.name).join(", ");
    rating.textContent = movie.vote_average.toFixed(1); 

    const fullText = movie.overview || 'No description availabel.';
    const shortText = fullText.slice(0, 100);
    description.textContent = shortText + "...";

    let expanded = false;
    moreBtn.addEventListener("click", function(){

    if(!expanded){
        description.textContent = fullText;
        moreBtn.textContent = "Less";
        expanded = true;

    }else{
        description.textContent = shortText + "...";
        moreBtn.textContent = "More";
        expanded = false;
    }
});

    return movie
}

console.log(getMovieDetails())

async function getMovieCast() {

    const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`

    );

    const castContainer = document.getElementById("cast-container");
    const data = await response.json();
    data.cast.slice(0, 10).forEach(actor => {
    castContainer.innerHTML += `
    
        <div class="cast-card">
            <img src="https://image.tmdb.org/t/p/w185${actor.profile_path}" alt="${actor.name}">
            <h3>${actor.name}</h3>
            <p>${actor.character}</p>
        </div>
    `;
});
}

async function getMovieTrailer() {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );

    const data = await response.json();

    const trailer = data.results.find(function(video) {
        return video.type === "Trailer" && video.site === "YouTube";
    });

    if (trailer) {

        trailerButton.addEventListener("click", function () {
            trailerFrame.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
            trailerModal.style.display = "flex";
             document.body.style.overflow = "hidden";
        });

    } else  {

        trailerButton.textContent = "Trailer Not Available";
        trailerButton.disabled = true;
    }

    closeTrailer.addEventListener("click", function () {
        trailerModal.style.display = "none";
        trailerFrame.src = "";
         document.body.style.overflow = "auto";
    });
}


getMovieTrailer();
getMovieCast();
getMovieDetails();