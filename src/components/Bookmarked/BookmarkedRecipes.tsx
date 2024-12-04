import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useBookmarks } from "../../context/BookmarkContext";
//import { Recipe } from "../../types/RecipeTypes";

const BookmarkedRecipes: React.FC = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <>
      {bookmarks.length ? (
        <Typography variant="h5" gutterBottom>
          Bookmarked Recipes
        </Typography>
      ) : (
        ""
      )}
      <List>
        {bookmarks.map((recipe) => (
          <ListItem key={recipe.uri}>
            <Card sx={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                alt={recipe.label}
                height="140"
                image={recipe.image}
              />
              <CardContent sx={{ flex: 1 }}>
                <ListItemText
                  primary={recipe.label}
                  secondary={`Calories: ${Math.round(recipe.calories)}`}
                />
              </CardContent>
              <Button onClick={() => removeBookmark(recipe)} color="secondary">
                Remove
              </Button>
            </Card>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default BookmarkedRecipes;
