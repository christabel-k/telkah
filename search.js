const API_KEY = "00586c15e094315c40078cb739ae6967";

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');



async function searchMovies(){
    const searchText = searchInput.value.trim();

    console.log(searchText);

    if (searchText.trim() === ""){

    searchResults.innerHTML = "";
    searchResults.style.display = 'none'
    return;
    }

    const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(searchText)}`
    );

    const data = await response.json();

    searchResults.innerHTML = '';
    searchResults.style.display = 'grid'

    data.results
.filter(item => item.media_type !== "person")
.forEach(function(movie){

    const title = movie.title || movie.name;

    const year = (
        movie.release_date ||
        movie.first_air_date ||
        ""
    ).slice(0,4) || "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "0.0";

    const mediaType =
        movie.media_type === "tv"
        ? "TV Series"
        : "Movie";

     const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Image";

    searchResults.innerHTML += `
        <div class="names">
            <a href="movie-details.html?id=${movie.id}">
                <img src="${poster}" alt="${title}">

                <div class="movie-details">
                    <h3>${title}</h3>

                    <p class="movie-info">
                        ⭐ ${rating} | • ${year} | • ${mediaType}
                    </p>

                </div>
            </a>
        </div>
    `;
});

console.log(data);
}

searchInput.addEventListener('input', searchMovies);