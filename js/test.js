// import { msg, PI, addNumbers } from './app.js';

// const movie = 'Fast & Furious Presents: Hobbs & Shaw (2019)';
// fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movie}`)
// .then(response => {
//   return response.json();
// })
// .then((data) => {
//     for(let i=0; i<data.data.movies.length; i++){
        
//         console.log("data: ", data.data.movies[i].title_long);
//         console.log("data: ", data.data.movies[i].year);
//     }
// })

// import{titles, years} from '../js/app.js'


export function download(title, year){
    const yts_url = `https://yts.mx/api/v2/list_movies.json?query_term=${title}`
    fetch(yts_url)
    .then(response => {
        console.log(response)
            return response.json();
        })
        .then((movieData)=>{
            setTimeout(()=>{

                const movieObj = movieData.data.movies;
                const h = movieObj.map(tor =>{
                    return tor.torrents;
                })
                const r = h.map(ele =>{
                    return ele[0].url
                })
                console.log(r);
                const length = movieObj.length > 4 ? 4 : movieObj.length;
    
    
                for(let i=0; i < length; i++){
                    if(movieObj[i].year === year){
                        //Torrent 
                        const tor = movieObj[0].torrents[0].url; 
                        console.log(tor)
                        window.open(tor)
                    }
                    //Error
                }
            }, 2000);

        })
}
// download("Fast & Furious Presents: Hobbs & Shaw", 2019);