import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import { supabase } from "../utils/supabase.js";

function FavoritesPage(props) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from("recipes")
        .select("*");

      if (error) {
        console.error("Kunde inte hämta recept:", error);
        return;
      }

      setRecipes(data);
    }

    fetchRecipes();
  }, []);

  const favoriteRecipes = recipes.filter((recipe) =>
    props.favorites.includes(recipe.slug)
  );

  return (
    <>
      <h2 className="recipe-list-title">Favoritrecept</h2>

      <div className="recipe-list">
        {favoriteRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.slug}
              title={recipe.title}
              slug={recipe.slug}
              categories={recipe.categories}
              portions={recipe.portions}
              ingredients={recipe.ingredients}
              isFavorite={props.favorites.includes(recipe.slug)}
              toggleFavorite={props.toggleFavorite}
              addedBy={recipe.added_by}
            />
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;