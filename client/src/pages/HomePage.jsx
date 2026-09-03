import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import { supabase } from "../utils/supabase.js";

function HomePage(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase.from("recipes").select("*");

      if (error) {
        console.error("Kunde inte hämta recept:", error);
        return;
      }

      setRecipes(data);
    }

    fetchRecipes();
  }, []);

  return (
    <>
      <section className="search-section">
        <h2>Vad är du sugen på idag?</h2>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </section>

      <h2 className="recipe-list-title">Alla recept</h2>

      <div className="recipe-list">
        {recipes
          .filter((recipe) => {
            const search = searchTerm.toLowerCase();

            const ingredientMatch = recipe.ingredients.some((ingredient) => {
              return (ingredient.name || "").toLowerCase().includes(search);
            });

            const titleMatch = recipe.title.toLowerCase().includes(search);

            const categoryMatch = recipe.categories.some((category) => {
              return category.toLowerCase().includes(search);
            });

            return titleMatch || ingredientMatch || categoryMatch;
          })
          .map((recipe) => {
            return (
              <RecipeCard
                title={recipe.title}
                slug={recipe.slug}
                categories={recipe.categories}
                addedBy={recipe.addedBy}
                portions={recipe.portions}
                ingredients={recipe.ingredients}
                isFavorite={props.favorites.includes(recipe.slug)}
                toggleFavorite={props.toggleFavorite}
              />
            );
          })}
      </div>
    </>
  );
}

export default HomePage;
