import styled from "styled-components";

export const Footer = styled.footer`
  padding: 40px 20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.footer};
  color: ${({ theme }) => theme.colors.background};

  a {
    color: ${({ theme }) => theme.colors.background};
  }
`;