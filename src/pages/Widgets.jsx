import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FavouriteContext } from '../context/FavouriteContext';
import { useNavigate } from 'react-router';
import style from '../styles/Widgets.module.css';
import WeatherCard from '../components/WeatherCard';
import StopWatchCard from '../components/StopWatchCard';

function Widgets() {
  const { user } = useContext(AuthContext);
  const { favourite } = useContext(FavouriteContext);
  const navigate = useNavigate();

  return (
    <>
    <div className={style.widgetMain}>
      <div className={style.widgetRight}>
        <div className={style.widgetDetails}>
          <div className={style.widgetContainer}>
            <div className={style.widgetUser}>
              <img src="profile.png" alt="User profile" />
              <div className={style.widgetInfo}>
                <p style={{ marginTop: "5%", fontWeight: 400, fontSize: "1.2rem" }}>{user?.name}</p>
                <p style={{ marginTop: "1%", fontWeight: 400, fontSize: "1.2rem" }}>{user?.email}</p>
                <p style={{ marginTop: "1%", fontWeight: 600, fontSize: "2.2rem" }}>{user?.username}</p>
                <div className={style.widgetButton}>
                  {favourite.map((genre, index) => (
                    <button key={index}>{genre}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className={style.widgetWeather}>
              <WeatherCard />
            </div>
          </div>

          <div className={style.widgetNotes}>
            <label htmlFor="note">All Notes</label><br />
            <textarea id="note" name="notes" placeholder="Write your notes here..."></textarea>
          </div>
        </div>

        <div className={style.widgetWatch}>
          <StopWatchCard />
        </div>
      </div>

      
    </div>
    <div className={style.buttonNext}>
        <button onClick={() => navigate('/dashboard')}>
          Browser
        </button>
      </div>
      </>
  );
}

export default Widgets;
