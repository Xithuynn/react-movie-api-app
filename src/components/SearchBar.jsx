import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function SearchBar({searchTerm, setSearchTerm}) {
  return (

    <div className='flex w-4/5 max-w-xl items-center gap-3 mt-4 rounded-full border border-gray-300 bg-white px-4 py-3 shadow-sm transition focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100'>
        <SearchIcon className=" text-gray-500"/>


        <input type="text" 
               className="min-w-0 flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-400"
               placeholder='Search through thousands of movies'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value) }
         />
         {searchTerm && (
            <button 
              type='button'
              onClick={()=> setSearchTerm("")}
              className='text-gray-400 hover:text-gray-700'
            >
                <CloseIcon />
            </button>
         )}
    </div>
  )
}

export default SearchBar
