// This import makes the file a module
import React from "react";
import { Recipe } from "../../types/RecipeTypes";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

interface SearchResultsProps {
  recipes: Recipe[];
  onRecipeSelect: (recipe: Recipe) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  recipes,
  onRecipeSelect,
}) => {
  return (
    <div>
      {recipes.map((recipe) => (
        <Card key={recipe.uri} sx={{ display: "flex", marginBottom: 2 }}>
          <CardMedia
            component="img"
            alt={recipe.label}
            height="140"
            image={recipe.image}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{recipe.label}</Typography>
            <Typography variant="body2">
              Calories: {Math.round(recipe.calories)}
            </Typography>
            <Button
              onClick={() => onRecipeSelect(recipe)}
              variant="contained"
              color="primary"
            >
              View Recipe
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SearchResults;
