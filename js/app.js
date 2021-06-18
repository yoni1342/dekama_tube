//Intalize the API
const API_KEY = 'd860f87a6dab36dcaf738b0bb79714e8';
const poster_url = 'https://image.tmdb.org/t/p/w500/'
// const url = 'https://api.themoviedb.org/3/search/movie?api_key=d860f87a6dab36dcaf738b0bb79714e8';
import{download}from '../js/test.js';


const buttonElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputvalue')
const movies_poster = document.querySelector('.poster')
const imgEle = document.querySelector('img')
const content = document.querySelector('#content-close')
const Content = document.querySelector('.content')


const generetURL = function(path){
    return `https://api.themoviedb.org/3${path}?api_key=d860f87a6dab36dcaf738b0bb79714e8`
}



function year (url){
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            const year = parseInt(data.results[0].release_dates[0].release_date)
            // console.log(year);
            return year;
        })
        .catch((error) => {
            console.log('Erro. ', error);
        }); 
}
async function title(url){
    return fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            // console.log(data)
            for(let i=0;i<data.titles.length; i++){
                if(data.titles[i].title === 'US'){
                    const title = data.titles[i].title
                    // console.log(title);
                    return title;
                }

            }
        })
        .catch((error) => {
            console.log('Erro. ', error);
        }); 
}
function movieSection(movies){
    return movies.map((movie)=>{
        if(movie.poster_path){
            return `<img src=${poster_url + movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    })
}

function creatMovieContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    const movieTemplate = `
    <section class="section">
    ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">X</p>
    </div>
    
    `  
    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function createiframe(video){
const iframe = document.createElement('iframe')
iframe.setAttribute('class', 'videos')
url = `https://www.youtube.com/embed/${video.key}`
iframe.src = url
iframe.width = 360;
iframe.height = 315;
iframe.allowFullscreen = true;
return iframe;
}

function fetchMovie(data){
    movies_poster.innerHTML = " "
    const movie = data.results
    const movieblock = creatMovieContainer(movie);  
    movies_poster.appendChild(movieblock);
    console.log(data.results);
}

buttonElement.addEventListener('click', function(){
    event.preventDefault()
    const value = inputElement.value;
    const path = `/search/movie`
    const url = generetURL(path)+'&query='+value;

    fetch(url)
        .then((res)=>res.json())
        .then(fetchMovie)
        .catch((error) => {
            console.log('Erro. ', error);
        }); 

    inputElement.value = '';
})
document.addEventListener('click', function ev(){
    const target = event.target;
    if(target.tagName.toLowerCase()==='img'){
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        const movieId = event.target.dataset.movieId;
        content.classList.add("content_display")
        content.innerHTML = '<p id="content-close">X</p>';
        // console.log("dataset: ", event);

        const path = `/movie/${movieId}/videos`
        const URL = generetURL(path) 
        const path2 = `/movie/${movieId}/release_dates` 
        const path3 = `/movie/${movieId}/alternative_titles`


        const titles = title(generetURL(path3))
        const years = year(generetURL(path2))
        download(titles, years);
       
        fetch(URL)
        .then((res)=>res.json())
        .then((data)=>{ 
            const videos = data.results;
            const length = videos.length > 4 ? 4 : videos.length;
            const iframeContainer = document.createElement('div');
            iframeContainer.setAttribute('class', 'iframeCont')
            for(let i=0; i<length; i++){
                video = videos[i]
                const iframe = createiframe(video);
                iframeContainer.appendChild(iframe)
                content.appendChild(iframeContainer);

            }

            // console.log("Videos: ", data.results[0].key)
        })
        .catch((error) => {
            console.log('Erro. ', error);
        }); 
        
        console.log('movieID', movieId);
    }
    if(target.id=== "content-close"){
        const content = target.parentElement;
        content.classList.remove('content_display')
    }
})
