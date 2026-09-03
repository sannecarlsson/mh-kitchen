const fs = require("fs");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("./excel/recept.xlsx");

const recipeSheet = workbook.Sheets["Recept"];
const recipeRows = XLSX.utils.sheet_to_json(recipeSheet);

const categorySheet = workbook.Sheets["Receptkategorisering"];
const categoryRows = XLSX.utils.sheet_to_json(categorySheet);

const ingredientSheet = workbook.Sheets["Receptingredienser"];
const ingredientRows = XLSX.utils.sheet_to_json(ingredientSheet);

const instructionSheet = workbook.Sheets["Tillredning"];
const instructionRows = XLSX.utils.sheet_to_json(instructionSheet);

function getCategoriesForRecipe(recipeName) {
  return categoryRows
    .filter((row) => row.Receptnamn === recipeName)
    .map((row) => row.Paj);
}
function getIngredientsForRecipe(recipeName) {
  return ingredientRows
    .filter((row) => row.Receptnamn === recipeName)
    .map((row) => {
      return {
        sequence: row.Sekvens,
        name: row.Ingrediens,
        quantity: row.Kvantitet,
        unit: row.Enhet,
        comment: row.Kommentar || "",
        section: row.Receptdel || "",
      };
    });
}
function getInstructionsForRecipe(recipeName) {
  return instructionRows
    .filter((row) => row.Receptnamn === recipeName)
    .map((row) => {
      return {
        sequence: row.Sekvens,
        text: row.Åtgärd,
      };
    });
}
const recipes = recipeRows.map((row) => {
  return {
    title: row.Receptnamn,
    slug: row.Receptnamn.toLowerCase().replaceAll(" ", "-"),
    portions: row.Portioner,
    categories: getCategoriesForRecipe(row.Receptnamn),
    ingredients: getIngredientsForRecipe(row.Receptnamn),
    instructions: getInstructionsForRecipe(row.Receptnamn),
  };
});
const json = JSON.stringify(recipes, null, 2)
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

const output = `const recipesData = ${json};

export default recipesData;
`;

fs.writeFileSync(
  "./client/src/data/recipesData.js",
  output,
  "utf8"
);

console.log("recipesData.js skapad!");