import { createContext, useEffect, useState } from "react";

const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
  const userFavourites=JSON.parse(localStorage.getItem('user-favourite')??'[]')
  const [favourite, setFavourite] = useState(userFavourites);

 const toggleFavourite = (genre) => {
  setFavourite((prev) =>
    prev.includes(genre) ? prev.filter((item) => item !== genre)  : [...prev, genre]
  );
};
const removeFavourite =(genre)=>{
    setFavourite((prev) =>
      prev.includes(genre)
        ? prev.filter((item) => item !== genre) 
        : prev                    
    );
}
useEffect(()=>{
  localStorage.setItem('user-favourite',JSON.stringify(favourite))
},[favourite])
  return (
    <FavouriteContext.Provider value={{ favourite, toggleFavourite,removeFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export { FavouriteContext, FavouriteProvider };
