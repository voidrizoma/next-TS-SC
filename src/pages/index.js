import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { GlobalStyles } from "@/styles/Global";
import Layout from "@/Commons/Layout/Layout";
import {
  CardsContainer,
  Card,
  CardTitle,
  CardBody,
} from "@/Components/Cards/Cards.styled";
import { light, dark, blue, green, brown, pink } from "@/styles/Theme.styled";
import { ThemeButton, ThemeContainer } from "@/styles/ThemeSwitch.styled";

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [selectedTheme, setSelectedTheme] = useState(light);
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint,
  });
  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find((field) => field.name === "query");

    const value = fieldQuery.value || "";
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({ current: endpoint });
  }
  const HandleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Layout>
          <main>
          <ThemeContainer>
          <span>Themes: </span>
          <ThemeButton
            className={`light ${selectedTheme === light ? "active" : ""}`}
            onClick={() => HandleThemeChange(light)}></ThemeButton>
          <ThemeButton
            className={`dark ${selectedTheme === dark ? "active" : ""}`}
            onClick={() => HandleThemeChange(dark)}></ThemeButton>
          <ThemeButton
            className={`blue ${selectedTheme === blue ? "active" : ""}`}
            onClick={() => HandleThemeChange(blue)}></ThemeButton>
          <ThemeButton
            className={`green ${selectedTheme === green ? "active" : ""}`}
            onClick={() => HandleThemeChange(green)}></ThemeButton>
          <ThemeButton
            className={`brown ${selectedTheme === brown ? "active" : ""}`}
            onClick={() => HandleThemeChange(brown)}></ThemeButton>
          <ThemeButton
            className={`pink ${selectedTheme === pink ? "active" : ""}`}
            onClick={() => HandleThemeChange(pink)}></ThemeButton>
        </ThemeContainer>
            <form className="search" onSubmit={handleOnSubmitSearch}>
              <input name="query" type="search" />
              <button>Search</button>
            </form>
            <CardsContainer className="grid">
              {results.map((result) => {
                const { id, name, image } = result;
                return (
                  <Card key={id} className="card">
                    <Link href="/character/[id]" as={`/character/${id}`}>
                      <CardTitle>{name}</CardTitle>
                      <CardBody>
                        <img src={image} alt={`${name} Thumbnail`} />
                      </CardBody>
                    </Link>
                  </Card>
                );
              })}{" "}
            </CardsContainer>
            <p>
              <button onClick={handleLoadMore}>Load More</button>
            </p>
          </main>
        </Layout>
      </ThemeProvider>
    </>
  );
}
