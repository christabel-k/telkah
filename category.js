const API_KEY = "00586c15e094315c40078cb739ae6967";

const movieContainer = document.getElementById("movie-container");
const categoryTitle = document.getElementById("category-title");



const categories = {
    action: 28,
    animation: 16,
    comedy: 35,
    fantasy: 14,
};



const params = new URLSearchParams(window.location.search);

const type = params.get("type");
console.log(type);

const genreId = categories[type];
console.log(genreId);


categoryTitle.textContent =
    type.charAt(0).toUpperCase() + type.slice(1);

    const titles = {
    fantasy: "Fantasy Movies",
    animation: "Animation Movies",
    comedy: "Comedy Movies",
    tv: "TV Series"
};

categoryTitle.textContent = titles[type];


async function loadCategory() {

        let url;

    if (type === "tv") {
        url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;

    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    }

    console.log(url);

const response = await fetch(url);

const data = await response.json();


movieContainer.innerHTML = "";
data.results.forEach(movie => {

    console.log(movie);

});

data.results.forEach(movie => {

    const title = movie.title || movie.name;

    const year = (
        movie.release_date ||
        movie.first_air_date ||
        ""
    ).slice(0,4) || "N/A";

    const rating = movie.vote_average
        ? movie.vote_average.toFixed(1)
        : "0.0";

    const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "images/no-image.png";

    movieContainer.innerHTML += `
        <div class="movie-card">
            <a href="movie-details.html?id=${movie.id}">
                <img src="${poster}" alt="${title}">
            </a>
        </div>
    `;
});

}

 loadCategory();






