import { useParams } from "react-router-dom";
import recipes from "../data/recipesData.js";



function RecipePage() {
  const { slug } = useParams();

  const recipe = recipes.find((recipe) => recipe.slug === slug);

  if (!recipe) {
    return <h1>Receptet kunde inte hittas</h1>;
  }

  const groupedIngredients = {};

  recipe.ingredients.forEach((ingredient) => {
    const section = ingredient.section || "";

    if (!groupedIngredients[section]) {
      groupedIngredients[section] = [];
    }

    groupedIngredients[section].push(ingredient);
  });

  const ingredientSections = Object.entries(groupedIngredients);

  return (
    <>
  
    <div className="recipe-page">
      <h1>{recipe.title}</h1>

      <div className="recipe-meta">
        <p>{recipe.categories.join(" · ")}</p>
        <p>{recipe.portions} portioner</p>
        <p>Tillagt av {recipe.addedBy}</p>
      </div>

      <div className="recipe-ingredients">
        <h2>Ingredienser</h2>

        {ingredientSections.map(([section, ingredients]) => {
          return (
            <div key={section || "no-section"}>
              {section && <h3>{section}</h3>}

              {ingredients.map((ingredient) => {
                return (
                  <p key={ingredient.sequence}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    {ingredient.comment && `, ${ingredient.comment}`}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="recipe-instructions">
        <h2>Gör så här:</h2>

        {recipe.instructions.map((instruction) => {
          return <p key={instruction.sequence}>{instruction.text}</p>;
        })}
      </div>
    </div>
  </>
  );
}

export default RecipePage;