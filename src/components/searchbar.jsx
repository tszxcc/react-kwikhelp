import React from 'react';
import { useState } from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Searchbar ({searchTerm, setSearchTerm}) {

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

    // 放进去
    function putInside() {
        var searchBar = document.getElementsByClassName('searchBar')[0];
        console.log(searchBar)
        console.log(searchBar.getAttributeNames())

    }
    
    // 抽出来
    function pullBackout() {
        var searchBar = document.getElementsByClassName('searchBar')[0];
        
        // searchBar.style.boxShadow = "none";
    }

    return (
        <div className='searchBar bg-white flex items-center border-solid border-2 border-[#7EA6F4] rounded-lg shadow-lg h-12 px-3 w-[50%]'>
            {/* Change the Icon color with "text-white" or "text-[XXX]" */}
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[#7EA6F4] mr-2' />

            <form action ="/search" method="get" className='w-[100%]'>
                <input className='searchBarInput h-full font-base text-1.25rem w-full focus:outline-none text-black' type='text' name='search' placeholder='Search' onFocus={() => putInside()} onBlur={() => pullBackout()} onChange={handleSearch} value={searchTerm}></input>
            </form>
            
        </div>
        
        );

}
