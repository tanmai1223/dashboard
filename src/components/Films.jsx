import style from '../styles/Films.module.css';
import React, { useEffect, useState } from 'react';

function Films({ genre }) {
  const [movies, setMovies] = useState([]);

  const fetchFilms = async () => {
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search.slice(0, 5));
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  useEffect(() => {
    fetchFilms(); // ✅ FIXED typo
  });

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
