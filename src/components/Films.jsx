import style from '../styles/Films.module.css';
import React, { useEffect, useState } from 'react';

function Films({ genre }) {
  const [movies, setMovies] = useState([]);

  const fetchFilms = async () => {
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=7823bb6f&s=${genre}&type=movie`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 5)); // limit to 4 movies
      } else {
        setMovies([]); // handle case when no movies found
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [genre]);

  return (
    <div className={style.filmsRow}>
      {movies.map((movie) => (
        <div key={movie.imdbID} className={style.filmsCard}>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      ))}
    </div>
  );
}

export default Films;
