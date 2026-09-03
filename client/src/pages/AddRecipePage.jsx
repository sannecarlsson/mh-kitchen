import { useState } from "react";
import { supabase } from "../utils/supabase";

const categories = [
  "Asiatiskt",
  "Bröd",
  "Dryck",
  "Efterrätter",
  "Fisk",
  "Fläskfilé",
  "Förrätter",
  "Grytor",
  "Italienskt",
  "Jul",
  "Kryddor",
  "Kyckling",
  "Kött",
  "Köttfärs",
  "Lamm",
  "Lax",
  "Lunch",
  "Middag",
  "Marinader",
  "Nudlar",
  "Paj",
  "Potatis",
  "Påsk",
  "Sallad",
  "Skaldjur",
  "Snacks",
  "Soppa",
  "Svensk husman",
  "Såser & Röror",
  "Tapas",
  "Vegetariskt",
];

const units = [
  "burk",
  "cm",
  "dl",
  "fpk",
  "g",
  "kg",
  "klyfta",
  "knippe",
  "krm",
  "kruka",
  "kvist",
  "l",
  "ml",
  "msk",
  "nypa",
  "påse",
  "skiva",
  "st",
  "tsk",
];

function AddRecipePage() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [ingredients, setIngredients] = useState([
    {
      quantity: "",
      unit: "",
      name: "",
      comment: "",
      section: "",
    },
  ]);

  const [instructions, setInstructions] = useState([""]);

  const [title, setTitle] = useState("");
  const [addedBy, setAddedBy] = useState("");
  const [portions, setPortions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  function addIngredient() {
    setIngredients([
      ...ingredients,
      {
        quantity: "",
        unit: "",
        name: "",
        comment: "",
        section: "",
      },
    ]);
  }

  function handleIngredientChange(index, field, value) {
    const updatedIngredients = [...ingredients];

    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    };

    setIngredients(updatedIngredients);
  }

  function addInstruction() {
    setInstructions([...instructions, ""]);
  }

  function handleInstructionChange(index, value) {
    const updatedInstructions = [...instructions];

    updatedInstructions[index] = value;

    setInstructions(updatedInstructions);
  }

  function createSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replaceAll("å", "a")
      .replaceAll("ä", "a")
      .replaceAll("ö", "o")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSavedMessage("");

    const formattedIngredients = ingredients.map((ingredient, index) => {
      return {
        sequence: index + 1,
        name: ingredient.name,
        quantity: ingredient.quantity
          ? Number(ingredient.quantity)
          : null,
        unit: ingredient.unit,
        comment: ingredient.comment,
        section: ingredient.section,
      };
    });

    const formattedInstructions = instructions.map((instruction, index) => {
      return {
        sequence: index + 1,
        text: instruction,
      };
    });

    const newRecipe = {
      title: title,
      slug: createSlug(title),
      added_by: addedBy,
      categories: selectedCategories,
      portions: Number(portions),
      cooking_time: cookingTime,
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
    };

    console.log("Skickar till Supabase:", newRecipe);

    const { data, error } = await supabase
      .from("recipes")
      .insert([newRecipe])
      .select();

    if (error) {
      console.error("Supabase-fel:", error);

      setSavedMessage(
        "Något gick fel. Receptet kunde inte sparas."
      );

      return;
    }

    console.log("Sparat i Supabase:", data);

    setSavedMessage("Receptet har sparats!");
  }

  return (
    <main className="add-recipe-page">
      <h1>Lägg till recept</h1>

      <form onSubmit={handleSubmit}>
        <div className="recipe-main-info">
          <label className="recipe-name-field">
            Receptnamn

            <input
              type="text"
              placeholder="T.ex. Lasagne"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <label className="added-by-field">
            Tillagt av

            <input
              type="text"
              value={addedBy}
              onChange={(event) => setAddedBy(event.target.value)}
            />
          </label>
        </div>

        <div className="category-section">
          <p>Kategorier</p>

          <div className="category-options">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategories.includes(category)
                    ? "category-option selected"
                    : "category-option"
                }
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="recipe-details-row">
          <label>
            Portioner

            <input
              type="number"
              min="1"
              value={portions}
              onChange={(event) =>
                setPortions(event.target.value)
              }
            />
          </label>

          <label>
            Tillagningstid

            <input
              type="text"
              placeholder="T.ex. 45 min"
              value={cookingTime}
              onChange={(event) =>
                setCookingTime(event.target.value)
              }
            />
          </label>
        </div>

        <h2>Ingredienser</h2>

        {ingredients.map((ingredient, index) => (
          <div
            className="ingredient-row"
            key={index}
          >
            <input
              type="number"
              step="any"
              placeholder="Mängd"
              value={ingredient.quantity}
              onChange={(event) =>
                handleIngredientChange(
                  index,
                  "quantity",
                  event.target.value
                )
              }
            />

            <select
              value={ingredient.unit}
              onChange={(event) =>
                handleIngredientChange(
                  index,
                  "unit",
                  event.target.value
                )
              }
            >
              <option value="" disabled>
                Enhet
              </option>

              {units.map((unit) => (
                <option
                  key={unit}
                  value={unit}
                >
                  {unit}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Ingrediens"
              value={ingredient.name}
              onChange={(event) =>
                handleIngredientChange(
                  index,
                  "name",
                  event.target.value
                )
              }
            />
          </div>
        ))}

        <button
          type="button"
          className="add-field-button"
          onClick={addIngredient}
        >
          + Lägg till ingrediens
        </button>

        <h2>Instruktioner</h2>

        {instructions.map((instruction, index) => (
          <textarea
            key={index}
            placeholder={`Steg ${index + 1}`}
            value={instruction}
            onChange={(event) =>
              handleInstructionChange(
                index,
                event.target.value
              )
            }
          />
        ))}

        <button
          type="button"
          className="add-field-button"
          onClick={addInstruction}
        >
          + Lägg till steg
        </button>

        <button type="submit">
          Spara recept
        </button>

        {savedMessage && (
          <p className="save-message">
            {savedMessage}
          </p>
        )}
      </form>
    </main>
  );
}

export default AddRecipePage;