import * as React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

export default function PaginationLink({
    pageChange
}) {
    
    const handleChange = (event, value) => {
        console.log("value",value)
        pageChange(value)
        };
  return (
    <MemoryRouter initialEntries={['/home']} initialIndex={0}>
      <Route>
        {({ location }) => {
          const query = new URLSearchParams(location.search);
          return (
            <Pagination
              count={2}
              onChange={handleChange} 
            />
          );
        }}
      </Route>
    </MemoryRouter>
  );
}
