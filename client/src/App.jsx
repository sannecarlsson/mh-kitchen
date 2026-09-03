import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import AddRecipePage from "./pages/AddRecipePage.jsx";
import { useState, useEffect } from "react";

function App() {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");

    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  function toggleFavorite(slug) {
    if (favorites.includes(slug)) {
      setFavorites(favorites.filter((favorite) => favorite !== slug));
    } else {
      setFavorites([...favorites, slug]);
    }
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage favorites={favorites} toggleFavorite={toggleFavorite} />
          }
        />

        <Route path="/recept/:slug" element={<RecipePage />} />

        <Route
          path="/favoriter"
          element={
            <FavoritesPage
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/lagg-till-recept" element={<AddRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
