import React, { useContext } from 'react';
import style from '../styles/HomePage.module.css';
import { useNavigate } from 'react-router';
import { FavouriteContext } from '../context/FavouriteContext';

function HomePage() {
  const navigate = useNavigate();
  const { favourite, toggleFavourite, removeFavourite } = useContext(FavouriteContext);

  const categories = [
    { name: 'Action', color: '#FF5209', image: 'action.png' },
    { name: 'Drama', color: '#D7A4FF', image: 'drama.png' },
    { name: 'Romance', color: '#11B800', image: 'romance.png' },
    { name: 'Thriller', color: '#84C2FF', image: 'thriller.png' },
    { name: 'Western', color: '#902500', image: 'western.png' },
    { name: 'Horror', color: '#7358FF', image: 'horror.png' },
    { name: 'Fantasy', color: '#FF4ADE', image: 'fantasy.png' },
    { name: 'Music', color: '#E61E32', image: 'music.png' },
    { name: 'Fiction', color: '#6CD061', image: 'fiction.png' },
  ];

  return (
    <div className={style.homeMainContainer}>
      <div className={style.sideContainer}>
        <div className={style.contextContainer}>
          <div className={style.super}>
            <p>Super app</p>
          </div>
          <div className={style.matter}>
            <p>Choose your entertainment category</p>
          </div>
          <div className={style.selections}>
            {favourite.map((genre) => (
              <p key={genre}>
                {genre}
                <span
                  onClick={() => removeFavourite(genre)}
                  onKeyDown={(e) => e.key === 'Enter' && removeFavourite(genre)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Remove ${genre}`}
                >
                  X
                </span>
              </p>
            ))}
          </div>
          {favourite.length < 3 && (
            <p className={style.warning}>
              <img src="red-warning.png" alt="Warning icon" />
              Minimum 3 category required
            </p>
          )}
        </div>

        <div className={style.optionContainer}>
          <div className={style.slot}>
            {categories.map(({ name, color, image }) => (
              <div
                key={name}
                className={`${style.option} ${favourite.includes(name) ? style.selected : ''}`}
                style={{ background: color }}
                onClick={() => toggleFavourite(name)}
              >
                <p>{name}</p>
                <div className={style.images}>
                  <img src={image} alt={`${name} category icon`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={style.buttonNext}>
        <button
          disabled={favourite.length < 3}
          onClick={() => navigate('/widget')}
          className={favourite.length < 3 ? style.disabledBtn : ''}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

export default HomePage;
