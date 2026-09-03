import recipes from "../data/recipesData.js";
import RecipeCard from "../components/RecipeCard.jsx";

function FavoritesPage(props) {
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
            />
          );
        })}
      </div>
    </>
  );
}

export default FavoritesPage;