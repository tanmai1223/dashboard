import React, { useContext } from 'react';
import { FavouriteContext } from '../context/FavouriteContext';
import Films from '../components/Films';
import Header from '../components/Header';
import style from '../styles/Dashboard.module.css'

function Dashboard() {
  const { favourite } = useContext(FavouriteContext);

  return (
    <div className={style.dashboardMain}>
      <Header />
      <h3>Entertainment according to your choice</h3>
      {favourite.map((genre) => (
        <div key={genre}>
          <h2>{genre}</h2>
          <Films genre={genre} />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
