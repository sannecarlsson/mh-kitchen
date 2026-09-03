import { Heart, Users } from "lucide-react";
import { Link } from "react-router-dom";

function RecipeCard(props) {
  return (
    <Link className="recipe-card-link" to={`/recept/${props.slug}`}>
      <div className="recipe-card">
        <div className="recipe-card-top">
          <p>{props.categories.join(" · ")}</p>
          <Heart  onClick={(event) => {
    event.preventDefault();
    props.toggleFavorite(props.slug);
  }}
  fill={props.isFavorite ? "currentColor" : "none"}
          />
        </div>
        <h2>{props.title}</h2>
        <p className="recipe-card-ingredients">
          <p>
            {" "}
            {props.ingredients.map((ingredient) => ingredient.name).join(" · ")}
          </p>{" "}
        </p>
        <div className="recipe-card-info">
          <Users />
          <p>{props.portions} portioner</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
