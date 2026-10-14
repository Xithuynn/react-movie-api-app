import React from 'react'

const MovieCard = ({ movie : {
    title,id,vote_average,poster_path, release_date, original_language
} 


 }) => {
  return (
    <div className='movie-card'>
        <img 
            src={poster_path? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} 
            alt="No_image"
            className='img' />
        <div>
                <p 
            
            className='text-gray-900 font-semibold py-1 text-lg'
                >
                    {title} 
                </p>
                <div className='flex gap-2 '>
                    
                    <p> <span>⭐</span>{vote_average? vote_average.toFixed(1) : "N/A"  } .</p>
                    <p>{original_language? original_language.charAt(0).toUpperCase() + original_language.slice(1) : "N/A"} .</p>
                    <p>{release_date? release_date.split("-")[0]: "N/A"}</p>
                </div>
        </div>

    </div>
  )
}

export default MovieCard
