import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/supabase.js";
import { Clock } from "lucide-react";

function RecipePage() {
  const { slug } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Kunde inte hämta recept:", error);
        setLoading(false);
        return;
      }

      setRecipe(data);
      setLoading(false);
    }

    fetchRecipe();
  }, [slug]);

  if (loading) {
    return <p>Laddar recept...</p>;
  }

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

  {recipe.cooking_time && (
    <p className="cooking-time">
      <Clock />
      {recipe.cooking_time}
    </p>
  )}

  <p>Tillagt av {recipe.added_by}</p>
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
            return (
              <p key={instruction.sequence}>
                {instruction.text}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RecipePage;