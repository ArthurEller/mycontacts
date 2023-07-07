import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};
    font-weight: bold;

    svg {
      margin-right: 8px;
      font-weight: bold;
    }
  }

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;
