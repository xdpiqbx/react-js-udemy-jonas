import { useEffect, useState } from "react";

import tempMovieData from "./data/tempMovieData.js";
import tempWatchedData from "./data/tempWatchedData.js";

import vars from "./config.js";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     fetch(
  //       `http://www.omdbapi.com/?apikey=` + vars.OMDb_API_KEY + `&s=interstellar`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setMovies(data.Search));
  //   }, []);

  useEffect(() => {
    async function fetchMovies() {
      setIsLoading(true);
      const fetchResult = await fetch(
        `http://www.omdbapi.com/?apikey=` +
          vars.OMDb_API_KEY +
          `&s=interstellar`
      );
      const responseJson = await fetchResult.json();
      setMovies(responseJson.Search);
      setIsLoading(false);
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar />
        <NumResults numberOfMovies={movies.length} />
      </NavBar>
      <MainContent>
        <Box element={isLoading ? <Loader /> : <MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        />
        {/* <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box> */}
      </MainContent>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function MainContent({ children }) {
  return <main className="main">{children}</main>;
}

// function Box({ children }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <ButtonShowHide isOpen={isOpen} onSetIsOpen={setIsOpen} />
//       {isOpen && children}
//     </div>
//   );
// }

function Box({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <ButtonShowHide isOpen={isOpen} onSetIsOpen={setIsOpen} />
      {isOpen && element}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function ButtonShowHide({ isOpen, onSetIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => onSetIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NumResults({ numberOfMovies }) {
  return (
    <p className="num-results">
      Found <strong>{numberOfMovies}</strong> results
    </p>
  );
}
