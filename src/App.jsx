import React, { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'


const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
   }
}
// curl --request GET \
//      --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZGY1OWY5YWQ2YmI4NTI1Y2ViOGI5ZGZkMDIzZjMyMSIsIm5iZiI6MTc5MTc5MzI0NS4wODA5OTk5LCJzdWIiOiI2YWNjOTg1ZDQwZTE3ZTRhYzA4ZmFmZmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.UqUT9zfBE8qCsrkZ3jjRrqNN2vIXyiO5qyORyv7fHys' \
//      --header 'accept: application/json'

function App() {

   const [searchTerm, setSearchTerm] = useState('')
   const [debouncedSearch, setDebouncedSearch] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const [movieList, setMovieList] = useState([])
   const [isLoading, setIsLoading] = useState(false)


   // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc

const fetchMovies = async (query) => {
   try {
         const endpoint = query?
                           `${API_BASE_URL}/search/movie?query=${query}`
                         : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`


         const response = await fetch(endpoint,API_OPTIONS);
         // const text = await response.text();
         console.log("HTTP status",response.status)
         // console.log("Response body: " ,text)

         if(!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
         } 
         // if(!text.trim()) {
         //    throw new Error(`The API returned an empty response.`)
         // }
          const data = await response.json();

          if(data.Response === "False") {
               setErrorMessage(data.Error || 'Failed to fetch movies')
               setMovieList([])
               return;
          } 

          setMovieList(data.results || [])
          console.log(movieList)
          console.log(data)

   } 
   catch(error) {
      console.log(`Error fetching movies: ${error}`)
      setErrorMessage('Error fetching movies. Please try again later.')
   } finally {
      setIsLoading(false)
   }
}

   useEffect(()=> {

      const timer = setTimeout(()=> {
         setDebouncedSearch(searchTerm)
      },500)

      return () => clearTimeout(timer)

   },[searchTerm])

   useEffect(()=> {

         // if(debouncedSearch.trim()=== "") setDebouncedSearch("");
            fetchMovies(debouncedSearch)
         

         console.log(debouncedSearch)

   },[debouncedSearch])



  return (
     <main>
        <div className='wrapper'>
            <header className= ' min-w-full flex flex-col  items-center '>
                 <div className='text'>
                     <p>Find  <span className='gradient'>Movies </span>You'll enjoy Without a hassle </p>
                  </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
       
            </header>
            
            <section className=' max-w-full p-5'>

               <h2  className='text-3xl font-bold mb-3'>All Movies</h2>

              {isLoading ? (<p className='text-gray-800'> Loading ...</p>) :  errorMessage ? (
                  <p>{errorMessage}</p>) : (
                        <ul className='mx-auto md:grid grid-cols-3 lg:grid-cols-4 gap-5 '>
                           {movieList.map((movie) => (
                              <MovieCard key={movie.id}  movie={movie}/>
                           ))}
                        </ul>
                  )
                     }
            </section>

           

         </div>


        
     </main>
  )
}

export default App
