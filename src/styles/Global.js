import * as theme from "./Theme.styled";
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: monospace;
  overflow-x: hidden;
}

.light {
  background-color: ${theme.light.colors.header};
}
.dark {
  background-color: ${theme.dark.colors.header};
}
.blue {
  background-color: ${theme.blue.colors.header};
}
.green {
  background-color: ${theme.green.colors.header};
}
.brown {
  background-color: ${theme.brown.colors.header};
}
.pink {
  background-color: ${theme.pink.colors.header};
}

// active theme
.active{
    border: 3px solid ${({ theme }) => theme.colors.border};
}
`