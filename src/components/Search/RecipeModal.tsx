import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import { useBookmarks } from "../../context/BookmarkContext";
import { Recipe } from "../../types/RecipeTypes";

interface RecipeModalProps {
  open: boolean;
  onClose: () => void;
  recipe: Recipe;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ open, onClose, recipe }) => {
  const { addBookmark, removeBookmark } = useBookmarks();

  const isBookmarked = (recipe: Recipe) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    return bookmarks.some((bookmark: Recipe) => bookmark.uri === recipe.uri);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{recipe.label}</DialogTitle>
      <DialogContent>
        <img src={recipe.image} alt={recipe.label} width="100%" />
        <Typography variant="h6">
          Calories: {Math.round(recipe.calories)}
        </Typography>
        <br />
        <Typography variant="body1">
          <b>Health Labels:</b> {recipe.healthLabels.join(", ")}
        </Typography>
        <br />
        <Typography variant="body1">
          <b>Diet Labels:</b> {recipe.dietLabels.join(", ")}
        </Typography>
        <br />
        <Typography variant="h6">
          <b>Ingredients:</b>
        </Typography>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.text}</li>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className="btn btn-secondary">
          Close
        </Button>
        <button
          className={`btn ${
            isBookmarked(recipe) ? "btn-danger" : "btn-primary"
          }`}
          onClick={() => {
            if (isBookmarked(recipe)) {
              removeBookmark(recipe);
            } else {
              addBookmark(recipe);
            }
          }}
        >
          {isBookmarked(recipe) ? "Remove Bookmark" : "Bookmark"}
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default RecipeModal;
