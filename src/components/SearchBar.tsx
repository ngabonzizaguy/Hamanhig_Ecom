"use client"

import Image from "next/image"

// import React from 'react'

const SearchBar = () => {
  return (
    <form className="flex ic justify-between gap-4 bg-gray-100 p-2 rounded-md flex-1" onSubmit={}>
      <input type="text" placeholder="Search" className="flex-1 bg-transparent outline-none" />
      <button className="cursor-pointer">
        <Image src="/search.png" alt={"search"} width={16} height={16} />
      </button>
    </form>  

  )
}

export default SearchBar