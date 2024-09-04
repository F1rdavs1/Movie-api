import { Pagination } from '@mui/material';
import React from 'react'


function MoviePagination({setPage, totalPage}) {
    
  const handleChangePagination = (event, value) => {
    setPage(value);
  }

  return (
    <div className='flex justify-center py-10'>
        <Pagination onChange={handleChangePagination} count={totalPage} showFirstButton showLastButton />
    </div>
  )
}

export default MoviePagination