import styled from "styled-components";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
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

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: white;
  color: black;
  font-size: 1rem;

  &:hover {
    background: #5884FF;
    cursor: pointer;
    opacity: 0.5;
    transform: translateY(-2px);
    color: white;
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
    color: white;
  }

  &[aria-current] {
    background: #5884FF;
    font-weight: bold;
    cursor: revert;
    transform: revert;
    color: white;
  }
`;

export default Pagination;
