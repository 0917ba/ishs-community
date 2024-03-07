import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';

export default function BasicPagination({ total, limit, setPage }) {
  const numPages = Math.ceil(total / limit);
  const handlePage = (event, page) => {
    setPage(page);
  };

  return (
    <Nav>
      <Stack spacing={2}>
        <Pagination
          color='primary'
          count={numPages}
          defaultPage={1}
          boundaryCount={2}
          onChange={(e, p) => handlePage(e, p)}
          size='large'
        />
      </Stack>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;
