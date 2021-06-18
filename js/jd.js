async function title(url){
    fetch(url)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            // for(let i=0;i<data.titles.length; i++){
            //     if(data.titles[i].title === 'US'){
            //         const title = data.titles[i].title
            //         console.log(title);
            //         return title;
            //     }

            // }
        })
        .catch((error) => {
            console.log('Erro. ', error);
        }); 
}

url = "https://api.themoviedb.org/3/movie/168259/alternative_titles?api_key=d860f87a6dab36dcaf738b0bb79714e8"
my_title = await title (url)

console.log(my_title);
