const API_KEY = '00586c15e094315c40078cb739ae6967'

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");
const listContainer = document.getElementById('list-container')
const searchResults = document.getElementById("search-results");
const movieContainer = document.getElementById("movie-container")


async function getPopularMovies() {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );

  const data = await response.json();

  data.results.forEach(function(movie) {
    movieContainer.innerHTML += `
    <div class="names">
        <a href="movie-details.html?id=${movie.id}">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        </a>
    </div>
`;
});

console.log(data);
}


const tvContainer = document.getElementById("tv-container")

async function getTopRatedTv() {
    const response = await fetch(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
    );

    const data = await response.json();

    data.results.forEach (function(tv) {
        tvContainer.innerHTML += `
        <div class="names top-rated">
        <a href="movie-details.html?id=${tv.id}">
        <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" alt="${tv.name}" >
        <p>${tv.name}</p>
        </a>
        </div>
        `;
    });

    console.log(data);
}



const animationContainer = document.getElementById("animation-container")

async function getMovieDiscover() {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=${API_KEY}`
    );

    const data = await response.json();

    data.results.forEach (function(animation) {
        animationContainer.innerHTML += `
        <div class="names">
        <a href="movie-details.html?id=${animation.id}">
        <img src="https://image.tmdb.org/t/p/w500${animation.poster_path}" alt="${animation.title}">
        <p>${animation.title}</p>
        </a>
        </div>
        `;
    });

    console.log(data);
}



const fantasyContainer = document.getElementById("fantasy-container")

async function getDiscoverMovie() {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=14&api_key=${API_KEY}`
    );

    const data = await response.json();

    data.results.forEach (function(fantasy) {
        fantasyContainer.innerHTML += `
        <div class="names">
        <a href="movie-details.html?id=${fantasy.id}">
        <img src="https://image.tmdb.org/t/p/w500${fantasy.poster_path}" alt="${fantasy.title}">
        <p>${fantasy.title}</p>
        </a>
        </div>
        `;
    });

    console.log(data)
}


const horrorContainer = document.getElementById("horror-container")

async function getMovieHorror() {
    const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=27&api_key=${API_KEY}`
    );

    const data = await response.json();

    data.results.forEach (function(horror) {
        horrorContainer.innerHTML += `
        <div class="names">
        <a href="movie-details.html?id=${horror.id}">
        <img src="https://image.tmdb.org/t/p/w500${horror.poster_path}" alt="${horror.title}">
        <p>${horror.title}</p>
        </a>
        </div>
        `;
    });

    console.log(data)
}




const heroSlider = document.getElementById("hero-slider")

async function getHeroSection() {
    const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );

    const data = await response.json();

    data.results.slice(0, 15).forEach(function(hero) {
        heroSlider.innerHTML += `
        <div class="hero-slide"
        style="background-image:url(https://image.tmdb.org/t/p/original${hero.backdrop_path})">

        <div class="hero-content">

       <h1>${hero.title}</h1>

       </div>
       </div>
      `;
    });


    let currentSlide = 0;

    setInterval(() => {

        currentSlide++;

        if(currentSlide >= heroSlider.children.length){
            currentSlide = 0;
        }

        heroSlider.scrollTo({
            left: currentSlide * heroSlider.clientWidth,
            behavior: "smooth"
        });

    },5000);

    console.log(data);

}


const menuBtn = document.getElementById('menu-btn')
const sidebar = document.getElementById('sidebar')

menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('active');

});

document.addEventListener("click", function (event) {
  if(
        !sidebar.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        sidebar.classList.remove('active');
    }
});


async function searchMovies() {
    const searchText = searchInput.value;
    searchButton.addEventListener("click", searchMovies);
    
    const response = await fetch(
         `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchText}`
    );

    const data = await response.json();

    heroSlider.style.display = 'none'; 
    listContainer.style.display = "none";
    searchResults.style.display = "grid";
   searchResults.innerHTML += `
   <div class="names">
    <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <p>${movie.title}</p>
    </a>

</div>
`;
    console.log(searchText)
}


getHeroSection();
getMovieHorror();
getDiscoverMovie();
getMovieDiscover();
getTopRatedTv();
getPopularMovies();

