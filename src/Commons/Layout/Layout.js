import { useState, useEffect } from "react";
import Header from "../Header/Header";
import { GlobalStyles } from "../../styles/Global";
import { ThemeProvider } from "styled-components";
import Footer from "../Footer/Footer";
import { light, dark, blue, green, brown, pink } from "../../styles/Theme.styled";
import { ThemeButton, ThemeContainer } from "../../styles/ThemeSwitch.styled";

export default function Layout({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(light);
  const HandleThemeChange = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setSelectedTheme(currentTheme);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={selectedTheme}>
      <GlobalStyles />
        <Header />
        <ThemeContainer>
          <span>Themes: </span>
          <ThemeButton
            className={`light ${selectedTheme === light ? "active" : ""}`}
            onClick={() => HandleThemeChange(light)}
          ></ThemeButton>
          <ThemeButton
            className={`dark ${selectedTheme === dark ? "active" : ""}`}
            onClick={() => HandleThemeChange(dark)}
          ></ThemeButton>
          <ThemeButton
            className={`blue ${selectedTheme === blue ? "active" : ""}`}
            onClick={() => HandleThemeChange(blue)}
          ></ThemeButton>
          <ThemeButton
            className={`green ${selectedTheme === green ? "active" : ""}`}
            onClick={() => HandleThemeChange(green)}
          ></ThemeButton>
          <ThemeButton
            className={`brown ${selectedTheme === brown ? "active" : ""}`}
            onClick={() => HandleThemeChange(brown)}
          ></ThemeButton>
          <ThemeButton
            className={`pink ${selectedTheme === pink ? "active" : ""}`}
            onClick={() => HandleThemeChange(pink)}
          ></ThemeButton>
        </ThemeContainer>
        <div>{children}</div>
        <Footer />
      </ThemeProvider>
    </>
  );
}
