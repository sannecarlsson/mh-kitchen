import { useState } from "react";

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

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category,
        ),
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  }

  return (
    <main className="add-recipe-page">
      <h1>Lägg till recept</h1>

      <form>
        <div className="recipe-main-info">
  <label className="recipe-name-field">
    Receptnamn
    <input
      type="text"
      placeholder="T.ex. exempel Lasagne"
    />
  </label>

  <label className="added-by-field">
    Tillagt av
    <input
      type="text"
      placeholder=""
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
            <input type="number" min="1" placeholder="4" />
          </label>

          <label>
            Tillagningstid
            <input type="text" placeholder="T.ex. 45 min" />
          </label>
        </div>
        <h2>Ingredienser</h2>

        <div className="ingredient-row">
          <input type="text" placeholder="Mängd" />

         <select defaultValue="">
  <option value="" disabled>
    Enhet
  </option>

  {units.map((unit) => (
    <option key={unit} value={unit}>
      {unit}
    </option>
  ))}
</select>

          <input type="text" placeholder="Ingrediens" />
        </div>
        <button type="button" className="add-field-button">
          + Lägg till ingrediens
        </button>

        <h2>Instruktioner</h2>

        <textarea placeholder="Steg 1"></textarea>

        <button type="button" className="add-field-button">
          + Lägg till steg
        </button>

        <button type="submit">Spara recept</button>
      </form>
    </main>
  );
}

export default AddRecipePage;
