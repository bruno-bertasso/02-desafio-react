import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { GenresProvider } from "./hooks/useGenres";
import { SelectedGenreProvider } from "./hooks/useSelectedGenre";
import { MoviesProvider } from "./hooks/useMovies";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

export interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SelectedGenreProvider>
        <GenresProvider>
          <MoviesProvider>
            <SideBar />
            <Content />
          </MoviesProvider>
        </GenresProvider>
      </SelectedGenreProvider>
    </div>
  );
}
