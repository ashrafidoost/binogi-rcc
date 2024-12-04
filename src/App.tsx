import React, { useState } from "react";
import { Container, Typography, AppBar, Toolbar, Button } from "@mui/material";
import logo from "./assets/images/binogi_logo.png";
import SearchForm from "./components/Search/SearchForm";
import RecipeModal from "./components/Search/RecipeModal";
import BookmarkedRecipes from "./components/Bookmarked/BookmarkedRecipes";
import { BookmarkProvider } from "./context/BookmarkContext";
import { Recipe } from "./types/RecipeTypes";

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleSearchResults = (results: Recipe[]) => {
    setRecipes(results);
  };

  return (
    <BookmarkProvider>
      <AppBar position="sticky" style={{ backgroundColor: "#6495ED" }}>
        <Toolbar>
          <img
            src={logo}
            alt="App Logo"
            className="rounded-circle img-fluid w-0.1 h-0.1"
            style={{ width: "80px", height: "80px", margin: 10 }}
          />
          <Typography variant="h5">
            React Code Challenge (Reza Ashrafidoost)
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 col-md-10">
          <Container>
            <SearchForm onSearchResults={handleSearchResults} />
            <div className="border border-2 border-blue-500 rounded">
              {recipes.map((recipe) => (
                <li
                  key={recipe.uri}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="btn btn-light mb-2 mb-md-0 m-2"
                >
                  {recipe.label}
                </li>
              ))}
            </div>
            {selectedRecipe && (
              <RecipeModal
                open={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
                recipe={selectedRecipe}
              />
            )}

            <BookmarkedRecipes />
          </Container>
        </div>
      </div>
    </BookmarkProvider>
  );
};

export default App;
